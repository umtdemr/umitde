<script>
    import PortfolioItem from "$lib/components/Portfolio/PortfolioItem.svelte";
    import {page} from "$app/stores";

    export let data;
</script>

<svelte:head>
    <title>Works - Ümit Demir</title>
    <meta name="description" content="A list of projects I've worked on or I'm working on"/>

    <meta property="og:title" content="Works - Ümit Demir" />
    <meta name="og:description" content="A list of projects I've worked on or I'm working on"/>
    <meta property="og:type" content="website" />
    <meta property="og:url" content={$page.url.href} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:site" content="@mediumgoal" />
    <meta property="twitter:creator" content="@mediumgoal" />
    <meta property="twitter:title" content="Works - Ümit Demir" />
    <meta name="twitter:description" content="A list of projects I've worked on or I'm working on"/>
</svelte:head>

<section class="portfolio">
    <h2 class="section_title">Works</h2>
    <p class="section_desc">A list of projects I've worked on or I'm working on</p>
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
      @media screen and (max-width: 790px) {
        grid-template-columns: 1fr;
      }
    }
</style>