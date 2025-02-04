<script lang="ts">
	import Button from '../atoms/Button.svelte'
	import { PUBLIC_APPWRITE_EVALUATOR_LEAD_ASSIGNMENT } from '$env/static/public'

	let { prevStep, loadingSubmission } = $props<{
		prevStep: () => void
		loadingSubmission: boolean
	}>()

	let error = $state(false)

	const downloadAssignment1 = async () => {
		const response = await fetch('?/getAssignment1File', {
			method: 'POST',
			body: new FormData()
		})
		console.log('response', response)
		if (response.ok) {
			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'Assignment_1.pdf'
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			a.remove()
		}
	}
</script>

<div class="form-container">
	<div class="form-group">
		<p>Assignment 1</p>
		<Button type="link" label="Download Assignment 1" onClick={() => downloadAssignment1()} />
	</div>
</div>

<div class="form-navigation">
	<Button label="Back" type="back" onClick={() => {}} withLoader={loadingSubmission} />
	<Button label="Next" type="next" onClick={() => {}} withLoader={loadingSubmission} />
</div>

{#if error}
	<div class="errors">
		<p>Please fill out all required fields before you proceed.</p>
	</div>
{/if}

<style lang="scss">
	.form-container {
		display: flex;
		flex-direction: column;
		gap: 1em;

		.form-group {
			display: flex;
			gap: 1em;
			margin-bottom: 15px;
		}
	}
	.form-navigation {
		display: flex;
		gap: 1em;
		margin-top: 1em;
		justify-content: flex-end;
	}

	.errors {
		color: var(--color-red-700);
		font-size: 1.5em;
		margin-top: 1em;
	}
</style>
