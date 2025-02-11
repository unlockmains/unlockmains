<script lang="ts">
	import Sidebar from '$lib/components/molecules/Sidebar.svelte'
	import { alwaysShow, sideNavOpen, toggleSideNav } from '$lib/stores/sideNavStore'
	import type { IUser } from '$lib/types'
	import type { Snippet } from 'svelte'
	import { Toaster } from 'svelte-sonner'
	let { data, children } = $props<{
		slug: string
		parentSlug: string
		userType: string
		adminApproved: boolean
		user: IUser
		children: Snippet
	}>()
</script>

<svelte:head>
	<title>Unlock Mains</title>
</svelte:head>

<div>
	{#if data.adminApproved}
		<Sidebar slug={data.slug} parentSlug={data.parentSlug} user={data.user} />
	{/if}
	{#if $sideNavOpen && !$alwaysShow}
		<div class="backdrop" on:click={toggleSideNav}></div>
	{/if}
	<main class:sideBarSpace={$alwaysShow}>
		{@render children()}
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
		flex-flow: column;
		gap: 2em;
		align-items: center;
		justify-content: center;
		background-color: var(--color-white-800);
		width: calc(100% - max(15rem, 15%));
		min-height: max(100%, 100vh);
		margin-top: 5em;

		&.sideBarSpace {
			margin-left: max(15rem, 15%);
		}

		@media only screen and (max-width: 768px) {
			width: 100%;
		}
	}
</style>
