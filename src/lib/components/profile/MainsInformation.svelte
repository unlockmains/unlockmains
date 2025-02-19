<script lang="ts">
	import type { IStudentProfile, IUser } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import Combobox from '../atoms/Combobox.svelte'
	import Input from '../atoms/Input.svelte'
	import optionalSubjects from '$lib/api/optionalSubjects.json'
	import { enhance } from '$app/forms'
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit'
	import { toast } from 'svelte-sonner'

	let loadingSubmission = $state(false)
	let {
		user,
		profile
	}: {
		user: IUser
		profile: IStudentProfile
	} = $props()

	let mainInformation = $state<{
		optionalSubject: string
		targetYear: string
		preparingFor: string
		otherPreparingFor: string
		rollNumberPre: string
		rollNumberMains: string
	}>({
		optionalSubject: profile.optional_subject,
		targetYear: profile.target_year,
		preparingFor: profile.preparing_for,
		otherPreparingFor: profile.other_preparing_for,
		rollNumberPre: profile.roll_number_pre,
		rollNumberMains: profile.roll_number_mains
	})

	let targetYearOptions = [
		{ text: '2025', value: '2025' },
		{ text: '2026', value: '2026' },
		{ text: '2027', value: '2027' },
		{ text: '2028', value: '2028' },
		{ text: '2029', value: '2029' }
	]

	let preparingForOptions = [
		{ text: 'UPSC', value: 'UPSC' },
		{ text: 'BPSC', value: 'BPSC' },
		{ text: 'UPPSC', value: 'UPPSC' },
		{ text: 'Others', value: 'Others' }
	]

	const handleSubmit: SubmitFunction = () => {
		loadingSubmission = true
		return async ({ update, result }) => {
			const actionResult = result as ActionResult & {
				data: {
					mainInformation: {
						message: string
						optionalSubject: string
						targetYear: string
						preparingFor: string
						otherPreparingFor: string
						rollNumberPre: string
						rollNumberMains: string
					}
				}
			}
			if (actionResult.status === 400) {
				loadingSubmission = false
				toast.error(actionResult.data?.mainInformation.message)
				return
			}
			await update()
			loadingSubmission = false
			toast.success(actionResult.data?.mainInformation.message)
			mainInformation = actionResult.data?.mainInformation
		}
	}
</script>

<div class="mains-information">
	<h1>Mains Information</h1>
	<p>Manage you examination information, subjects, exams, roll number.</p>
	<div class="separator"></div>
	<form
		class="mains-information-form"
		action="?/mainInformation"
		method="post"
		use:enhance={handleSubmit}
	>
		<input type="hidden" name="userId" value={user?.$id} />
		<input type="hidden" name="studentProfileId" value={profile?.$id} />
		<div class="row">
			<Combobox
				options={optionalSubjects}
				name="optionalSubject"
				bind:value={mainInformation.optionalSubject}
				showRemainingCount={false}
				disabled={false}
				label="Optional Subject"
				placeholder="Select your optional subject"
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
			<Combobox
				options={targetYearOptions}
				name="targetYear"
				placeholder="Target Year"
				bind:value={mainInformation.targetYear}
				showRemainingCount={false}
				disabled={false}
				label="Target Year"
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
		</div>
		<div class="row">
			<Combobox
				options={preparingForOptions}
				name="preparingFor"
				bind:value={mainInformation.preparingFor}
				showRemainingCount={false}
				disabled={false}
				label="Preparing For"
				placeholder="Select your preparation exam"
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
			<Input
				id="otherPreparingFor"
				name="otherPreparingFor"
				placeholder="Other Preparing For"
				type="text"
				label="Other Preparing For"
				bind:value={mainInformation.otherPreparingFor}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);--gap: 0.5em;"
				disabled={mainInformation.preparingFor !== 'Others'}
			/>
		</div>
		<div class="row">
			<Input
				id="rollNumberPre"
				name="rollNumberPre"
				placeholder="Roll Number Pre"
				type="number"
				label="Roll Number Pre"
				bind:value={mainInformation.rollNumberPre}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);--gap: 0.5em;"
			/>
			<Input
				id="rollNumberMains"
				name="rollNumberMains"
				placeholder="Roll Number Mains"
				type="number"
				label="Roll Number Mains"
				bind:value={mainInformation.rollNumberMains}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);--gap: 0.5em;"
			/>
		</div>
		<div class="row end">
			<Button
				type="submit"
				label="Update"
				withLoader={loadingSubmission}
				disabled={loadingSubmission}
			/>
		</div>
	</form>
</div>

<style lang="scss">
	.mains-information {
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
		.mains-information-form {
			display: flex;
			flex-direction: column;
			gap: 1em;

			.row {
				display: flex;
				flex-direction: row;
				gap: 1em;

				&.end {
					justify-content: flex-end;
				}
			}
		}
	}
</style>
