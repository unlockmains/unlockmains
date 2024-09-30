<script>
	import { alwaysShow, sideNavOpen, toggleSideNav } from '$lib/stores/sideNavStore'
	import Button from '../atoms/Button.svelte'
	import CrossIcon from '../icons/CrossIcon.svelte'

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
	{#if $sideNavOpen}
		<button on:click={toggleSideNav}><CrossIcon /></button>
	{/if}
	<nav>
		<Button label="New Submission" type="nav" />
		<div>
			<div class="section-heading">Home</div>
		</div>
		<div>
			<div class="section-heading">Submissions</div>
			<li>Evaluated</li>
			<li>Pending</li>
		</div>
		<div>
			<div class="section-heading">Submissions</div>
			<li>Evaluated</li>
			<li>Pending</li>
		</div>
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
			margin-top: 6em;

			.section-heading {
				font-size: 1em;
				font-weight: 700;
				margin: 0.5em;
			}
		}
	}
</style>
