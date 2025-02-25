<script lang="ts">
	import { PUBLIC_AVATAR_API } from '$env/static/public'
	import {
		alwaysShow,
		sideNavOpen,
		toggleCollapseSideNav,
		sideNavCollapse
	} from '$lib/stores/sideNavStore'
	import { topBannerVisible } from '$lib/stores/topBannerStore'
	import type { IUser } from '$lib/types'
	import { getContext } from 'svelte'
	import SideBarIcons from '../icons/SideBarIcons.svelte'
	import UserAvatarIcon from '../icons/UserAvatarIcon.svelte'
	import type { Writable } from 'svelte/store'

	let { slug, user } = $props<{
		slug: string
		parentSlug: string
		user: IUser
	}>()

	let showSidebar = $state(false)
	let activeKey: string = $state(slug.split('/')[2] ?? 'home')
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

	const userStore = getContext<Writable<IUser>>('userStore')
</script>

<aside
	class:visible={$sideNavOpen || showSidebar}
	class:collapsed={$sideNavCollapse}
	class:mobile={isMobile}
>
	<nav style={$topBannerVisible && !isMobile ? 'margin-top: 8.5em;' : ''}>
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
						href="/dashboard/plans"
						class:active={activeKey === 'plans'}
						onclick={() => (activeKey = 'plans')}
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
					<img
						src={`${PUBLIC_AVATAR_API}${$userStore?.name}`}
						alt="avatar"
						width="32px"
						height="32px"
					/>
					<span class="link-text">Profile</span>
				</a>
			</div>
		</div>
	</nav>

	{#if !isMobile}
		<button class="collapse-toggle" onclick={toggleCollapse}>
			{#if $sideNavCollapse}
				<SideBarIcons type="right" />
			{:else}
				<SideBarIcons type="left" />
			{/if}
		</button>
	{/if}
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

		&.mobile {
			top: auto;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: auto;
			transform: translateY(0);
			padding: 0.5em;
			border-top: 1px solid var(--color-zinc-700);
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

			nav {
				margin-top: 0;
				height: auto;
				flex-direction: row;

				.top-section {
					flex-direction: row;
					justify-content: flex-start;
					width: 100%;
					gap: 2em;

					.section {
						width: 4em;
						height: 4em;

						.section-link {
							flex-direction: column;
							height: auto;
							padding: 0.5em;
							width: auto;
							gap: 0.2em;

							img {
								border-radius: 50%;
							}

							.link-text {
								font-size: 0.7em;
								display: none;
							}
						}
					}
				}

				.bottom-section {
					.section {
						width: 4em;
						height: 4em;

						.section-link {
							flex-direction: column;
							height: auto;
							padding: 0.5em;
							width: auto;
							gap: 0.2em;

							.link-text {
								font-size: 0.7em;
								display: none;
							}
						}
					}
				}
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
</style>
