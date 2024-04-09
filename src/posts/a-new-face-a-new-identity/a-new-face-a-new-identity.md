---
title: A New Face A New Identity
description: I've finally changed my website completely
date: "2024-04-06"
slug: a-new-face-a-new-identity
published: true
image: a-new-face-a-new-identity.png
imageAlt: "my new websites homepage on mobile"
categories:
    - General
postImages:
    - slug: my-old-website
      alt: my old website home page
      image: my-old-website.png
---

<script>
    import MyOldWebsiteImg from '$lib/generated/posts/a-new-face-a-new-identity/my-old-website';
    import PostImage from "$lib/components/Post/PostImage.svelte";
    import ExternalLink from "$lib/components/externalLink/ExternalLink.svelte";
</script>


I've finally changed my website completely. I always wanted to write blog posts on my website. 
Even though I'd added a blog section to my old website, I've never written any blog post there. 
But I want to share what I learn. And I believe this is the best place to do it since I don't like to write in medium or dev.to.

## What was wrong with my old website?

Honestly, I don't know what I thought before but that one looked like a marketing page. 
And since I developed it 3 years ago, It was quite old. It was build with <ExternalLink link="https://nextjs.org/" text="Next js" /> (v11).
And it had light mode.

<PostImage data={MyOldWebsiteImg} />

## How did I create this blog?

I wanted to try <ExternalLink link="https://kit.svelte.dev/" text="SvelteKit" /> when it's first announced. 
And I gave it a chance. And I really liked it. It feels like I'm working with vue js. And believe me, it took so less to get used to it.

I built this blog with <ExternalLink link="https://github.com/pngwn/MDsveX" text="mdx" /> because I want other people to have chance to change/edit the content. 
Do I regret it? Maybe. I don't want to build my website from scratch again. I learned the same lesson that I learned 3 years ago.
It's really hard to think all the things to run the website. Like SEO, image optimization, deploying etc. 
If you want my advice; if you want to create your own website, and you don't want to spend so much time with it, just use wordpress or ghost.

If you want to use this template on your website or you just want to check the code, you can access the <ExternalLink link="https://github.com/umtdemr/umitde" text="github repositoriy" /> here.
