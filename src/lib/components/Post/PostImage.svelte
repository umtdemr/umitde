<script>
    export let data;
</script>

<picture>
    {#each data.sources as source}
        <source srcset={source.srcset} type={source.type} />
    {/each}
    <img
            alt="post image"
            class="lazy"
            decoding="async"
            width="760"
            height="367"
            src={data.src}
    />
</picture>