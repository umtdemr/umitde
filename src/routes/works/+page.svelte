<script>
    import PortfolioItem from "$lib/components/Portfolio/PortfolioItem.svelte";
    import {page} from "$app/stores";
    import website from "$lib/config/website";

    export let data;
</script>

<svelte:head>
    <title>{`Works - ${website.siteTitle}`}</title>
    <meta name="description" content="A list of projects I've worked on or I'm working on"/>

    <meta property="og:title" content={`Works - ${website.siteTitle}`} />
    <meta name="og:description" content="A list of projects I've worked on or I'm working on"/>
    <meta property="og:type" content="website" />
    <meta property="og:url" content={$page.url.href} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:site" content="@mediumgoal" />
    <meta property="twitter:creator" content="@mediumgoal" />
    <meta property="twitter:title" content={`Works - ${website.siteTitle}`} />
    <meta name="twitter:description" content="A list of projects I've worked on or I'm working on"/>
</svelte:head>

<section class="portfolio">
    <h2 class="section_title">Works</h2>
    <p class="section_desc">A list of projects I've worked on or I'm working on</p>
    <div class="portfolio_list">
        {#await data.items}
            <div class="portfolio_skeleton"></div>
            <div class="portfolio_skeleton"></div>
            <div class="portfolio_skeleton"></div>
            <div class="portfolio_skeleton"></div>
        {:then items}
            {#each items as workItem}
                <PortfolioItem data={workItem} />
            {/each}
        {/await}
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

    .portfolio_skeleton {
      height: 405px;
      border-radius: 33px;
      background: linear-gradient(
        90deg,
        var(--color-dark-2) 25%,
        var(--color-dark-3) 50%,
        var(--color-dark-2) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
</style>