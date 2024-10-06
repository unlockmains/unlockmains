<script lang="ts">
	import { goto } from '$app/navigation'
	import { toggleSideNav } from '$lib/stores/sideNavStore'
	import Button from '../atoms/Button.svelte'
	import HamburgerIcon from '../icons/HamburgerIcon.svelte'
	export let user
</script>

<header>
	<button on:click={toggleSideNav}>
		<HamburgerIcon />
	</button>
	<div>
		<img src="/unlockmains.png" alt="logo 1" style="height: 4em"/>
	</div>
	<nav></nav>
	<div>
		{#if user}
			<span>{user.email}</span>
			<Button label="Logout" onClick={() => goto('/auth/logout')} />
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
		padding: 10px;
		border: 1px solid var(--color-zinc-400);
		height: 5em;

		button {
			outline: none;
			border: none;
			background: none;
		}
	}
</style>
