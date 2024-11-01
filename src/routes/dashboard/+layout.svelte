<script lang="ts">
	import Sidebar from '$lib/components/molecules/Sidebar.svelte'
	import { alwaysShow, sideNavOpen, toggleSideNav } from '$lib/stores/sideNavStore'
	import { Toaster } from 'svelte-sonner'
	export let data
</script>

<svelte:head>
	<title>Unlock Mains</title>
</svelte:head>

<div>
	<Sidebar slug={data.slug} parentSlug={data.parentSlug} />
	{#if $sideNavOpen && !$alwaysShow}
		<div class="backdrop" on:click={toggleSideNav} />
	{/if}
	<main class:sideBarSpace={$alwaysShow}>
		<slot />
	</main>
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
		z-index: 10;
	}

	main {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		justify-content: center;
		background-color: var(--color-white-800);
		width: calc(100% - max(15rem, 15%));
		min-height: max(100%, 100vh);
		gap: 2em;

		&.sideBarSpace {
			margin-left: max(15rem, 15%);
		}
	}
</style>
