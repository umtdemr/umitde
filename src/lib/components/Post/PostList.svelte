<script>
    import PostItem from "$lib/components/Post/PostItem.svelte";

    export let data;
</script>


{#each data?.posts as post}
    <PostItem post={post} />
{/each}
