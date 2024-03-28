<script>
import ProfileImgAvif from "$lib/images/umit-demir.jpeg?w=34&h=34&format=avif";
import ProfileImgWebp from "$lib/images/umit-demir.jpeg?w=34&h=34&format=webp";
import { src, width, height} from "$lib/images/umit-demir.jpeg?w=34&h=34&as=metadata";
</script>

<a href="/" class="logo">
    <picture>
        <source srcset={ProfileImgAvif} type="image/avif" />
        <source srcset={ProfileImgWebp} type="image/webp" />
        <img
            src={src}
            width={width}
            height={height}
            alt="ümit demir's selfie photo" />
    </picture>
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