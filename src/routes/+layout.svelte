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

	onMount(() => {
		if (user) goto('/dashboard')
	})
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

<div>
	<Header user={user ?? null} />
	<slot />
</div>

<Toaster richColors closeButton />
