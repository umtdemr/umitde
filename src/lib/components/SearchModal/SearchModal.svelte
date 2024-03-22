<script>
    import { createEventDispatcher} from "svelte";
    import Modal from "$lib/components/Modal/Modal.svelte";

    const dispatch = createEventDispatcher();

    function handleCloseModal() {
        dispatch("changeSearchModalStatus", {
            status: false
        })
    }
</script>

<Modal on:closeModal={handleCloseModal}>
    Search modal
</Modal>