<script>
    import { fade } from 'svelte/transition';
    import { bounceIn } from "svelte/easing";
    import {createEventDispatcher, onDestroy, onMount} from "svelte";

    const dispatch = createEventDispatcher();

    function handleModalClose() {
        dispatch('closeModal');
    }

    onMount(() => {
        document.querySelector("body").classList.add("modal--opened")
    })

    onDestroy(() => {
        document.querySelector("body").classList.remove("modal--opened")
    })

</script>
<div
    class="modal"
    transition:fade={{ duration: 100 }}>
    <div
            class="modal__backdrop"
            on:click={handleModalClose}
            role="alertdialog"
            aria-modal="true">
    </div>
    <div
        class="modal__content">
        <slot></slot>
    </div>
</div>


<style lang="scss">
  @mixin modalBg {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
  }
    .modal {
      @include modalBg;
      &__backdrop {
        @include modalBg;
        background-color: rgba(0, 0, 0, .68);
        backdrop-filter: blur(20px);
      }
    }

</style>