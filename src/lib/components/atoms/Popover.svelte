<script lang="ts">
	import { fade } from 'svelte/transition'
	import Button from './Button.svelte'
	import { goto } from '$app/navigation'
	import UserAvatarIcon from '../icons/UserAvatarIcon.svelte'
	import { onClickOutside } from '$lib/context/ClickOutsideContext.svelte'
	export let user

	let { user_metadata } = user

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
		{#if user_metadata.avatar_url}
			<span
				style={`background-image: url(${user_metadata.avatar_url});background-size: cover;height: 100%;width: 100%`}
			/>
		{:else}
			<UserAvatarIcon />
		{/if}
	</button>

	<div
		class="popover-content"
		bind:this={popoverContent}
		class:show={showPopoverContent}
		transition:fade={{ duration: 1000 }}
	>
		<div>
			{user.email}
		</div>
		<ul>
			<li><a href="#account">Account</a></li>
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
			top: 4em;
			right: 0;
			width: var(--width);
			background-color: white;
			border: 1px solid #ccc;
			border-radius: 0.5em;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			z-index: 1000;
			opacity: 0;
			padding: 1em;
			transition: all 0.2s ease;

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
						color: black;
					}
					&:hover {
						background-color: #f0f0f0;
					}
				}
			}
		}
	}
</style>
