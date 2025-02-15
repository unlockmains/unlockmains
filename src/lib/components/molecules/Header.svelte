<script lang="ts">
	import { goto } from '$app/navigation'
	import ClickOutsideContext from '$lib/context/ClickOutsideContext.svelte'
	import { topBannerVisible } from '$lib/stores/topBannerStore'
	import type { IUser } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import Popover from '../atoms/Popover.svelte'
	import HamburgerIcon from '../icons/HamburgerIcon.svelte'
	import { onMount } from 'svelte'
	let { user } = $props<{ user: IUser }>()

	let isMenuOpen = $state(false)
	let headerElement: HTMLElement

	const toggleMenu = () => (isMenuOpen = !isMenuOpen)

	const handleClickOutside = (event: MouseEvent) => {
		if (isMenuOpen && headerElement && !headerElement.contains(event.target as Node)) {
			isMenuOpen = false
		}
	}

	const handleLinkClick = () => {
		if (isMenuOpen) {
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
	<button class="mobile-menu-btn" onclick={toggleMenu}>
		<HamburgerIcon />
	</button>

	<a class="logo-container" href="/">
		<img src="/um-main.png" alt="logo 1" />
	</a>

	<nav class:active={isMenuOpen}>
		<div class="nav-links">
			<a onclick={handleLinkClick} href="/">Home</a>
			<a onclick={handleLinkClick} href="/pricing">Pricing</a>
			<a onclick={handleLinkClick} href="/about">About</a>
			<a onclick={handleLinkClick} href="/contact">Contact</a>
			<a onclick={handleLinkClick} href="/careers">Careers</a>
		</div>

		<div class="mobile-auth">
			{#if user}
				<ClickOutsideContext>
					<Popover {user} />
				</ClickOutsideContext>
			{:else}
				<Button
					label="Login"
					onClick={() => {
						handleLinkClick()
						goto('/login')
					}}
				/>
			{/if}
		</div>
	</nav>

	<div class="desktop-auth">
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

	.mobile-menu-btn {
		display: none;
		outline: none;
		border: none;
		background: none;
		cursor: pointer;
		padding: 0.5rem;

		@media (max-width: 768px) {
			display: block;
		}
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1em;

		@media (max-width: 768px) {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			background-color: var(--color-zinc-800);
			padding: 1rem;
			flex-direction: column;
			align-items: flex-start;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

			&.active {
				display: flex;
			}
		}

		.nav-links {
			display: flex;
			gap: 1em;
			align-items: center;

			@media (max-width: 768px) {
				flex-direction: column;
				align-items: flex-start;
				width: 100%;
			}

			a {
				padding: 8px 16px;
				transition: all 500ms cubic-bezier(0.6, 0.6, 0, 1);
				color: white;
				text-decoration: none;
				border-radius: 0.5em;

				&:hover {
					border-color: rgba(255, 255, 255, 0.1);
					box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1);
				}

				@media (max-width: 768px) {
					width: 100%;
					padding: 12px 16px;
				}
			}
		}
	}

	.mobile-auth {
		display: none;

		@media (max-width: 768px) {
			display: block;
			width: 100%;
			margin-top: 1rem;
		}
	}

	.desktop-auth {
		@media (max-width: 768px) {
			display: none;
		}
	}
</style>
