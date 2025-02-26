<script lang="ts">
	import { browser } from '$app/environment'
	import type {
		IPricingStructure,
		IStudentProfile,
		IUser,
		RazorpayOptions,
		RazorpayResponse
	} from '$lib/types'
	import mockPlansData from '$lib/api/mockPlansData.json'
	import { PUBLIC_RAZORPAY_ID } from '$env/static/public'
	import Razorpay from '$lib/razorpay'
	import { writable } from 'svelte/store'

	let {
		user,
		studentProfile,
		allPlans
	}: { user: IUser; studentProfile: IStudentProfile; allPlans: IPricingStructure[] } = $props()

	const paymentStore = writable<any>(null)
	paymentStore.set({
		planCode: studentProfile?.pricing_structure?.plan_code
	})

	let loading = $state(false)

	let planSelected = $state(browser && sessionStorage.getItem('plan'))

	const getPlanDetails = (planCodeSelected: string) => {
		return allPlans.find((plan) => plan.plan_code === planCodeSelected)
	}

	const getPlanFeatures = (planCodeSelected: string) => {
		const planDetails = getPlanDetails(planCodeSelected)
		const planFeatures = mockPlansData
			.find((plan) => plan.sectionName === planDetails?.category)
			?.pricings.find((pricing) => pricing.planCode === planCodeSelected)
		return (planFeatures ?? []) as {
			name: string
			features: string[]
			originalPrice: number
			currentPrice: number
			duration: string
			color: string
			planCode: string
		}
	}

	const handleRazorpayResponse = async (
		response: RazorpayResponse,
		order: { amount: number; currency: string },
		planDetails?: IPricingStructure
	) => {
		const storeResponse = await fetch('/api/payment/payment-verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...response,
				amount: order.amount / 100,
				currency: order.currency,
				name: user?.name,
				email: user?.email,
				studentProfileId: studentProfile.$id,
				planDetails
			})
		})

		const result = await storeResponse.json()

		if (result.success) {
			browser && sessionStorage.removeItem('plan')
			paymentStore.set({ planCode: planDetails?.plan_code })
			planSelected = null
			alert('Payment successful! Your transaction is saved.')
		} else {
			alert('Payment completed, but there was an issue saving the data.')
		}
	}

	async function handlePayment() {
		try {
			loading = true
			const planFeatures = getPlanFeatures(planSelected as string)
			const planDetails = getPlanDetails(planSelected as string)
			const response = await fetch('/api/payment/create-order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					amount: planFeatures?.currentPrice,
					currency: 'INR'
				})
			})

			const { order } = await response.json()

			const options: RazorpayOptions = {
				key: PUBLIC_RAZORPAY_ID,
				amount: order.amount,
				currency: order.currency,
				name: 'Unlock Mains',
				description: 'One stop solution for cracking your Mains exams.',
				order_id: order.id,
				image: 'https://www.unlockmains.com/um-main.png',
				handler: (response: RazorpayResponse) =>
					handleRazorpayResponse(response, order, planDetails),
				prefill: {
					name: user?.name,
					email: user?.email,
					contact: user?.phone
				},
				theme: {
					color: '#a81c2f'
				}
			}

			const rzp = new Razorpay(options)
			rzp.open()
		} catch (error) {
			console.log('Payment error:', error)
		} finally {
			loading = false
			planSelected = null
		}
	}
	const currentYear = new Date().getFullYear()
	const nextYear = currentYear + 1
</script>

<div class="billing-information">
	<h1>Payment Information</h1>
	<p>Check your plan and payments.</p>
	<div class="separator"></div>
	{#if studentProfile.free_plan}
		<p class="plan-details"><i>You are currently on the free plan.</i></p>
	{/if}
	{#if $paymentStore.planCode}
		<p class="plan-details"><i>You have an active plan.</i></p>
		<h4>Selected Plan {$paymentStore.planCode}</h4>
		<p>This plan comes with following features:</p>
		<ul>
			{#each getPlanFeatures($paymentStore.planCode).features as feature}
				<li>
					{feature
						.replace('{year}', currentYear.toString())
						.replace('{year+1}', nextYear.toString())}
				</li>
			{/each}
		</ul>
	{/if}
	{#if planSelected}
		<h1>Selected Plan {planSelected}</h1>
		<p>
			Duration: {getPlanDetails(planSelected)?.duration === '{Year}'
				? currentYear
				: getPlanDetails(planSelected)?.duration === '{Year+1}'
					? nextYear
					: getPlanDetails(planSelected)?.duration}
		</p>
		<p>Category: <b>{getPlanDetails(planSelected)?.category}</b></p>
		<p>
			GS Allowed: {getPlanDetails(planSelected)?.gs_allowed === -1
				? 'Unlimited'
				: getPlanDetails(planSelected)?.gs_allowed}
		</p>
		<p>
			Optional Allowed: {getPlanDetails(planSelected)?.optional_allowed === -1
				? 'Unlimited'
				: getPlanDetails(planSelected)?.optional_allowed}
		</p>
		<p>
			Essay Allowed: {getPlanDetails(planSelected)?.essay_allowed === -1
				? 'Unlimited'
				: getPlanDetails(planSelected)?.essay_allowed}
		</p>
		<p>Price: ₹ {getPlanFeatures(planSelected)?.currentPrice}</p>
		<div>
			<button
				onclick={() => {
					sessionStorage.removeItem('plan')
					planSelected = null
				}}
				class="payment-button"
			>
				Cancel Payment
			</button>
			<button disabled={loading} onclick={handlePayment} class="payment-button">
				{loading ? 'Processing...' : 'Pay Now'}
			</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.billing-information {
		padding: 1em;
		margin: 1em;
		h1 {
			font-size: 2em;
			font-weight: bold;
			margin: 0.3em 0;
		}
		.separator {
			height: 1px;
			margin-top: 1em;
			margin-bottom: 1em;
			background-color: var(--color-zinc-400);
		}

		.payment-button {
			padding: 1rem 2rem;
			background-color: var(--custom-color-brand);
			color: white;
			border: none;
			border-radius: 0.5em;
			cursor: pointer;
			font-size: 1.1rem;

			&:disabled {
				opacity: 0.7;
				cursor: not-allowed;
			}
		}
		@media (max-width: 768px) {
			h1 {
				font-size: 1.5em;
			}
			p {
				font-size: 0.8em;
			}
			.payment-button {
				font-size: 0.8rem;
			}
		}
	}
</style>
