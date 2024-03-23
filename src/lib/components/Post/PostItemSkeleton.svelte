<script>
    import ImageIcon from "$lib/components/icons/ImageIcon.svelte";
</script>

<div class="post_item_skeleton">
    <div class="post_item_skeleton__img">
        <ImageIcon />
    </div>
    <div class="post_item_skeleton__title"></div>
    <div class="post_item_skeleton__date"></div>
</div>


<style lang="scss">
    .post_item_skeleton {
      width: 100%;
      display: flex;
      flex-direction: column;
      &__img, &__title, &__date {
        background-color: var(--color-dark-2);
      }
      &__img {
        position: relative;
        width: 100%;
        height: 367px;
        display: grid;
        place-items: center;
      }
      &__title {
        width: 100%;
        height: 24px;
        border-radius: 6px;
        margin-top: 7px;
      }
      &__date {
        width: 75px;
        height: 13px;
        border-radius: 6px;
        margin-top: 4px;
      }
    }
</style>