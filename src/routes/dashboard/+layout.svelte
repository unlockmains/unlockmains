<script lang="ts">
	import Sidebar from '$lib/components/molecules/Sidebar.svelte'
	import { sideNavOpen, toggleSideNav } from '$lib/stores/sideNavStore'
	import { Toaster } from 'svelte-sonner'
</script>

<svelte:head>
	<title>Unlock Mains</title>
</svelte:head>

<div>
	<Sidebar />
	{#if $sideNavOpen}
		<div class="backdrop" on:click={toggleSideNav} />
	{/if}
	<slot />
</div>

<Toaster richColors closeButton />

<style lang="scss">
	.backdrop {
		background-color: var(--color-black-600);
		position: absolute;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
	}
</style>
