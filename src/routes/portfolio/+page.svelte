<script>
    import PostFeatureMockImg from '$lib/images/post_mockup_featured_image.png';
</script>

<svelte:head>
    <title>Portfolio</title>
</svelte:head>

<section class="portfolio">
    <h2 class="section_title">Portfolio</h2>
    <p class="section_desc">Lorem ipsum dolar sit amöet</p>
    <div class="portfolio_list">
        <div class="portfolio_item">
            <img src={PostFeatureMockImg} class="portfolio_item__img" />
            <h3 class="portfolio_item__title">Mimic Robot</h3>
            <div class="portfolio_tags">
                <div class="tag_item purple">robotics</div>
            </div>
        </div>
    </div>
</section>


<style lang="scss">
    .portfolio_list {
      width: 100%;
      display: grid;
      grid-template-columns: 365px 365px;
      gap: 28px;
      margin-top: 65px;
      user-select: none;
    }
    .portfolio_item {
      height: 405px;
      border-radius: 33px;
      position: relative;
      padding: 30px 15px;
      &__img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-modal-dark-bg);
        border-radius: 33px;
        object-fit: cover;
        filter: brightness(50%);
        user-select: none;
      }
      &__title {
        color: var(--color-text-1);
        font-size: 1.5rem;
        position: relative;
      }
    }
    .portfolio_tags {
      display: flex;
      gap: 10px;
      position: relative;
      margin-top: 10px;
      .tag_item {
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        color: var(--color-text-1);
        &.purple {
          background-color: #4F55ED;
        }
      }
    }
</style>