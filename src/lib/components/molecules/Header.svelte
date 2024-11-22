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
	<button on:click={toggleSideNav}>
		<HamburgerIcon />
	</button>
	<div>
		<img src="/unlockmains.png" alt="logo 1" style="height: 4em" />
	</div>
	<nav></nav>
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

		button {
			outline: none;
			border: none;
			background: none;
		}
	}
</style>
