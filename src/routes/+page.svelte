<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import PostList from "$lib/components/Post/PostList.svelte";
	import { src, format, width, height } from '$lib/images/header_bg.jpeg?as=metadata'
	import {page} from "$app/stores";

	export let data;
</script>

<svelte:head>
	<title>Ümit Demir</title>
	<meta name="description" content="Software engineer based in Istanbul, Turkey" />
	<meta property="og:title" content="Ümit Demir" />
	<meta property="og:description" content="Software engineer based in Istanbul, Turkey" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:image" content={src} />
	<meta property="og:image:width" content={width} />
	<meta property="og:image:height" content={height} />
	<meta property="og:image:type" content={'image/' + format} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:site" content="@mediumgoal" />
	<meta property="twitter:creator" content="@mediumgoal" />
	<meta property="twitter:title" content="Ümit Demir" />
	<meta property="twitter:description" content="Software engineer based in Istanbul, Turkey" />
	<meta property="twitter:image" content={src} />
	<meta property="twitter:image:width" content={width} />
	<meta property="twitter:image:height" content={height} />
	<meta property="twitter:image:type" content={'image/' + format} />
</svelte:head>

<section>
	<PostList data={data} />
</section>

<style lang="scss">

</style>
