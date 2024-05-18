<script>
   import PostImage from "$lib/components/Post/PostImage.svelte";

   export let post;
</script>

<article class="post_item">
    <a href={`/blog/${post.slug}`}>
        <PostImage data={post.imageData} />
        <h2 class="post_item__title">{post.title}</h2>
        <footer class="post_item__footer">
           <time class="post_item__footer--date" datetime={post.date}>{post.strDate}</time>
        </footer>
    </a>
</article>

<style lang="scss">
    .post_item {
        margin-bottom: 45px;
        &__title {
          color: var(--color-text-1);
          font-size: 1.875rem;
          margin-top: 10px;
        }
        &__footer {
          color: var(--color-text-2);
          font-size: 0.812rem;
          margin-top: 5px;
        }
      @media screen and (max-width: 790px) {
        &__title {
          font-size: 1.4rem;
        }
      }
    }
</style>