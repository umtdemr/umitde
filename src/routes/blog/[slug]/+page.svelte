<script>
    import PostFeatureMockImg from '$lib/images/post_mockup_featured_image.png';
    import PostImage from "$lib/components/Post/PostImage.svelte";

    export let data;
</script>
<article class="post">
    <div class="post__header">
        <PostImage data={data.metadata.imageData} />
        <h2>{data.metadata.title}</h2>
        <time class="post_item__footer--date" datetime={data.metadata.date}>{data.metadata.date}</time>
    </div>

    <div class="post__content">
        <svelte:component this={data.content} />
    </div>
</article>
<div class="separator"></div>
<div class="post_edit">
    Find an issue with this post? You can <a href="#">edit on github.</a>
</div>


<style lang="scss">
    .post {
      width: 100%;
      &__header {
        h2 {
          color: var(--color-text-1);
          font-size: 1.875rem;
          margin-top: 10px;

        }
        time {
          color: var(--color-text-2);
          font-size: 0.812rem;
          margin-top: 5px;
        }
      }
      &__content {
        margin-top: 50px;
        font-size: 1.15rem;
        line-height: 1.5rem;
      }
    }
    .separator {
      width: 100%;
      height: 2px;
      border-radius: 10px;
      background-color: var(--color-dark-3);
      margin: 50px 0;
    }
    .post_edit {
      padding: 40px 0;
      text-align: center;
      border: 1px solid var(--color-dark-2);
      a {
        text-decoration: underline;
      }
    }
</style>