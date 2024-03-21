<script>
   import PostFeatureMockImg from '$lib/images/post_mockup_featured_image.png';
</script>

<article class="post_item">
    <a href="#">
        <img src={PostFeatureMockImg} alt="post image" />
        <h2 class="post_item__title">My new website</h2>
        <footer class="post_item__footer">
           <time class="post_item__footer--date" datetime="2024-03-21">March 21, 2024</time>
        </footer>
    </a>
</article>

<style lang="scss">
    .post_item {
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
    }
</style>