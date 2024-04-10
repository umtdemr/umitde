<script>
    export let data;
</script>

<picture>
    {#each data.sources as source}
        <source srcset={source.srcset} type={source.type} />
    {/each}
    <img
        alt={data.alt}
        class="lazy"
        decoding="async"
        width={data.width}
        height={data.height}
        src={data.src}
    />
</picture>


<style lang="scss">
   img {
     @media screen and (max-width: 790px) {
        height: auto;
     }
   }
</style>