<script lang="ts">
	import Button from '../atoms/Button.svelte'

	let { loadingSubmission = $bindable() } = $props<{
		loadingSubmission: boolean
	}>()
</script>

<h1>Cheers 🎉 on completing the Onboarding Process</h1>
<p>
	You have been selected as one of our esteemed evaluators. We are thrilled to have you on board and
	we are confident that you will excel in your role as an evaluator. We are excited to have you join
	us and look forward to your contributions.
</p>

<h4>What's next?</h4>
<p>Click on the below button to create your account and start your journey with UnlockMains.</p>
<p>Note: this step might take a few minutes to complete.</p>

<div class="form-navigation">
	<Button
		label="Proceed to UnlockMains"
		type="next"
		onClick={() => {}}
		withLoader={loadingSubmission}
		disabled={loadingSubmission}
		style="--btn-width: 20em"
	/>
</div>

<style lang="scss">
	.form-navigation {
		display: flex;
		gap: 1em;
		margin-top: 1em;
		justify-content: flex-end;
	}
</style>
