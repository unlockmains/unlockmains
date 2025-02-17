<script lang="ts">
	import { browser } from '$app/environment'
	import type { IStudentProfile, IUser } from '$lib/types'
	let { user, studentProfile }: { user: IUser; studentProfile: IStudentProfile } = $props()
	const planCode = browser && sessionStorage.getItem('plan')
</script>

<div class="billing-information">
	<h1>Billing Information</h1>
	<p>Check your billing information, plan, and payments.</p>
	<div class="separator"></div>
	{#if studentProfile.free_plan}
		<p class="plan-details"><i>You are currently on the free plan.</i></p>
	{/if}
	<h1>Selected Plan {planCode}</h1>
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
	}
</style>
