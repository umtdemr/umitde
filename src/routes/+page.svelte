<script>
	import PostList from "$lib/components/Post/PostList.svelte";
	import { src, format, width, height } from '$lib/images/header_bg.jpeg?as=metadata'
	import {page} from "$app/stores";
	import website from "$lib/config/website";

	export let data;
</script>

<svelte:head>
	<title>{website.siteTitle}</title>
	<meta name="description" content="Software engineer based in Istanbul, Turkey" />
	<meta property="og:title" content={website.siteTitle} />
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
	<meta property="twitter:title" content={website.siteTitle} />
	<meta property="twitter:description" content="Software engineer based in Istanbul, Turkey" />
	<meta property="twitter:image" content={src} />
	<meta property="twitter:image:width" content={width} />
	<meta property="twitter:image:height" content={height} />
	<meta property="twitter:image:type" content={'image/' + format} />
</svelte:head>

<PostList data={data} />

<style lang="scss">

</style>
