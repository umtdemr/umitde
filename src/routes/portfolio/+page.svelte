<script>
    import PortfolioItem from "$lib/components/Portfolio/PortfolioItem.svelte";
    import data from './portfolioData.json';
</script>

<svelte:head>
    <title>Portfolio</title>
</svelte:head>

<section class="portfolio">
    <h2 class="section_title">Works</h2>
    <p class="section_desc">Lorem ipsum dolar sit amöet</p>
    <div class="portfolio_list">
        {#each data.items as workItem}
            <PortfolioItem data={workItem} />
        {/each}
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
</style>