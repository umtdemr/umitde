<script>
    import {createEventDispatcher} from "svelte";
    import Modal from "$lib/components/Modal/Modal.svelte";
    import Image from "$lib/assets/works/hierapi.jpg";

    export let data;

    const dispatch = createEventDispatcher();

    function handleCloseModal() {
        dispatch("changePortfolioModalStatus", {
            status: false
        })
    }
</script>

<Modal on:closeModal={handleCloseModal}>
    <div class="portfolio_modal">
        <div class="portfolio_modal__img">
            <img class="portfolio_modal__img" src={data.images[0].imageData.src} alt={data.images[0].imageData.src} />
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
      display: grid;
      grid-template-columns: 547.5px 547.5px;

      scrollbar-width: thin;
      scrollbar-color: var(--color-dark-3) transparent;
      &::-webkit-scrollbar {
        width: 12px;
      }

      &__img {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-bottom-left-radius: 33px;
          border-top-left-radius: 33px;
        }
      }
      &__info {
        padding: 20px;
        overflow-y: auto;
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
        max-width: 650px;
        width: calc(100% - 15px);
        height: 600px;
        grid-template-columns: 1fr;
        grid-template-rows: 300px 300px;
        border-radius: 5px;
        overflow-y: auto;
        &__img {
          border-radius: 5px !important;
          img {
            aspect-ratio: 1;
          }
        }
        &__info {
          &--title {
            font-size: 1.5rem;
          }
          &--content {
            margin-top: 15px;
            font-size: 0.9rem;
          }
        }
      }
    }
</style>