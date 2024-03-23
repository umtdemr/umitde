<script>
    import {createEventDispatcher} from "svelte";
    import Modal from "$lib/components/Modal/Modal.svelte";
    import PostFeatureMockImg from '$lib/images/post_mockup_featured_image.png';

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
            <img class="portfolio_modal__img" src={PostFeatureMockImg} alt="mimic" />
        </div>
        <div class="portfolio_modal__info">
            <h2 class="portfolio_modal__info--title">Mimic Robot</h2>
            <div class="portfolio_tags">
                <div class="tag_item purple">robotics</div>
            </div>
            <p class="portfolio_modal__info--content">
                Lorem ipsum dolor sit amet consectetur. Venenatis imperdiet neque lectus sapien morbi mattis massa viverra molestie. Tristique integer gravida ut ullamcorper ac tincidunt sit nulla varius. Id ultrices facilisi amet tempor. Eu non ultrices tortor vel. Volutpat facilisis risus leo varius egestas. At nam ut congue dictum vitae lobortis varius pulvinar. Ut id odio massa suscipit integer malesuada lectus. Sit nulla etiam aenean ut. Cursus ornare ornare eget interdum in leo.
                Mauris auctor lacinia blandit lacinia fringilla mauris pharetra. Sed purus proin feugiat duis nulla dui. Quam tellus suspendisse neque enim quis nullam tortor. Non sed dictumst nulla pulvinar placerat tortor tincidunt nunc. Egestas non dictum adipiscing lacus mi. Aliquam sit dictumst sed porttitor volutpat ornare et. Orci rhoncus suscipit pharetra id.
            </p>
        </div>
    </div>
</Modal>

<style lang="scss">
    .portfolio_modal {
      width: 760px;
      height: 760px;
      z-index: 999999;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 33px;
      background-color: var(--color-modal-dark-bg);
      display: grid;
      grid-template-columns: 380px 380px;
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

    }
</style>