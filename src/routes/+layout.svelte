<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css'
	import Header from '$lib/components/molecules/Header.svelte'
	import { Toaster } from 'svelte-sonner'
	import Banner from '$lib/components/atoms/Banner.svelte'

	export let data

	let { user } = data
	$: ({ user } = data)
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
	<title>Unlock Mains</title>
</svelte:head>

<Banner />
<div class="bg-container">
	<div class="bg-image" />
</div>
<Header user={user ?? null} banner={true} />
<slot />

<Toaster richColors closeButton />

<style lang="scss">
	.bg-container {
		height: 100%;
		pointer-events: none;
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 0;
		opacity: 0.6;
		.bg-image {
			background: url('/lib/grid-bg.svg');
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
