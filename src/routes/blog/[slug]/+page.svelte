<script>
    import PostImage from "$lib/components/Post/PostImage.svelte";
    import {page} from "$app/stores";

    export let data;
</script>

<svelte:head>
    <title>{data.metadata.title} - Ümit Demir</title>
    <meta name="description" content={data.metadata.description} />
    <meta property="og:title" content={data.metadata.title + ' - Ümit Demir'} />
    <meta property="og:description" content={data.metadata.description} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={$page.url.href} />
    <meta property="og:image" content={data.metadata.imageData.src} />
    <meta property="og:image:width" content="760" />
    <meta property="og:image:height" content="367" />
    <meta property="og:image:alt" content={data.metadata.imageData.alt} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={data.metadata.title + ' - Ümit Demir'} />
    <meta property="twitter:description" content={data.metadata.description} />
    <meta property="twitter:site" content="@mediumgoal" />
    <meta property="twitter:creator" content="@mediumgoal" />
    <meta property="twitter:image" content={data.metadata.imageData.src} />
    <meta property="twitter:url" content={$page.url.href} />
</svelte:head>

<article class="post">
    <div class="post__header">
        <PostImage data={data.metadata.imageData} />
        <h1 class="title">{data.metadata.title}</h1>
        <time class="post_item__footer--date" datetime={data.metadata.date}>{data.metadata.strDate}</time>
    </div>

    <div class="post__content">
        <svelte:component this={data.content} />
    </div>
</article>
<div class="separator"></div>
<div class="post_edit">
    Find an issue with this post?
    You can <a target="_blank" rel="nofollow" href={`https://github.com/umtdemr/umitde/tree/master/src/posts/${data.metadata.slug}/${data.metadata.slug}.md`}>edit on github.</a>
</div>


<style lang="scss">
    .post {
      width: 100%;
      &__header {
        .title {
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
      @media screen and (max-width: 790px) {
        &__header {
          .title {
            font-size: 1.4rem;
          }
        }
        &__content {
          margin-top: 30px;
          font-size: 1rem;
        }
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
      @media screen and (max-width: 790px) {
        padding: 10px 30px;
        font-size: 0.875rem;
      }
    }
</style>