<script>
    import { page } from '$app/stores';
    import Logo from '$lib/components/Logo.svelte'
    import HeaderBgImg from '$lib/images/header_bg.jpeg'

    export let showBg = false;
</script>


<header>
    <div class="header_wrapper absolute">
        <div class="container">
            <nav class="header_nav">
                <div class="nav_left">
                   <Logo />
                </div>
                <div class="nav_right">
                    <a href="/about" aria-current={$page.url.pathname === "/about" ? 'page' : undefined}>About</a>
                    <a href="/portfolio" aria-current={$page.url.pathname === "/portfolio" ? 'page' : undefined}>Portfolio</a>
                </div>
            </nav>
        </div>
    </div>
    {#if showBg}
        <div class="header_bg__wrapper">
            <img class="header_bg" src={HeaderBgImg} alt="a house view from Istanbul / Adalar (Kınalı ada)" />
            <div class="container">
                <span class="header_bg__info">
                    <span class="header_bg__info--big">Hi, this is Ümit</span>
                    <span>Here, I share.</span>
                </span>
            </div>
        </div>
    {/if}

</header>

<style lang="scss">
    header {
      position: relative;
      color: var(--color-text-1)
    }
    .header_wrapper {
      position: relative;
      background-color: rgba(255, 255, 255, 0.1);
      height: 52px;
      border-radius: 14px;
      backdrop-filter: blur(4px);
      z-index: 99;
      width: calc(100% - 14px);
      margin: 25px auto 0 auto;
      display: flex;
      align-items: center;
      &.absolute {
        position: absolute;
        margin-top: 25px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .header_bg {
      position: absolute;
      left: 0;
      top: 0;
      filter: brightness(53%);
      width: 100%;
      height: 520px;
      z-index: -1;
      object-fit: cover;
      &__wrapper {
        width: 100%;
        height: 520px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-shadow: inset rgba(0,0,0,.2) 0px -80px 75px;
      }
      &__info {
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        margin-bottom: 50px;
        &--big {
          font-size: 3rem;
        }
      }
    }
    .header_nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      .nav_right {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 18px;
        a {
          color: var(--color-text-1);
        }
      }
    }
</style>