<script lang="ts">
	import { goto } from '$app/navigation'
	import ClickOutsideContext from '$lib/context/ClickOutsideContext.svelte'
	import { toggleSideNav } from '$lib/stores/sideNavStore'
	import Button from '../atoms/Button.svelte'
	import Popover from '../atoms/Popover.svelte'
	import HamburgerIcon from '../icons/HamburgerIcon.svelte'
	export let user
	export let banner: boolean = false
</script>

<header style={banner ? '--top: 3em;' : '--top: 0em;'}>
	<!-- <button on:click={toggleSideNav}>
		<HamburgerIcon />
	</button> -->
	<div>
		<img src="/unlockmains.png" alt="logo 1" style="height: 4em" />
	</div>
	<nav>
		<a href="/">Home</a>
		<a href="/pricing">Pricing</a>
		<a href="/About">About</a>
		<a href="/contact">Contact</a>
		<a href="/careers">Careers</a>
	</nav>
	<div>
		{#if user}
			<ClickOutsideContext>
				<Popover {user} />
			</ClickOutsideContext>
		{:else}
			<Button label="Login" onClick={() => goto('/login')} />
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 2em;
		height: 5em;
		top: var(--top);
		background-color: var(--color-white-900);
		position: fixed;
		width: 100%;
		z-index: 20;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

		button {
			outline: none;
			border: none;
			background: none;
		}

		nav {
			display: flex;
			gap: 1em;
			align-items: center;
			justify-content: flex-start;

			a {
				padding: 8px 16px;
				border: 1px solid transparent;
				-webkit-transition: all 500ms cubic-bezier(0.6, 0.6, 0, 1);
				transition: all 500ms cubic-bezier(0.6, 0.6, 0, 1);
				color: #292929;
				font-size: 14px;
				line-height: 24px;
				font-weight: 400;
				letter-spacing: -0.18px;
				text-decoration: none;
			}
		}
	}
</style>
