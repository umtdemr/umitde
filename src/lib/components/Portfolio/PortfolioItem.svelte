<script>
    import PortfolioModal from "$lib/components/Portfolio/PortfolioModal.svelte";

    let showModal = false;

    export let data;

    function handleClick() {
       showModal = true;
    }

    function handleModalChangeStatus(e) {
       showModal = e.detail.status;
    }
</script>

<div
    class="portfolio_item"
    aria-label={data.title}
    role="button"
    on:click={handleClick}
    on:keydown={(e) => {
        if (e.key === 'Enter') {
           handleClick()
        }
    }}
    tabindex="0"
    >
    <picture>
        {#each data.images[0].imageData.sources as source}
            <source srcset={source.srcset} type={source.type} />
        {/each}
        <img src={data.images[0].imageData.src} class="portfolio_item__img" alt={data.images[0].imageData.alt}>
    </picture>
    <h3 class="portfolio_item__title" id="item_title_1">{data.title}</h3>
    <div class="portfolio_tags">
        {#each data.tags as tag}
            <div class="tag_item purple">{tag}</div>
        {/each}
    </div>
</div>

{#if showModal}
    <PortfolioModal
        on:changePortfolioModalStatus={handleModalChangeStatus}
        data={data} />
{/if}


<style lang="scss">
  .portfolio_item {
    height: 405px;
    border-radius: 33px;
    position: relative;
    padding: 30px 15px;
    cursor: pointer;
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
</style>