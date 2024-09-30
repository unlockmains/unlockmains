<script>
	import { fly } from 'svelte/transition'
	import { sideNavOpen, toggleSideNav } from '$lib/stores/sideNavStore'
	import CrossIcon from '../icons/CrossIcon.svelte'
</script>

{#if $sideNavOpen}
	<aside transition:fly={{ x: -250, opacity: 1, duration: 200 }}>
		<button on:click={toggleSideNav}><CrossIcon /></button>
		<nav></nav>
	</aside>
{/if}

<style lang="scss">
	aside {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		padding: 2rem 1rem 0.6rem;
		border-left: 1px solid #aaa;
		background: #fff;
		overflow-y: auto;
		width: 20rem;
		z-index: 100;

		button {
            outline: none;
            border: none;
            background: none;
			display: flex;
			position: fixed;
			top: 15px;
			left: 15px;
        }
	}
</style>
