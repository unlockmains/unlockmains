<script lang="ts">
	import { topBannerVisible } from '$lib/stores/topBannerStore'
	import type { IUser } from '$lib/types'
	import { getContext, onMount } from 'svelte'
	import UserAvatarIcon from '../icons/UserAvatarIcon.svelte'
	import LogoutIcon from '../icons/LogoutIcon.svelte'
	import type { Writable } from 'svelte/store'
	import { PUBLIC_AVATAR_API } from '$env/static/public'

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

	const userStore = getContext<Writable<IUser>>('userStore')
</script>

<header bind:this={headerElement} style={$topBannerVisible ? '--top: 3em;' : '--top: 0em;'}>
	<a class="logo-container" href="/dashboard">
		<img src="/um-main.png" alt="logo 1" />
	</a>

	<div class="user">
		<img src={`${PUBLIC_AVATAR_API}${$userStore?.name}`} alt="avatar" width="32px" height="32px" />
		<div class="name-email">
			<p>{$userStore?.name}</p>
			<p>{$userStore?.email}</p>
		</div>
		<form action="/auth/logout" method="post">
			<button><LogoutIcon /></button>
		</form>
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
			height: 3.5em;
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

	.user {
		border-radius: var(--custom-border-radius);
		background-color: var(--color-white-500);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 0 1em;

		.name-email {
			display: flex;
			flex-direction: column;
			gap: 0.5em;
			p {
				font-size: 0.8em;
				padding: 0;
				margin: 0;
			}
		}

		form {
			cursor: pointer;
			padding: 0;
			margin: 0;
			button {
				background-color: transparent;
				border: none;
				cursor: pointer;
				padding: 0;
				margin: 0;
			}
		}
	}
</style>
