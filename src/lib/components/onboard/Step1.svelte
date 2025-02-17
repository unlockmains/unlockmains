<script lang="ts">
	import type { IEvaluatorOnBoardStep1Data } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import Combobox from '../atoms/Combobox.svelte'
	import Input from '../atoms/Input.svelte'
	import RadioGroup from '../atoms/RadioGroup.svelte'
	import optionalSubjects from '$lib/api/optionalSubjects.json'

	let { formData = $bindable(), loadingSubmission } = $props<{
		formData: IEvaluatorOnBoardStep1Data
		loadingSubmission: boolean
	}>()

	let error = $state(false)

	function validate() {
		if (
			!formData.name ||
			!formData.phoneNumber ||
			!formData.prelimsAttempts ||
			!formData.mainsAttempts ||
			!formData.interviewsAppeared ||
			!formData.optionalSubject ||
			(formData.existingUser === 'Yes' && !formData.existingUserEmail) ||
			!formData.marksheet
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
			label="Name (*)"
			bind:value={formData.name}
			name="name"
			id="name"
			placeholder="Enter your name"
			type="text"
		/>

		<Input
			label="Phone Number (*)"
			bind:value={formData.phoneNumber}
			name="phoneNumber"
			id="phoneNumber"
			placeholder="Enter your phone number"
			type="number"
		/>
	</div>

	<div class="form-group">
		<Input
			label="Number of Prelims Attempted (*)"
			bind:value={formData.prelimsAttempts}
			name="prelimsAttempts"
			id="prelimsAttempts"
			placeholder="Enter 0 if not attempted"
			type="number"
		/>

		<Input
			label="Number of Mains Attempted (*)"
			bind:value={formData.mainsAttempts}
			name="mainsAttempts"
			id="mainsAttempts"
			placeholder="Enter 0 if not attempted"
			type="number"
		/>
	</div>

	<div class="form-group">
		<Input
			label="Number of Interviews Appeared (*)"
			bind:value={formData.interviewsAppeared}
			name="interviewsAppeared"
			id="interviewsAppeared"
			placeholder="Enter 0 if not appeared"
			type="number"
		/>

		<Combobox
			options={optionalSubjects}
			name="optionalSubject"
			bind:value={formData.optionalSubject}
			showRemainingCount={false}
			style="--list-gap: 0"
			disabled={false}
			label="Optional Subject (*)"
			placeholder="Select your optional subject"
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
			label="Enter Your Existing Student Email"
			bind:value={formData.existingUserEmail}
			name="existingUserEmail"
			id="existingUserEmail"
			placeholder="Enter your existing student email"
			type="email"
			disabled={formData.existingUser !== 'Yes'}
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
			label="Have you secured a rank in UPSC CSE or State PCS? (*)"
			name="hasRank"
			bind:userSelected={formData.hasRank}
			style="--label-size: 1em;"
		/>
	</div>
	<div class="form-group">
		<Input
			type="file"
			name="marksheet"
			bind:value={formData.marksheet}
			label="Upload your latest Marksheet"
			id="marksheet"
			placeholder="Upload your latest marksheet"
		/>
	</div>
</div>

<div class="form-navigation">
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
