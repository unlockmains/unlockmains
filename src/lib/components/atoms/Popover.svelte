<script lang="ts">
	import { fade } from 'svelte/transition'
	import Button from './Button.svelte'
	import { goto } from '$app/navigation'
	import UserAvatarIcon from '../icons/UserAvatarIcon.svelte'
	import { onClickOutside } from '$lib/context/ClickOutsideContext.svelte'
	import { topBannerVisible } from '$lib/stores/topBannerStore'
	export let user

	let popoverContent: HTMLDivElement
	let showPopoverContent: boolean = false
	const togglePopover = () => {
		showPopoverContent = !showPopoverContent
	}
	const hidePopover = () => {
		showPopoverContent = false
	}
</script>

<div class="popover" use:onClickOutside={hidePopover}>
	<button class="avatar" on:click={togglePopover}>
		{#if user.picture}
			<img src={user.picture} alt="user avatar" style={`height: 100%;width: 100%`} />
		{:else}
			<UserAvatarIcon />
		{/if}
	</button>

	<div
		class="popover-content"
		bind:this={popoverContent}
		class:show={showPopoverContent}
		transition:fade={{ duration: 1000 }}
		style={$topBannerVisible ? 'top: 8em;' : ''}
	>
		<div class="popover-content-header">
			{user.email}
		</div>
		<ul>
			<li><a href="/account">Account</a></li>
			<li><a href="#profile">Profile</a></li>
			<Button label="Logout" onClick={() => goto('/auth/logout')} />
		</ul>
	</div>
</div>

<style lang="scss">
	.popover {
		position: relative;

		.avatar {
			cursor: pointer;
			width: 3em;
			height: 3em;
			border-radius: 50%;
			outline: none;
			padding: 0;
			margin: 0;
			border: 1px solid grey;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.popover-content {
			--width: 15em;
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 1em;
			visibility: hidden;
			position: fixed;
			top: 5em;
			right: 0;
			width: var(--width);
			background-color: var(--color-white-900);
			border: 1px solid var(--color-zinc-200);
			border-radius: 0.5em;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			z-index: 1000;
			opacity: 0;
			padding: 1em;
			transition: all 0.2s ease;

			.popover-content-header {
				font-size: 0.8em;
			}

			&.show {
				visibility: visible;
				opacity: 1;
				transform: translate(-10px, 0);
			}

			ul {
				list-style: none;
				padding: 10px;
				margin: 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 1em;

				li {
					padding: 5px 10px;

					a {
						text-decoration: none;
						color: var(--color-black-900);
					}
					&:hover {
						background-color: var(--color-white-700);
					}
				}
			}
		}
	}
</style>
