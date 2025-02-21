<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { browser } from '$app/environment'
	import UserAvatarIcon from '$lib/components/icons/UserAvatarIcon.svelte'
	import BasicInformation from '$lib/components/profile/BasicInformation.svelte'
	import MainsInformation from '$lib/components/profile/MainsInformation.svelte'
	import type { IPricingStructure, IStudentProfile, IUser } from '$lib/types'
	import Payment from '$lib/components/profile/Payment.svelte'
	import BillingHistory from '$lib/components/profile/BillingHistory.svelte'
	import Preferences from '$lib/components/profile/Preferences.svelte'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import { PUBLIC_AVATAR_API } from '$env/static/public'

	let { data } = $props<{
		data: { studentProfile: IStudentProfile; allPlans: IPricingStructure[] }
	}>()

	let activeLink = $state<
		'basic-information' | 'upsc-mains-exam' | 'billing-history' | 'payment' | 'preferences'
	>('basic-information')

	$effect(() => {
		const plan = browser && sessionStorage.getItem('plan')
		if (plan) {
			activeLink = 'payment'
		}
	})

	const userStore = getContext<Writable<IUser>>('userStore')
	let userAvatar = $state(false)
</script>

<div class="profile">
	<div class="left-nav">
		<div class="avatar-name">
			<button class="user-avatar" onclick={() => (userAvatar = true)}>
				{#if userAvatar}
					<img
						src={`${PUBLIC_AVATAR_API}${$userStore?.name}`}
						alt="avatar"
						width="8em"
						height="8em"
					/>
				{:else}
					<UserAvatarIcon color="#707070" width="8em" height="8em" />
				{/if}
			</button>
			<h3>{$userStore?.name}</h3>
			<p>{$userStore?.email}</p>
		</div>
		<nav>
			<div>
				<button
					onclick={() => (activeLink = 'basic-information')}
					class:active={activeLink === 'basic-information'}
				>
					Basic Information
				</button>
			</div>
			{#if $userStore?.profile.user_type === 'STUDENT'}
				<div>
					<button
						onclick={() => (activeLink = 'upsc-mains-exam')}
						class:active={activeLink === 'upsc-mains-exam'}
					>
						Mains Information</button
					>
				</div>
			{:else}
				<div>
					<button
						onclick={() => (activeLink = 'preferences')}
						class:active={activeLink === 'preferences'}
					>
						Preferences</button
					>
				</div>
			{/if}
			<div>
				<button
					onclick={() => (activeLink = 'billing-history')}
					class:active={activeLink === 'billing-history'}>Billings History</button
				>
			</div>
			<div>
				<button onclick={() => (activeLink = 'payment')} class:active={activeLink === 'payment'}
					>Payment</button
				>
			</div>
		</nav>
	</div>
	<div class="right-data">
		{#if activeLink === 'basic-information'}
			<BasicInformation user={$userStore} />
		{:else if activeLink === 'upsc-mains-exam'}
			<MainsInformation user={$userStore} profile={data.profile} />
		{:else if activeLink === 'preferences'}
			<Preferences user={$userStore} profile={data.profile} />
		{:else if activeLink === 'billing-history'}
			<BillingHistory
				user={$userStore}
				studentProfile={data.profile}
				paymentHistory={data.paymentHistory}
			/>
		{:else if activeLink === 'payment'}
			<Payment user={$userStore} studentProfile={data.profile} allPlans={data.allPlans} />
		{/if}
	</div>
</div>

<style lang="scss">
	.profile {
		--header-height: 8em;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		@media (max-width: 768px) {
			flex-direction: column;
		}
		.left-nav {
			width: 20%;
			height: calc(100vh - var(--header-height));
			background: url('/lib/grid-profile.svg') no-repeat center center;
			background-size: cover;
			padding: 1em;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-shadow: 0 0 4px 4px var(--color-white-900);

			.avatar-name {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 0.5em;

				h3 {
					font-size: 1.5em;
					font-weight: bold;
					margin: 0;
					color: var(--color-zinc-800);
				}

				p {
					font-size: 1em;
					font-weight: normal;
					margin: 0;
					color: var(--color-zinc-500);
				}

				.user-avatar {
					outline: none;
					border: none;
					background-color: transparent;
					cursor: pointer;
					transition: all 0.3s ease;
					height: 8em;
					width: 8em;

					img {
						height: 100%;
						width: 100%;
					}
				}
			}

			nav {
				display: flex;
				flex-direction: column;
				gap: 1em;
				margin-top: 5em;
				align-items: flex-start;

				button {
					width: 100%;
					padding: 0.5em;
					border: none;
					border-radius: var(--custom-border-radius);
					background-color: transparent;
					color: var(--color-zinc-800);
					font-size: 1.25em;
					font-weight: 500;
					transition: all 0.3s ease;
					cursor: pointer;

					&:hover,
					&.active {
						background-color: transparent;
						color: var(--custom-color-brand);
					}
				}

				@media (max-width: 768px) {
					margin-top: 2em;
					flex-direction: row;

					button {
						font-size: 0.8em;
					}
				}
			}
			@media (max-width: 768px) {
				width: 100%;
				height: 20%;

				.avatar-name {
					flex-direction: row;
					h3 {
						font-size: 1em;
					}
					p {
						font-size: 0.8em;
					}
					:global(svg) {
						width: 3em;
						height: 3em;
					}
				}
			}
		}

		.right-data {
			width: 80%;
			height: calc(100vh - var(--header-height));

			@media (max-width: 768px) {
				width: 100%;
			}
		}
	}
</style>
