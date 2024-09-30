<script lang="ts">
	import { goto } from '$app/navigation'
	import { toggleSideNav } from '$lib/stores/sideNavStore'
	import Button from '../atoms/Button.svelte'
	import HamburgerIcon from '../icons/HamburgerIcon.svelte'
</script>

<header>
	<button on:click={toggleSideNav}>
		<HamburgerIcon />
	</button>
	<div>Logo</div>
	<nav></nav>
	<div>
		<Button label="Login" onClick={() => goto('/login')} />
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
        
        button {
            outline: none;
            border: none;
            background: none;
        }
	}
</style>
