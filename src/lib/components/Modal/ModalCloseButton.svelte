<script>
    import {createEventDispatcher} from "svelte";
    import CloseIcon from "$lib/components/icons/CloseIcon.svelte";
    const dispatch = createEventDispatcher();

</script>

<button
    class="modal_close"
    aria-label="Close modal"
    on:click={() => dispatch('btnClick')}
    >
    <CloseIcon width={19} height={18} />
</button>


<style lang="scss">
    .modal_close {
      position: absolute;
      top: -30px;
      right: 0;
    }
</style>