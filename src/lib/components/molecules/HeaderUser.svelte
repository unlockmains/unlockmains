<script lang="ts">
	import ClickOutsideContext from '$lib/context/ClickOutsideContext.svelte'
	import { topBannerVisible } from '$lib/stores/topBannerStore'
	import type { IUser } from '$lib/types'
	import Popover from '../atoms/Popover.svelte'
	import { onMount } from 'svelte'
	let { user } = $props<{ user: IUser }>()

	let isMenuOpen = $state(false)
	let headerElement: HTMLElement

	const handleClickOutside = (event: MouseEvent) => {
		if (isMenuOpen && headerElement && !headerElement.contains(event.target as Node)) {
			isMenuOpen = false
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	})
</script>

<header bind:this={headerElement} style={$topBannerVisible ? '--top: 3em;' : '--top: 0em;'}>
	<a class="logo-container" href="/">
		<img src="/um-main.png" alt="logo 1" />
	</a>

	<div class="desktop-auth">
		<ClickOutsideContext>
			<Popover {user} />
		</ClickOutsideContext>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		height: 5em;
		top: var(--top);
		background-color: var(--color-zinc-800);
		position: fixed;
		width: 100%;
		z-index: 999;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);

		@media (max-width: 768px) {
			padding: 0.5rem;
		}
	}

	.logo-container {
		img {
			height: 4em;

			@media (max-width: 768px) {
				height: 3em;
			}
		}
	}

	.desktop-auth {
		@media (max-width: 768px) {
			display: none;
		}
	}
</style>
