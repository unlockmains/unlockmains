<script lang="ts">
	import { goto } from '$app/navigation'
	import { alwaysShow, sideNavOpen, toggleSideNav } from '$lib/stores/sideNavStore'
	import { topBannerVisible } from '$lib/stores/topBannerStore'
	import type { IUser } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import CollapsibleSection from '../atoms/CollapsibleSection.svelte'
	import CrossIcon from '../icons/CrossIcon.svelte'
	// import ChevronLeftIcon from '../icons/ChevronLeftIcon.svelte' // You'll need to create these icon components
	// import ChevronRightIcon from '../icons/ChevronRightIcon.svelte'
	// import HomeIcon from '../icons/HomeIcon.svelte'
	// import FileIcon from '../icons/FileIcon.svelte'
	// import PlanIcon from '../icons/PlanIcon.svelte'

	let { slug, parentSlug, user } = $props<{
		slug: string
		parentSlug: string
		user: IUser
	}>()

	let showSidebar = $state(false)
	let isCollapsed = $state(false)

	alwaysShow.subscribe((alwaysShow) => {
		if (alwaysShow) {
			showSidebar = true
		} else {
			showSidebar = $sideNavOpen
		}
	})

	function toggleCollapse() {
		isCollapsed = !isCollapsed
	}
</script>

<aside class:visible={$sideNavOpen || showSidebar} class:collapsed={isCollapsed}>
	{#if $sideNavOpen && !$alwaysShow}
		<button class="close-btn" on:click={toggleSideNav}>
			<CrossIcon />
		</button>
	{/if}

	<nav style={$topBannerVisible ? 'margin-top: 8.5em;' : ''}>
		<div class="section">
			<a class="section-link" href="/dashboard">
				<!-- <HomeIcon /> -->
				🏠
				<span class="link-text">Home</span>
			</a>
		</div>
		{#if user.profile.user_type === 'STUDENT'}
			<div class="section">
				<Button label="🗄️" type="nav" onClick={() => goto(`${parentSlug}/new-submission`)}>
					<!-- <FileIcon /> -->

					<span class="link-text">New Submission</span>
				</Button>
			</div>
		{/if}

		<CollapsibleSection headerText="💸" noOfLinks={2}>
			<div class="section">
				<a class="section-link" href="/dashboard/evaluation-plan?query=my">
					<!-- <PlanIcon /> -->
					💸
					<span class="link-text">My Plan</span>
				</a>
				<a class="section-link" href="/dashboard/evaluation-plan?query=all">
					<!-- <PlanIcon /> -->
					💸
					<span class="link-text">All Plans</span>
				</a>
			</div>
		</CollapsibleSection>
	</nav>

	<button class="collapse-toggle" on:click={toggleCollapse}>
		{#if isCollapsed}
			<!-- <ChevronRightIcon /> -->
			👉
		{:else}
			<!-- <ChevronLeftIcon /> -->
			👈
		{/if}
	</button>
</aside>

<style lang="scss">
	aside {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		padding: 2rem 1rem 0.6rem;
		overflow-y: auto;
		width: max(15rem, 15%);
		z-index: 100;
		background-color: var(--color-zinc-800);
		transform: translateX(-100%);
		transition: all 0.3s ease;

		&.visible {
			transform: translateX(0);
		}

		&.collapsed {
			width: 4rem;
			padding: 2rem 0.5rem 0.6rem;

			.link-text {
				display: none;
			}

			.section-link {
				justify-content: center;
				padding: 0;
			}

			:global(.collapsible-header span) {
				display: none;
			}
		}

		.close-btn {
			outline: none;
			border: none;
			background: none;
			display: flex;
			position: fixed;
			top: 15px;
			left: 15px;
			cursor: pointer;
			color: var(--color-white-900);

			&:hover {
				opacity: 0.8;
			}
		}

		.collapse-toggle {
			position: absolute;
			bottom: 1rem;
			right: 0.5rem;
			background: none;
			border: none;
			color: var(--color-white-900);
			cursor: pointer;
			padding: 0.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s ease;

			&:hover {
				background-color: var(--color-black-600);
				border-radius: 50%;
			}
		}

		nav {
			margin-top: 6.5em;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
			gap: 1em;

			.section {
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 0.5em;
				width: 100%;

				.section-heading {
					font-size: 0.75em;
					font-weight: 700;
					margin: 0.5em;
					text-transform: uppercase;
					margin-bottom: 0;
					padding-bottom: 0;
				}

				.section-link {
					font-size: 0.9em;
					font-weight: 300;
					width: 100%;
					height: 2em;
					display: flex;
					align-items: center;
					gap: 0.5rem;
					padding: 0 1em;
					border-radius: 8px;
					text-decoration: none;
					color: var(--color-black-900);
					background-color: var(--color-gold-400);
					transition: all 0.3s ease;

					&:hover {
						background-color: var(--color-black-600);
						color: var(--color-white-900);
					}

					:global(svg) {
						width: 1.2em;
						height: 1.2em;
						flex-shrink: 0;
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		aside {
			width: 100%;

			&.collapsed {
				width: 4rem;
			}
		}
	}
</style>
