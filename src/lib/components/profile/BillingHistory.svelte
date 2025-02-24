<script lang="ts">
	import type { IPaymentHistory, IStudentProfile, IUser } from '$lib/types'
	import Grid from '../atoms/Grid.svelte'
	import Modal from '../atoms/Modal.svelte'

	let {
		studentProfile,
		paymentHistory
	}: { user: IUser; studentProfile: IStudentProfile; paymentHistory: IPaymentHistory[] } = $props()

	let dataToDisplay = $state(
		paymentHistory.map((payment) => ({
			...payment,
			timestamp: new Date(payment.timestamp).toLocaleDateString(),
			planCode: studentProfile?.pricing_structure?.plan_code,
			amount:
				payment.currency === 'INR' ? '₹' + payment.amount : payment.currency + ' ' + payment.amount
		}))
	)

	let modalData: any = $state(null)
	let showModal: boolean = $state(false)

	const getDetail = async (paymentId: string) => {
		const response = await fetch(`/api/payment/details?payment_id=${paymentId}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			modalData = (await response.json()).payment
			showModal = true
		}

		if (!response.ok) {
			const errorData = await response.json()
			console.log(errorData)
		}
	}

	let columns = $state([
		{
			key: 'timestamp',
			title: 'Date'
		},
		{
			key: 'amount',
			title: 'Amount'
		},
		{
			key: 'status',
			title: 'Status'
		},
		{
			key: 'payment_id',
			title: 'Payment ID',
			type: 'link',
			onClick: getDetail
		},
		{
			key: 'order_id',
			title: 'Order ID'
		},
		{
			key: 'planCode',
			title: 'Plan Name'
		}
	])
</script>

<div class="billing-information">
	<h1>Billing Information</h1>
	<p>Check your billing history, view invoices.</p>
	<div class="separator"></div>
	{#if studentProfile.free_plan}
		<p class="plan-details"><i>You are currently on the free plan.</i></p>
	{/if}
	<Grid bind:data={dataToDisplay} bind:columns />
	<Modal {showModal}>
		{#if modalData}
			<h1>Payment Details</h1>
			<p>Email: {modalData.email}</p>
			<p>Contact: {modalData.contact}</p>
			<p>Order Id: {modalData.order_id}</p>
			<p>
				Amount:
				{modalData.currency === 'INR'
					? '₹' + modalData.amount / 100
					: modalData.currency + ' ' + modalData.amount / 100}
			</p>
			<p>Payment Method: {modalData.method}</p>
			{#if modalData.vpa}
				<p>VPA: {modalData.vpa}</p>
			{/if}
		{/if}
	</Modal>
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

		@media (max-width: 768px) {
			h1 {
				font-size: 1.5em;
			}
			p {
				font-size: 0.8em;
			}
		}
	}
</style>
