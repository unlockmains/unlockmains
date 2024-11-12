<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css'
	import { goto, invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import Header from '$lib/components/molecules/Header.svelte'
	import { Toaster } from 'svelte-sonner'

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
	<title>Unlock Mains</title>
</svelte:head>

<div class="container">
	<div class="bg-container"><div class="bg-image" /></div>
	<Header user={user ?? null} />
	<slot />
</div>

<Toaster richColors closeButton />

<style lang="scss">
	.container {
		.bg-container {
			height: 100%;
			pointer-events: none;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 4;
			.bg-image {
				background: url('/lib/saltandpepper.png');
				height: 100%;
				background-size: 64px;
				background-repeat: repeat;
				opacity: 0.06;
				border-radius: 0;
			}
		}
	}
</style>
