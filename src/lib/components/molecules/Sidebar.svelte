<script lang="ts">
	import {
		alwaysShow,
		sideNavOpen,
		toggleCollapseSideNav,
		toggleSideNav,
		sideNavCollapse
	} from '$lib/stores/sideNavStore'
	import { topBannerVisible } from '$lib/stores/topBannerStore'
	import type { IUser } from '$lib/types'
	import CrossIcon from '../icons/CrossIcon.svelte'
	import SideBarIcons from '../icons/SideBarIcons.svelte'
	import UserAvatarIcon from '../icons/UserAvatarIcon.svelte'

	let { slug, user } = $props<{
		slug: string
		parentSlug: string
		user: IUser
	}>()

	let showSidebar = $state(false)
	let activeKey: string = $state(slug.split('/')[2] ?? 'home')

	alwaysShow.subscribe((alwaysShow) => {
		if (alwaysShow) {
			showSidebar = true
		} else {
			showSidebar = $sideNavOpen
		}
	})

	function toggleCollapse() {
		toggleCollapseSideNav()
	}
	$effect(() => {
		activeKey = slug.split('/')[2] ?? 'home'
	})
</script>

<aside class:visible={$sideNavOpen || showSidebar} class:collapsed={$sideNavCollapse}>
	{#if $sideNavOpen && !$alwaysShow}
		<button class="close-btn" onclick={toggleSideNav}>
			<CrossIcon />
		</button>
	{/if}

	<nav style={$topBannerVisible ? 'margin-top: 8.5em;' : ''}>
		<div class="top-section">
			<div class="section">
				<a
					class="section-link"
					href="/dashboard"
					class:active={activeKey === 'home'}
					onclick={() => (activeKey = 'home')}
				>
					<SideBarIcons type="home" />
					<span class="link-text">Home</span>
				</a>
			</div>
			{#if user.profile.user_type === 'STUDENT'}
				<div class="section">
					<a
						class="section-link"
						href="/dashboard/new-submission"
						class:active={activeKey === 'new-submission'}
						onclick={() => (activeKey = 'new-submission')}
					>
						<SideBarIcons type="file" />
						<span class="link-text">New Submission</span>
					</a>
				</div>
				<div class="section">
					<a
						class="section-link"
						href="/dashboard/submissions"
						class:active={activeKey === 'submissions'}
						onclick={() => (activeKey = 'submissions')}
					>
						<SideBarIcons type="submission" />
						<span class="link-text">My Submissions</span>
					</a>
				</div>
				<div class="section">
					<a
						class="section-link"
						href="/dashboard/evaluation-plan?query=my"
						class:active={activeKey === 'my-plan'}
						onclick={() => (activeKey = 'my-plan')}
					>
						<SideBarIcons type="plan" />
						<span class="link-text">My Plan</span>
					</a>
				</div>
			{/if}
			{#if user.profile.user_type === 'EVALUATOR'}
				<div class="section">
					<a
						class="section-link"
						href="/dashboard/evaluations"
						class:active={activeKey === 'evaluations'}
						onclick={() => (activeKey = 'evaluations')}
					>
						<SideBarIcons type="evaluation" />
						<span class="link-text">Evaluations</span>
					</a>
				</div>
			{/if}
		</div>
		<div class="bottom-section">
			<div class="section">
				<a
					class="section-link"
					href="/dashboard/profile"
					class:active={activeKey === 'profile'}
					onclick={() => (activeKey = 'profile')}
				>
					<UserAvatarIcon />
					<span class="link-text">Profile</span>
				</a>
			</div>
		</div>
	</nav>

	<button class="collapse-toggle" onclick={toggleCollapse}>
		{#if $sideNavCollapse}
			<SideBarIcons type="right" />
		{:else}
			<SideBarIcons type="left" />
		{/if}
	</button>
</aside>

<style lang="scss">
	aside {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		padding: 2em 1em 0.6em;
		overflow-y: auto;
		width: max(15em, 15%);
		z-index: 100;
		background-color: var(--color-zinc-800);
		transform: translateX(-100%);
		transition: all 0.3s ease;
		transform: translateX(0);

		&.visible {
			transform: translateX(0);
		}

		&.collapsed {
			width: 6em;
			padding: 2em 0.5em 0.6em;

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
			bottom: 1em;
			right: 0.5em;
			background: none;
			border: none;
			color: var(--color-white-900);
			cursor: pointer;
			padding: 0.5em;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s ease;

			&:hover {
				background-color: var(--custom-color-brand);
				border-radius: 50%;
			}
		}

		nav {
			margin-top: 6.5em;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 80%;

			.top-section,
			.bottom-section {
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

					.section-link {
						font-size: 0.9em;
						font-weight: 300;
						width: 100%;
						height: 5em;
						display: flex;
						align-items: center;
						gap: 0.5em;
						padding: 0 1em;
						border-radius: 8px;
						text-decoration: none;
						color: var(--color-black-900);
						background-color: var(--color-white-900);
						transition: all 0.3s ease;

						&:hover,
						&.active {
							background-color: var(--custom-color-brand);
							color: var(--color-white-900);

							:global(svg) {
								fill: var(--color-white-900);
							}
						}
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		aside {
			width: 4em;

			&.collapsed {
				width: 4em;
			}
		}
	}
</style>
