<script lang="ts">
	import type { IEvaluatorOnBoardData } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import Combobox from '../atoms/Combobox.svelte'
	import Input from '../atoms/Input.svelte'
	import RadioGroup from '../atoms/RadioGroup.svelte'

	let { formData = $bindable(), nextStep } = $props<{
		formData: IEvaluatorOnBoardData
		nextStep: () => void
	}>()

	let error = $state(false)

	function validate() {
		if (
			!formData.name ||
			!formData.phoneNumber ||
			!formData.prelimsAttempts ||
			!formData.mainsAttempts ||
			!formData.interviewsAppeared ||
			!formData.optionalSubject
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
		<Input
			label="Name"
			bind:value={formData.name}
			name="name"
			id="name"
			placeholder="Enter your name"
			type="text"
		/>

		<Input
			label="Phone Number"
			bind:value={formData.phoneNumber}
			name="phoneNumber"
			id="phoneNumber"
			placeholder="Enter your phone number"
			type="number"
			max={10}
		/>
	</div>

	<div class="form-group">
		<Input
			label="Number of Prelims Attempted"
			bind:value={formData.prelimsAttempts}
			name="prelimsAttempts"
			id="prelimsAttempts"
			placeholder="Enter the count of prelims attempted"
			type="number"
			max={10}
		/>

		<Input
			label="Number of Mains Attempted"
			bind:value={formData.mainsAttempts}
			name="mainsAttempts"
			id="mainsAttempts"
			placeholder="Enter the count of mains attempted"
			type="number"
			max={10}
		/>
	</div>

	<div class="form-group">
		<Input
			label="Number of Interviews Appeared"
			bind:value={formData.interviewsAppeared}
			name="interviewsAppeared"
			id="interviewsAppeared"
			placeholder="Enter the count of interviews appeared"
			type="number"
			max={10}
		/>

		<Combobox
			options={[
				{ text: 'Agriculture', value: 'Agriculture' },
				{
					text: 'Animal Husbandry and Veterinary Science',
					value: 'Animal Husbandry and Veterinary Science'
				},
				{ text: 'Anthropology', value: 'Anthropology' },
				{ text: 'Botany', value: 'Botany' },
				{ text: 'Chemistry', value: 'Chemistry' },
				{ text: 'Civil Engineering', value: 'Civil Engineering' },
				{ text: 'Commerce and Accountancy', value: 'Commerce and Accountancy' },
				{ text: 'Economics', value: 'Economics' },
				{ text: 'Electrical Engineering', value: 'Electrical Engineering' },
				{ text: 'Geography', value: 'Geography' },
				{ text: 'Geology', value: 'Geology' },
				{ text: 'History', value: 'History' },
				{ text: 'Law', value: 'Law' },
				{ text: 'Management', value: 'Management' },
				{ text: 'Mathematics', value: 'Mathematics' },
				{ text: 'Mechanical Engineering', value: 'Mechanical Engineering' },
				{ text: 'Medical Science', value: 'Medical Science' },
				{ text: 'Philosophy', value: 'Philosophy' },
				{ text: 'Physics', value: 'Physics' },
				{
					text: 'Political Science and International Relations',
					value: 'Political Science and International Relations'
				},
				{ text: 'Psychology', value: 'Psychology' },
				{ text: 'Public Administration', value: 'Public Administration' },
				{ text: 'Sociology', value: 'Sociology' },
				{ text: 'Statistics', value: 'Statistics' },
				{ text: 'Zoology', value: 'Zoology' },
				{ text: 'Hindi Literature', value: 'Hindi Literature' },
				{ text: 'English Literature', value: 'English Literature' },
				{ text: 'Urdu Literature', value: 'Urdu Literature' },
				{ text: 'Bengali Literature', value: 'Bengali Literature' },
				{ text: 'Maithili Literature', value: 'Maithili Literature' },
				{ text: 'Tamil Literature', value: 'Tamil Literature' },
				{ text: 'Telugu Literature', value: 'Telugu Literature' },
				{ text: 'Sanskrit Literature', value: 'Sanskrit Literature' },
				{ text: 'Kannada Literature', value: 'Kannada Literature' },
				{ text: 'Malayalam Literature', value: 'Malayalam Literature' },
				{ text: 'Marathi Literature', value: 'Marathi Literature' },
				{ text: 'Gujarati Literature', value: 'Gujarati Literature' }
			]}
			name="optionalSubject"
			bind:value={formData.optionalSubject}
			showRemainingCount={false}
			style="--list-gap: 0"
			disabled={false}
			label="Optional Subject"
			placeholder="Select your optional subject"
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
			label="Have you secured a rank in UPSC CSE or State PCS?"
			name="hasRank"
			bind:userSelected={formData.hasRank}
			style="--label-size: 1em;"
		/>
	</div>
</div>

<div class="form-navigation">
	<Button label="Next" type="next" onClick={() => nextStep()} />
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
