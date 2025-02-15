<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css'
	import Header from '$lib/components/molecules/Header.svelte'
	import { Toaster } from 'svelte-sonner'
	import Banner from '$lib/components/atoms/Banner.svelte'
	import { toggleTopBannerVisible, topBannerVisible } from '$lib/stores/topBannerStore'
	import type { LayoutData } from './$types'
	import { page } from '$app/stores'

	let { data } = $props<{ data: LayoutData }>()

	let { top_banner } = data

	if (top_banner) {
		toggleTopBannerVisible()
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap"
		rel="stylesheet"
	/>
	<title>Unlock Mains</title>
</svelte:head>

<Banner bannerText={top_banner} />

<Header user={$page.data.user} />
<div style={$topBannerVisible ? 'margin-top: 8em' : 'margin-top: 4em'}>
	<slot />
</div>

<Toaster richColors closeButton />
