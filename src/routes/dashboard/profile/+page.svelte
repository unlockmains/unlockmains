<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { browser } from '$app/environment'
	import UserAvatarIcon from '$lib/components/icons/UserAvatarIcon.svelte'
	import BasicInformation from '$lib/components/profile/BasicInformation.svelte'
	import BillingAndPayments from '$lib/components/profile/Payment.svelte'
	import MainsInformation from '$lib/components/profile/MainsInformation.svelte'
	import type { IPricingStructure, IStudentProfile, IUser } from '$lib/types'
	import Payment from '$lib/components/profile/Payment.svelte'
	import BillingHistory from '$lib/components/profile/BillingHistory.svelte'

	let { data } = $props<{
		data: { user: IUser; studentProfile: IStudentProfile; allPlans: IPricingStructure[] }
	}>()

	let activeLink = $state<'basic-information' | 'upsc-mains-exam' | 'billing-history' | 'payment'>(
		'basic-information'
	)

	$effect(() => {
		const plan = browser && sessionStorage.getItem('plan')
		if (plan) {
			activeLink = 'payment'
		}
	})
</script>

<div class="profile">
	<div class="flex row items-center justify-center">
		<div class="left-nav">
			<div class="avatar-name">
				<UserAvatarIcon color="#707070" width="8em" height="8em" />
				<h3>{data.user.name}</h3>
				<p>{data.user.email}</p>
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
				<div>
					<button
						onclick={() => (activeLink = 'upsc-mains-exam')}
						class:active={activeLink === 'upsc-mains-exam'}
					>
						Mains Information</button
					>
				</div>
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
				<BasicInformation user={data.user} />
			{:else if activeLink === 'upsc-mains-exam'}
				<MainsInformation user={data.user} studentProfile={data.studentProfile} />
			{:else if activeLink === 'billing-history'}
				<BillingHistory
					user={data.user}
					studentProfile={data.studentProfile}
					paymentHistory={data.paymentHistory}
				/>
			{:else if activeLink === 'payment'}
				<Payment user={data.user} studentProfile={data.studentProfile} allPlans={data.allPlans} />
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.profile {
		--header-height: 8em;
		width: 100%;
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
			}
		}

		.right-data {
			width: 80%;
			height: calc(100vh - var(--header-height));
		}
	}
</style>
