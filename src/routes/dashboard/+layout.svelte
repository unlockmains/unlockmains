<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Sidebar from '$lib/components/molecules/Sidebar.svelte'
	import { alwaysShow, sideNavOpen, toggleSideNav, sideNavCollapse } from '$lib/stores/sideNavStore'
	import type { IStudentProfile, IUser } from '$lib/types'
	import { type Snippet } from 'svelte'
	import { Toaster } from 'svelte-sonner'
	let { data, children } = $props<{
		slug: string
		parentSlug: string
		userType: string
		adminApproved: boolean
		user: IUser
		profile: IStudentProfile
		children: Snippet
	}>()
	$effect(() => {
		const plan = browser && sessionStorage.getItem('plan')
		if (plan) {
			goto(`/dashboard/profile`)
		}
	})
	let isMobile = $state(false)
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
</script>

<svelte:head>
	<title>Unlock Mains</title>
</svelte:head>

{#if data.adminApproved}
	<Sidebar slug={data.slug} parentSlug={data.parentSlug} user={data.user} />
{/if}
{#if $sideNavOpen && !$alwaysShow}
	<div class="backdrop" on:click={toggleSideNav}></div>
{/if}
<main class:sideBarSpace={$alwaysShow} class:collapse={$sideNavCollapse} class:mobile={isMobile}>
	{@render children()}
</main>

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

		&.collapse {
			margin-left: 6em;
			width: calc(100% - 6em);
		}

		&.mobile {
			width: 100%;
			margin: 4em 0 5em 0;
		}

		@media only screen and (max-width: 768px) {
			width: 100%;
		}
	}
</style>
