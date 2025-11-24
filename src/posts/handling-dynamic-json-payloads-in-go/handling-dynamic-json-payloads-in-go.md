---
title: Handling Dynamic JSON Payloads in Go
description: Learn to efficiently manage dynamic JSON payloads in Go for WebSocket connections. Discover why any isn't ideal and how to use json.RawMessage for robust, delayed decoding.
date: "2025-11-24"
lastUpdated: '2025-11-24T19:07:05.139Z'
slug: handling-dynamic-json-payloads-in-go
published: true
image: handling-dynamic-json-payloads-in-go.jpg
imageAlt: "Go Gopher routing data packets based on their type labels"
categories:
	- Go
---
<script>
    import ExternalLink from "$lib/components/externalLink/ExternalLink.svelte";
</script>

Recently, I've needed to handle messages that come from a websocket connection. Handling websocket messages requires a different mindset compared to standard HTTP requests. In websocket, you only have a single entry point to welcome incoming requests. It is considerably different with HTTP where you can create different endpoints for different requests you expect.

Anyway, to solve this routing issue, forcing all incoming messages to follow a specific JSON pattern is a good starting point.

```go
type IncomingMessage struct {
    Type string `json:"type"`
}
```

With this base structure, we expect every incoming message to contain a `type` field. This will help us to identify what the client wants us to do with the message, such as `UPDATE_USER_PROFILE` or `UPLOAD_POST`. Okay, sounds great so far. But how does the client send the necessary payload for a specific `type`? Should we add a generic `data` field to our struct? 

Here is the catch: the structure of the `data` field changes depending on the `type`.
For `UPDATE_USER_PROFILE`, expected data might be `{new_name: string, new_bio: string}` and for `UPLOAD_POST`, expected data might be `{post_title: string, content: string}`. So, we need to check the type first to understand what the `data` looks like. But what Go type should we define for this dynamic `data` field in our struct? `string`, `interface{}/any`, `[]byte` or `json.RawMessage`?

Using `string` is not a good idea, because:
1. It forces client to escape characters; `{\"new_name\":\"jane doe\",\"new_bio\": \"test\"}`
2. Not performant. Allocates a string and requires a second parse.
3. Not idiomatic.


Using `interface{}` or `any` is not a good way to handle this because it creates a map for our unmarshalled JSON data and it forces us to check if the field exist or if their type is what we expected. So we might have to write `request["new_name"].(string)` for all the keywords we expect!

Using `[]byte` is not useful. It forces Base64 encoding in standard JSON V1. And in JSON v2, it turns your JSON into an unreadable array of numbers (like [115, 116...]). Neither is what we want for a nested JSON structure

This is where `json.RawMessage` comes to help. As the Go docs say; _It can be used to **delay** JSON decoding or **precompute** a JSON encoding._
Exactly what we need! By using `json.RawMessage`, we treat the `data` field as a raw byte slice of the original JSON, without trying to interpret it yet.

Here is the revised struct:

```go
type IncomingMessage struct {
    Type string          `json:"type"`
    Data json.RawMessage `json:"data"`
}
```
Now let's define expected structs for `UPDATE_USER_PROFILE` and `UPLOAD_POST` events

```go
// EventUpdateUserProfile defines the expected payload 
// for the UPDATE_USER_PROFILE event
type EventUpdateUserProfile struct {
	NewName string `json:"new_name"`
	NewBio  string `json:"new_bio"`
}

// EventUploadPost defines the expected payload for the UPLOAD_POST event
type EventUploadPost struct {
	PostTitle string `json:"post_title"`
	Content   string `json:"content"`
}
```

Finally, we need to check the `type` of the incoming message and unmarshal the `data` into the corresponding struct. Here is how the handler implementation looks:

```go
var (
	ErrEventNotFound = errors.New("event not found")
)

func handleIncomingMessage(message IncomingMessage) error {
	switch message.Type {
	case "UPDATE_USER_PROFILE":
		var event EventUpdateUserProfile
		// get the actual UPDATE_USER_PROFILE data
		if err := json.Unmarshal(message.Data, &event); err != nil {
			return err
		}

		fmt.Printf(
			">> Profile Updated: Name=%s, Bio=%s\n",
			event.NewName,
			event.NewBio,
		)

	case "UPLOAD_POST":
		var event EventUploadPost
		// get the actual UPLOAD_POST data
		if err := json.Unmarshal(message.Data, &event); err != nil {
			return err
		}

		fmt.Printf(
			">> Post Uploaded: Title=%s\n",
			event.PostTitle,
		)

	default:
		return ErrEventNotFound
	}

	return nil
}
```
<ExternalLink link="https://go.dev/play/p/YOIQw92fBVU" text="Here is the above example in Go playground" />

## What else can we use json.RawMessage for?

I explained above how we can use `json.RawMessage` to **delay** unmarshalling. But there are other scenarios where `json.RawMessage` can be helpful.

### 1. Handling Database JSON Types

Imagine you have a `users` table with a `preferences` column stored as `JSONB`. If your API just reads this data and sends it to the frontend, decoding it into a Go struct is a waste of resources.

Instead, scan the database column directly into `json.RawMessage`. This treats the data as a simple byte array, skipping the expensive JSON parsing logic entirely.

```go
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	// We don't parse this, we just pass it through!
	Preferences json.RawMessage `json:"preferences"`
}
```

### 2. Precomputing JSON

Sometimes, a part of your JSON response is static (heavy to compute, rarely changes), but it needs to be wrapped in a dynamic structure (like adding a timestamp or request ID).

Instead of unmarshalling the cached data just to marshal it back again inside the wrapper, we can keep the cached part as `json.RawMessage`. Here is an example of it:

```go
// CachedProducts simulates a heavy JSON payload stored in memory/cache
var CachedProducts json.RawMessage

func init() {
	// Assume this is an expensive operation (DB query + serialization)
	// We do this once.
	products := []string{"MacBook Pro", "Mechanical Keyboard", "Monitor"}
	bytes, _ := json.Marshal(products)
	
	CachedProducts = json.RawMessage(bytes)
}

func main() {
	// A dynamic request comes in...
	response := struct {
		Timestamp string          `json:"timestamp"`
		Data      json.RawMessage `json:"data"` // Injecting raw bytes!
	}{
		Timestamp: time.Now().Format(time.RFC3339),
		Data:      CachedProducts,
	}

	b, _ := json.MarshalIndent(&response, "", "\t")
	fmt.Println(string(b))
}
```
