<script>
import ProfileImg from "$lib/images/umit-demir.jpeg";
</script>

<a href="/" class="logo">
    <img src={ProfileImg} alt="ümit demir's selfie photo" />
    Ümit Demir
</a>


<style lang="scss">
    .logo {
        display: flex;
        align-items: center;
        color: var(--color-text-1);
        gap: 10px;
        cursor: pointer;
        img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
        }
    }
</style>