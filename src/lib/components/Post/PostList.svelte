<script>
    import PostItem from "$lib/components/Post/PostItem.svelte";

    export let data;
</script>


<section class="article_list">
{#each data?.posts as post}
    <PostItem post={post} />
{/each}
</section>