<script>
	let {
		title = "Datastory Sensors",
		description = "Datastory about Sensors in Public Spaces.",
		url = "",
		keywords = "",
		preloadFont = []
	} = $props();

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Datastory Sensors" />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="Datastory Sensors" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="de_DE" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	<meta name="robots" content="max-image-preview:large" />

	{#if url}
		<meta property="og:url" content={url} />
		<link rel="canonical" href={`${url}/`} />
	{/if}

	{#each preloadFont as href}
		<link rel="preload" {href} as="font" type="font/woff2" crossorigin="anonymous" />
	{/each}
</svelte:head>
