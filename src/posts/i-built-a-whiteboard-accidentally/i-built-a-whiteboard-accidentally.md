---
title: I built a whiteboard, accidentally
description: A year-long side project that started as a Go backend and somehow became a full whiteboard app
date: "2026-03-26"
lastUpdated: '2026-03-26T21:29:44.679Z'
slug: i-built-a-whiteboard-accidentally
published: true
image: i-built-a-whiteboard-accidentally.jpg
imageAlt: "eskiz.io digital sketch and logo editor interface"
categories:
    - General
---

<script>
    import ExternalLink from "$lib/components/externalLink/ExternalLink.svelte";
</script>

I've been trying to build a whiteboard app for almost a year. I did it because of a couple of reasons: I wanted to try out skia. I wanted to try all the *trendy* react libraries like Zustand and TanStack Query. And, I wanted to get better at backend development with Go.


Okay, to be fair, last one doesn't sound like what you'd expect for a frontend-heavy project. But that is exactly what started all of this!


I didn't want to build a basic CRUD backend app. I wanted to build something real, something challenging. A backend for a collaborative whiteboard seemed like a great idea. So, I got to work. I implemented basic auth, classic CRUD endpoints, messaging with NATS JetStream, observability, and finally, WebSocket messaging.


Eventually, Postman just didn't feel like enough to test my app. And then I thought building a minimal frontend app would be a good idea because I like to see what I'm building. So I started building it. After a couple of days, it was done. Then I decided to try out frontend tools I'd been wanting to try. I added Zustand for store management, TanStack Query to handle data fetching/updating. 


Then, I wondered how good Skia's CanvasKit really was. CanvasKit is a WebAssembly port of the Skia 2D graphics engine which powers Chrome and Flutter. It lets you render high performance graphics right in the browser. I wanted to try it out, so I created a board page and rendered a grid. Following that, I started rendering some basic shapes like rectangle, ellipse, triangle. Then came pen drawings and texts. 


Just like that, my so-called backend project became a frontend project. All my curiosity shifted, so I took it further. I made the canvas interactive: selecting shapes, moving them, resizing them. Then of course, I integrated it with my backend. I started handling websocket messages to save shapes in the db and update them real-time. I made it collaborative: backend broadcasted updates to the other clients on the same board, and those clients listened to the messages to update their local shape data. 


Looking back, I probably could have finished this project right there. But every time I thought I was done, I kept finding one more thing to add, one more thing to try. I added rich text support, the ability to add text inside shapes, a sub-toolbar to modify background colors, text colors, border thickness, etc. Then I added lines, sticky notes, images... and it became a real whiteboard app.


I'm really happy with how it turned out. I learned a lot along the way. Maybe I didn't learn how to stick to a plan, but anyway, I have a whiteboard app now. And it's something I genuinely enjoyed building, most of the time.


To make it as accessible as possible, I recently added a standalone mode. The frontend no longer relies on a backend. It uses browser's IndexedDB to store the data locally. If you want to play around with it: <ExternalLink link="https://eskiz.io" text="https://eskiz.io" />. If you want to check source code: <ExternalLink link="https://github.com/umtdemr/eskiz" text="https://github.com/umtdemr/eskiz" />


Is it done? I don't think so. I can think of a lot of features to add, like retina display, frames, AI integration but not sure if the world can handle another whiteboard app.

