<script lang="ts">
    import {createEventDispatcher, onDestroy, onMount} from "svelte";
    import Modal from "$lib/components/Modal/Modal.svelte";
    import ChevronIcon from "$lib/components/icons/ChevronIcon.svelte";
    import ModalCloseButton from "$lib/components/Modal/ModalCloseButton.svelte";

    export let data: any;
    let currentImageIdx = 0;

    let imageListWrapper: HTMLDivElement;

    let imageList: HTMLDivElement;

    let imageWidth: number;

    const dispatch = createEventDispatcher();

    function setImageSizes() {
        const images = imageList?.querySelectorAll("img");
        if (!images) {
            return;
        }
        const imageListBounding = imageListWrapper.getBoundingClientRect();
        imageWidth = imageListBounding.width;

        imageList.style.display = "grid";
        imageList.style.gridTemplateColumns = `${imageListBounding.width}px `.repeat(data.images.length);
        for (const image of images) {
            image.style.width = imageListBounding.width + 'px';
            image.style.height = imageListBounding.height + 'px';
        }
    }

    function handlePageTransform() {
        imageList.style.transform = `translateX(-${currentImageIdx * imageWidth}px)`;
    }

    function handlePageSwitch(count: number) {
        let newImageIdx = currentImageIdx + count;
        if (newImageIdx >= 0 && newImageIdx < data.images.length) {
            currentImageIdx = newImageIdx;
            handlePageTransform();
        }
    }

    function handleWindowResize() {
        setImageSizes();
        handlePageTransform();
    }

    function handleCloseModal() {
        dispatch("changePortfolioModalStatus", {
            status: false
        })
    }
    onMount(() => {
        setImageSizes()
        window.addEventListener('resize', handleWindowResize)
    })

    onDestroy(() => {
        window.removeEventListener('resize', handleWindowResize)
    })
</script>

<Modal on:closeModal={handleCloseModal}>
    <div class="portfolio_modal">
        <div class="content">
            <div class="portfolio_modal__img_wrapper" bind:this={imageListWrapper}>
                <div class="image_list" bind:this={imageList}>
                    {#each data.images as image, index}
                        <img class="" src={image.imageData.src} alt={image.imageData.src} data-id={index}/>
                    {/each}
                </div>
                {#if data.images.length > 1}
                    <button
                            class="switch_button left"
                            disabled={currentImageIdx === 0}
                            aria-label="See previous image"
                            on:click={() => handlePageSwitch(-1)}>
                        <ChevronIcon side="left" />
                    </button>
                    <button
                            class="switch_button right"
                            disabled={currentImageIdx === data.images.length - 1}
                            aria-label="See next image"
                            on:click={() => handlePageSwitch(1)}>
                        <ChevronIcon side="right" />
                    </button>
                {/if}
            </div>
            <div class="portfolio_modal__info">
                <h2 class="portfolio_modal__info--title">{data.title}</h2>
                <div class="portfolio_tags">
                    {#each data.tags as tag}
                        <div class="tag_item purple">{tag}</div>
                    {/each}
                </div>
                <p class="portfolio_modal__info--content">
                    {data.description}
                </p>
            </div>
        </div>
        <ModalCloseButton on:btnClick={handleCloseModal} />
    </div>
</Modal>

<style lang="scss">
    .portfolio_modal {
      width: 1095px;
      height: 607.5px;
      z-index: 999999;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 33px;
      background-color: var(--color-modal-dark-bg);
      scrollbar-width: thin;
      scrollbar-color: var(--color-dark-3) transparent;
      &::-webkit-scrollbar {
        width: 12px;
      }

      .content {
        position: relative;
        height: 100%;
        display: grid;
        grid-template-columns: 547.5px 547.5px;
        overflow: hidden;
      }

      &__img_wrapper {
        position: relative;
        .image_list {
          display: flex;
          transition: 300ms all;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-bottom-left-radius: 33px;
          border-top-left-radius: 33px;
          max-width: unset;
        }
      }
      &__info {
        padding: 20px;
        overflow-y: auto;
        background-color: var(--color-modal-dark-bg);
        border-radius: 33px;
        z-index: 1;
        &--title {
          font-size: 2.20rem;
          color: var(--color-text-1);
        }
        &--content {
          margin-top: 50px;
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }

      @media screen and (max-width: 1111px) {
        width: 300px;
        height: calc(333px + 280px);
        border-radius: 5px;
        .content {
          display: flex;
          flex-direction: column;
        }
        &__img_wrapper {
          height: 333px;
          border-radius: 5px !important;
          img {
            border-radius: 0 !important;
          }
        }
        &__info {
          height: 288px;
          &--title {
            font-size: 1.1rem;
          }
          &--content {
            margin-top: 15px;
            font-size: 0.9rem;
          }
        }
      }
    }
    .switch_button {
      position: absolute;
      background-color: #4c67b780;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      clip-path: circle();
      &:disabled {
        cursor: not-allowed;
        opacity: .6;
      }
      &.right {
        right: 15px;
      }
      &.left {
        left: 15px;
      }
    }
</style>