<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css'
	import Header from '$lib/components/molecules/Header.svelte'
	import { Toaster } from 'svelte-sonner'
	import Banner from '$lib/components/atoms/Banner.svelte'
	import { toggleTopBannerVisible, topBannerVisible } from '$lib/stores/topBannerStore'
	import type { LayoutData } from './$types'
	import HeaderUser from '$lib/components/molecules/HeaderUser.svelte'
	import { writable } from 'svelte/store'
	import type { IUser } from '$lib/types'
	import { setContext } from 'svelte'

	let { data } = $props<{ data: LayoutData }>()

	let { top_banner } = data

	if (top_banner) {
		toggleTopBannerVisible()
	}

	let isMobile = $state<boolean>(false)
	function checkMobile() {
		isMobile = window.innerWidth <= 768
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			checkMobile()
			window.addEventListener('resize', checkMobile)
			return () => window.removeEventListener('resize', checkMobile)
		}
	})

	const userStore = writable<IUser>(data.user || null)
	userStore.set(data.user)

	setContext('userStore', userStore)
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

{#if !data.user}
	<Header />
{:else}
	<HeaderUser />
{/if}
<div
	class:desktop={$topBannerVisible}
	class:mobileTopBanner={isMobile}
	class:mobileNoTopBanner={!$topBannerVisible && isMobile}
>
	<slot />
</div>

<Toaster richColors closeButton />

<style lang="scss">
	div {
		margin-top: 4em;

		&.desktop {
			margin-top: 8em;
		}
		&.mobileTopBanner {
			margin-top: 7em;
		}
		&.mobileNoTopBanner {
			margin-top: 3em;
		}
	}
</style>
