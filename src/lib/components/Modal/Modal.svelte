<script>
    import { fade } from 'svelte/transition';
    import { bounceIn } from "svelte/easing";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function handleModalClose() {
        dispatch('closeModal');
    }

</script>
<div
    class="modal__backdrop"
    on:click={handleModalClose}
    transition:fade={{ duration: 100 }}>
    <div
            role="alertdialog"
            aria-modal="true">
        <slot></slot>
    </div>
</div>


<style lang="scss">
    .modal {
      &__backdrop {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .68);
        z-index: 99;
        backdrop-filter: blur(20px);
      }
    }

</style>