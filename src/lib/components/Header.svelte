<script>
    import { page } from '$app/stores';
    import { beforeNavigate } from "$app/navigation";
    import { fade, blur } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import Logo from '$lib/components/Logo.svelte'
    import { src, width, height } from '$lib/images/header_bg.jpeg?as=metadata'
    import HeaderBgImgAvif from '$lib/images/header_bg.jpeg?format=avif'
    import HeaderBgImgWebp from '$lib/images/header_bg.jpeg?format=webp'
    import CloseIcon from "$lib/components/icons/CloseIcon.svelte";


    const dispatch = createEventDispatcher();

    export let showBg = false;
    let showMobileMenu = false;

    function handleSearchIconClick(e) {
        e?.preventDefault();
        dispatch('changeSearchModalStatus', {
            status: true
        });
    }

    function toggleMobileMenu(state) {
        showMobileMenu = state;
    }

    function handleMenuButtonClick() {
        toggleMobileMenu(true);
    }

    beforeNavigate(() => {
        showMobileMenu = false;
    })
</script>


<header>
    <div class="header_wrapper" class:absolute={showBg}>
        <div class="container nav_container">
            <nav class="header_nav">
                <div class="nav_left">
                   <Logo />
                </div>
                <div class="nav_right">
                    <a href="/" aria-current={$page.url.pathname === "/" ? 'page' : undefined}>Home</a>
                    <a href="/about" aria-current={$page.url.pathname === "/about" ? 'page' : undefined}>About</a>
                    <a href="/works" aria-current={$page.url.pathname === "/works" ? 'page' : undefined}>Works</a>
<!--                    <button on:click={handleSearchIconClick} aria-label="Search"><SearchIcon /></button>-->
                    <button class="mobile_menu_btn" on:click={handleMenuButtonClick} aria-label="Menu"></button>
                </div>
            </nav>
        </div>
    </div>
    {#if showBg}
        <div class="header_bg__wrapper">
            <picture>
                <source srcset={HeaderBgImgAvif} type="image/avif" />
                <source srcset={HeaderBgImgWebp} type="image/webp" />
                <img
                    class="header_bg"
                    src={src}
                    width={width}
                    height={height}
                    alt="a house view from Istanbul / Adalar (Kınalı ada)" />
            </picture>
            <div class="container">
                <span class="header_bg__info">
                    <span class="header_bg__info--big">Hi, this is Ümit</span>
                    <span>Here, I share.</span>
                </span>
            </div>
        </div>
    {/if}
</header>
{#if showMobileMenu}
    <div
        transition:fade={{  duration: 100 }}
        class="mobile_menu">
        <div class="container">
            <div class="mobile_menu__header">
                <h2>Menu</h2>
                <button aria-label="Close mobile menu" on:click={() => toggleMobileMenu(false)}>
                    <CloseIcon width={16} height={16} />
                </button>
            </div>
            <nav class="mobile_menu__nav">
                <ul>
                    <li>
                        <a href="/" aria-current={$page.url.pathname === "/" ? 'page' : undefined}>Home</a>
                    </li>
                    <li>
                        <a href="/about" aria-current={$page.url.pathname === "/about" ? 'page' : undefined}>About</a>
                    </li>
                    <li>
                        <a href="/works" aria-current={$page.url.pathname === "/works" ? 'page' : undefined}>Works</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <div
        transition:fade={{ duration: 100 }}
        class="mobile_menu__overlay"
        on:click={() => toggleMobileMenu(false)}>
    </div>
{/if}

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
      filter: brightness(45%);
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
        a, button {
          color: var(--color-text-2);
        }
        a[aria-current='page'] {
          color: var(--color-text-1);
        }
        .mobile_menu_btn {
          display: none;
          width: 30px;
          height: 30px;
          position: relative;
          &::before, &::after {
            content: "";
            background-color: #fff;
            height: 1px;
            left: 3px;
            position: absolute;
            width: 24px;
          }
          &::before {
            top: 11px;
          }
          &::after {
            bottom: 11px;
          }
        }
        @media screen and (max-width: 790px) {
          .mobile_menu_btn {
            display: block;
          }
          a {
            display: none;
          }
        }
      }
    }
    .mobile_menu {
      position: absolute;
      margin-top: 25px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 14px);
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      backdrop-filter: blur(4px);
      z-index: 100;
      display: flex;
      align-items: center;
      padding: 14px 0 19px 0;
      &__overlay {
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .68);
        backdrop-filter: blur(20px);
        width: 100%;
        height: 100%;
        z-index: 99;
      }
      &__header {
        display: flex;
        justify-content: space-between;
        color: var(--color-text-1);
        padding: 10px 0 20px 0;
      }
      &__nav {
        display: flex;
        flex-direction: column;
        gap: 18px;
        li {
          padding: 15px 0;
          border-bottom: 1px solid hsla(240,5%,96%,.05);
        }
        a {
          color: var(--color-text-2);
          &[aria-current='page'] {
            color: var(--color-text-1);
          }
        }
      }
    }
    @media screen and (max-width: 790px) {
      .header_bg {
        height: 370px;
        &__wrapper {
          height: 370px;
        }
        &__info {
          &--big {
            font-size: 2.4rem;
          }
        }
      }
    }
</style>
