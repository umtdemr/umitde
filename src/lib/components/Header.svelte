<script>
    import ProfileImg from '$lib/images/umit-demir.jpeg'
    import HeaderBgImg from '$lib/images/header_bg.jpeg'
</script>


<header>
    <div class="header_wrapper absolute">
        <div class="container">
            <nav>
               <a>Ümit Demir</a>
            </nav>
        </div>
    </div>
    <div class="header_bg__wrapper">
        <img class="header_bg" src={HeaderBgImg} alt="a house view from Istanbul / Adalar (Kınalı ada)" />
        <div class="container">
            <span class="header_bg__info">
                <span class="header_bg__info--big">Hi, this is Ümit</span>
                <span>Here, I share.</span>
            </span>
        </div>
    </div>

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
      }
      &__info {
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        margin-bottom: 50px;
        &--big {
          font-size: 3rem;
          line-height: 0;
          margin-bottom: 1rem;
        }
      }
    }
</style>