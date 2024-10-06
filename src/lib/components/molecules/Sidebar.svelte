<script lang="ts">
	import { goto } from '$app/navigation'
	import { alwaysShow, sideNavOpen, toggleSideNav } from '$lib/stores/sideNavStore'
	import Button from '../atoms/Button.svelte'
	import CollapsibleSection from '../atoms/CollapsibleSection.svelte'
	import CrossIcon from '../icons/CrossIcon.svelte'
	export let slug: string = ''
	export let parentSlug: string = ''

	let showSidebar = false

	alwaysShow.subscribe((alwaysShow) => {
		if (alwaysShow) {
			showSidebar = true
		} else {
			showSidebar = $sideNavOpen
		}
	})
</script>

<aside class:visible={$sideNavOpen || showSidebar}>
	{#if $sideNavOpen && !$alwaysShow}
		<button on:click={toggleSideNav}><CrossIcon /></button>
	{/if}
	<nav>
		<Button label="New Submission" type="nav" onClick={() => goto(`${parentSlug}/new-submission`)} />
		<div class="section">
			<a class="section-link" href="/dashboard">Home</a>
		</div>
		<CollapsibleSection headerText="Submissions" noOfLinks={3}>
			<div class="section">
				<a class="section-link" href="/dashboard/submission?query=all">All</a>
				<a class="section-link" href="/dashboard/submission?query=evaluated">Evaluated</a>
				<a class="section-link" href="/dashboard/submission?query=pending">Pending</a>
			</div>
		</CollapsibleSection>
		<CollapsibleSection headerText="Evaluation Plan" noOfLinks={2}>
			<div class="section">
				<a class="section-link" href="/dashboard/evaluation-plan?query=my">My Plan</a>
				<a class="section-link" href="/dashboard/evaluation-plan?query=all">All Plans</a>
			</div>
		</CollapsibleSection>
		<CollapsibleSection headerText="Question Bank" noOfLinks={2}>
			<div class="section">
				<a class="section-link" href="/dashboard/question-bank?query=essay">Essay</a>
				<a class="section-link" href="/dashboard/question-bank?query=mains">Mains</a>
			</div>
		</CollapsibleSection>
	</nav>
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
		background-color: var(--custom-color-brand);
		transform: translateX(-100%);
		transition: all 1s ease;

		&.visible {
			transform: translateX(0);
		}

		button {
			outline: none;
			border: none;
			background: none;
			display: flex;
			position: fixed;
			top: 15px;
			left: 15px;
		}

		nav {
			margin-top: 3.5em;
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

				.divider {
					width: 100%;
					border: 1px solid var(--color-black-600);
					margin: 0;
					padding: 0;
				}

				.section-link {
					font-size: 0.9em;
					font-weight: 300;
					width: 100%;
					height: 2em;
					display: flex;
					align-items: center;
					padding: 0 1em;
					border-radius: 8px;
					text-decoration: none;
					color: var(--color-black-900);
					background-color: var(--color-gold-400);

					&:hover {
						background-color: var(--color-black-600);
						color: var(--color-white-900);
					}
				}
			}
		}
	}
</style>
