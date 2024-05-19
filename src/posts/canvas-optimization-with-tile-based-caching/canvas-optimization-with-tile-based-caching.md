---
title: Canvas Optimization with Tile Based Caching
description: Enhancing canvas performance with tile based caching.
date: "2024-05-18"
lastUpdated: '2024-05-18T00:00:00.000Z'
slug: canvas-optimization-with-tile-based-caching
published: true
image: canvas-optimization-with-tile-based-caching.png
imageAlt: "A tile based caching example. The objects are cached with tiles."
categories:
- Engineering
postImages:
  - slug: excalidraw-canvases
    alt: The graphics tab of safari developer tools when Excalidraw is opened
    image: excalidraw-canvases.png
---

<script>
    import ExcalidrawCanvasesImg from '$lib/generated/posts/canvas-optimization-with-tile-based-caching/excalidraw-canvases';
    import PostImage from "$lib/components/Post/PostImage.svelte";
    import ExternalLink from "$lib/components/externalLink/ExternalLink.svelte";
    import BulletTitle from "$lib/components/PostComponents/BulletTitle.svelte";

</script>

It's common to use individual caches for the shapes in the canvas, which leads to the creation of numerous canvas instances.
I find that this practice can negatively impact performance. Creating individual caches and drawing them as images often becomes more expensive regarding performance than drawing the shapes directly.

Here is an example from <ExternalLink link="https://excalidraw.com" text="Excalidraw" />, which is a great tool but lacks tile-based caching.

<PostImage data={ExcalidrawCanvasesImg} />

As you can see, many canvases are created just because of caching shapes. I don't find this useful because instead of individual caches, we can use tile-based caching.


## What Is Tile-Based Caching?

Tile-based caching is about drawing the shapes in the tiles and then drawing the tiles to the main canvas.
In other words, tile-based caching divides the main canvas into smaller pieces called tiles. 


Let's say we have a `1920x800` canvas. And we want to render and cache the shapes in `500x500` tiles. 
So we need 4 tiles in X direction and 2 tiles in Y direction. That means we need 8 tiles to cache the main canvas.
To render the shapes, we need to find intersected shapes for each tile and render them on tiles.
Now we can render the tiles on the main canvas. That's it.

## Things To Be Careful About

<BulletTitle text="Don't create tiles only considering x and y positions." htmlTag="h3" />

Instead, we should get indices for left, right, top, and bottom.

Here is an example of creating tiles:

```js
// getting the indices
const leftIndex = Math.floor(viewportX / tileWidth),
        rightIndex = Math.ceil((viewportX + canvasWidth) / tileWidth) - 1,
        topIndex = Math.floor(viewportY / tileHeight),
        bottomIndex = Math.ceil((viewportY + canvasHeight) / tileHeight) - 1;

// drawing tiles 
for (let left = leftIndex; left <= rightIndex; left++) {
    for (let top = topIndex; top <= bottomIndex; top++) {
        const tileKey = `${left}:${top}`;
        if (!this.tileCache.get(tileKey)) {
            const tile = createTile()
            const intersectedShapes = getIntersectedShapes(tile)
            tile.count = intersectedObjects.length;

            const ctx = tile.canvas.getContext('2d');
            ctx.resetTransform();
            ctx.clearRect(0, 0, tilwWidth, tileHeight);
            for (const shape of intersectedShapes) {
                shape.render(ctx)
            }
            
            this.tileCache.set(tileKey, tile)
        }
    }
}
```

In the above example, I didn't consider the zoom level but please you do.


<BulletTitle text="Be careful about retina display" htmlTag="h3" />

If you've enabled <ExternalLink text="Retina display" link="https://gist.github.com/callumlocke/cc258a193839691f60dd" /> on your canvas,
make sure you've enabled Retina displays on tile canvases as well. As an example, if your default tile sizes are 500x500 and the `devicePixelRatio` of the user
is 2, you need to change the tile sizes to `1000x1000` for that user.

<BulletTitle text="Getting intersecting shapes for tiles" htmlTag="h3" />

If you are storing your shapes inside a linear data structure (arrays, linked list...), getting intersected shapes for the tiles
can negatively impact performance. We can use a data structure for this purpose. Yes, I'm talking about the <ExternalLink text="R-tree" link="https://www.geeksforgeeks.org/introduction-to-r-tree/" />.

I've tested to get intersecting shapes with array and r-tree. R-tree was 30x faster than arrays.
