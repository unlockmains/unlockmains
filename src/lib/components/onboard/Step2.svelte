<script lang="ts">
	import type { IEvaluatorOnBoardData } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import Combobox from '../atoms/Combobox.svelte'
	import Input from '../atoms/Input.svelte'

	let {
		formData = $bindable(),
		nextStep,
		prevStep
	} = $props<{
		formData: IEvaluatorOnBoardData
		nextStep: () => void
		prevStep: () => void
	}>()

	let error = $state(false)

	function validate() {
		if (
			!formData.evaluationLanguage ||
			!formData.experience ||
			(formData.existingUser === 'Yes' && !formData.existingUserEmail)
		) {
			error = true
			return false
		}
		error = false
		return true
	}
</script>

<div class="form-container">
	<div class="form-group">
		<Combobox
			options={[
				{ text: 'English', value: 'English' },
				{ text: 'Hindi', value: 'Hindi' }
			]}
			name="evaluationLanguage"
			bind:value={formData.evaluationLanguage}
			showRemainingCount={false}
			style="--list-gap: 0"
			disabled={false}
			label="Evaluation Language"
			placeholder="Select your prefered language for evaluation"
		/>
	</div>

	<div class="form-group">
		<Input
			label="Experience"
			bind:value={formData.experience}
			name="experience"
			id="experience"
			placeholder="Enter your experience"
			type="textarea"
			rows={10}
			cols={50}
		/>
	</div>

	<div class="form-group">
		<Combobox
			options={[
				{ text: 'Yes', value: 'Yes' },
				{ text: 'No', value: 'No' }
			]}
			name="existingUser"
			bind:value={formData.existingUser}
			showRemainingCount={false}
			style="--list-gap: 0"
			disabled={false}
			label="Are you an Existing Student on UnlockMains?"
			placeholder="Yes/No"
		/>

		<Input
			label="Existing Your Existing Student Email"
			bind:value={formData.existingUserEmail}
			name="existingUserEmail"
			id="existingUserEmail"
			placeholder="Enter your existing student email"
			type="email"
			disabled={formData.existingUser !== 'Yes'}
		/>
	</div>
</div>

<div class="form-navigation">
	<Button label="Back" type="back" onClick={() => validate() && prevStep()} />
	<Button label="Next" type="next" onClick={() => validate() && nextStep()} />
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
