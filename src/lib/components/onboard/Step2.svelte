<script lang="ts">
	import type { IEvaluatorOnBoardStep2Data } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import CheckboxGroup from '../atoms/CheckboxGroup.svelte'
	import Combobox from '../atoms/Combobox.svelte'
	import Input from '../atoms/Input.svelte'
	import RadioGroup from '../atoms/RadioGroup.svelte'

	let {
		formData = $bindable(),
		prevStep,
		loadingSubmission
	} = $props<{
		formData: IEvaluatorOnBoardStep2Data
		prevStep: (event: Event) => void
		loadingSubmission: boolean
	}>()

	let error = $state(false)

	function validate() {
		if (
			!formData.evaluationLanguage ||
			!formData.experience ||
			formData.evaluateGeneralStudies.length < 2
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
			placeholder="Select your preferred language for evaluation"
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
		<CheckboxGroup
			options={[
				{ value: 'General Studies 1', label: 'General Studies 1' },
				{ value: 'General Studies 2', label: 'General Studies 2' },
				{ value: 'General Studies 3', label: 'General Studies 3' },
				{ value: 'General Studies 4', label: 'General Studies 4' }
			]}
			label="General Studies Preference (Select at least 2)"
			name="evaluateGeneralStudies"
			bind:userSelected={formData.evaluateGeneralStudies}
			style="--label-size: 1rem"
		/>
	</div>
	<div class="form-group">
		<RadioGroup
			options={[
				{
					value: true,
					label: 'Yes'
				},
				{
					value: false,
					label: 'No'
				}
			]}
			label="Want to evaluate Essays? (minimum limit of 2 essays will be set if you select yes)"
			name="evaluateEssay"
			bind:userSelected={formData.evaluateEssay}
			style="--label-size: 1em;"
		/>
	</div>
	<div class="form-group">
		<RadioGroup
			options={[
				{
					value: true,
					label: 'Yes'
				},
				{
					value: false,
					label: 'No'
				}
			]}
			label="Want to evaluate Optional subject? (minimum limit of 2 optionals will be set if you select yes)"
			name="evaluateOptional"
			bind:userSelected={formData.evaluateOptional}
			style="--label-size: 1em;"
		/>
	</div>
</div>

<div class="form-navigation">
	<Button label="Back" type="back" onClick={prevStep} withLoader={loadingSubmission} />
	<Button label="Next" type="next" onClick={() => validate()} withLoader={loadingSubmission} />
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
