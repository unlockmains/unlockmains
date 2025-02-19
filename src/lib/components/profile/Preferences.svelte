<script lang="ts">
	import type { IEvaluatorProfile, IStudentProfile, IUser } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import Combobox from '../atoms/Combobox.svelte'
	import Input from '../atoms/Input.svelte'
	import optionalSubjects from '$lib/api/optionalSubjects.json'
	import { enhance } from '$app/forms'
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit'
	import { toast } from 'svelte-sonner'
	import CheckboxGroup from '../atoms/CheckboxGroup.svelte'
	import RadioGroup from '../atoms/RadioGroup.svelte'

	let loadingSubmission = $state(false)
	let {
		user,
		profile
	}: {
		user: IUser
		profile: IEvaluatorProfile
	} = $props()

	let preferences = $state<{
		generalStudies: string[]
		essay: boolean
		optional: boolean
		optionalSubject: string
		evaluationLanguage: string
		available: boolean
		unavailableReason: string
		gsTotalBandwidth: number
		gsAvailableBandwidth: number
		optionalTotalBandwidth: number
		optionalAvailableBandwidth: number
		essayTotalBandwidth: number
		essayAvailableBandwidth: number
	}>({
		generalStudies: profile.general_studies,
		essay: profile.essay,
		optional: profile.optional,
		optionalSubject: profile.optional_subject,
		evaluationLanguage: profile.evaluation_language,
		available: profile.available,
		unavailableReason: profile.unavailable_reason,
		gsTotalBandwidth: profile.gs_total_bw,
		gsAvailableBandwidth: profile.gs_available_bw,
		optionalTotalBandwidth: profile.optional_total_bw,
		optionalAvailableBandwidth: profile.optional_available_bw,
		essayTotalBandwidth: profile.essay_total_bw,
		essayAvailableBandwidth: profile.essay_available_bw
	})

	let evaluationLanguageOptions = [
		{ text: 'UPSC', value: 'UPSC' },
		{ text: 'BPSC', value: 'BPSC' },
		{ text: 'UPPSC', value: 'UPPSC' },
		{ text: 'Others', value: 'Others' }
	]

	const handleSubmit: SubmitFunction = () => {
		loadingSubmission = true
		// return async ({ update, result }) => {
		// 	const actionResult = result as ActionResult & {
		// 		data: {
		// 			mainInformation: {
		// 				message: string
		// 				optionalSubject: string
		// 				targetYear: string
		// 				preparingFor: string
		// 				otherPreparingFor: string
		// 				rollNumberPre: string
		// 				rollNumberMains: string
		// 			}
		// 		}
		// 	}
		// 	if (actionResult.status === 400) {
		// 		loadingSubmission = false
		// 		toast.error(actionResult.data?.mainInformation.message)
		// 		return
		// 	}
		// 	await update()
		// 	loadingSubmission = false
		// 	toast.success(actionResult.data?.mainInformation.message)
		// 	mainInformation = actionResult.data?.mainInformation
		// }
	}
</script>

<div class="preferences">
	<h1>Preferences</h1>
	<p>Manage you information and preferences.</p>
	<div class="separator"></div>
	<form class="preferences-form" action="?/preferences" method="post" use:enhance={handleSubmit}>
		<input type="hidden" name="userId" value={user?.$id} />
		<input type="hidden" name="evaluatorProfileId" value={profile?.$id} />
		<div class="row">
			<CheckboxGroup
				options={[
					{ value: 'General Studies 1', label: 'General Studies 1' },
					{ value: 'General Studies 2', label: 'General Studies 2' },
					{ value: 'General Studies 3', label: 'General Studies 3' },
					{ value: 'General Studies 4', label: 'General Studies 4' }
				]}
				label="General Studies (Select at least 2)"
				name="generalStudies"
				bind:userSelected={preferences.generalStudies}
				style=""
			/>
		</div>
		<div class="row">
			<div style="width: 50%">
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
					label="Evaluate Optional subject"
					name="optional"
					bind:userSelected={preferences.optional}
					style=""
				/>
			</div>
			<div style="width: 50%">
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
					label="Evaluate Essays"
					name="essay"
					bind:userSelected={preferences.essay}
					style=""
				/>
			</div>
		</div>
		<div class="row">
			<Combobox
				options={optionalSubjects}
				name="optionalSubject"
				bind:value={preferences.optionalSubject}
				showRemainingCount={false}
				disabled={false}
				label="Optional Subject"
				placeholder="Select your optional subject"
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
			<Combobox
				options={[
					{ text: 'English', value: 'English' },
					{ text: 'Hindi', value: 'Hindi' }
				]}
				name="evaluationLanguage"
				bind:value={preferences.evaluationLanguage}
				showRemainingCount={false}
				disabled={false}
				label="Evaluation Language"
				placeholder="Select your evaluation language"
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
		</div>
		<div class="row">
			<div style="width: 100%">
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
					label="Available for Evaluation"
					name="available"
					bind:userSelected={preferences.available}
					style=""
				/>
			</div>
			<Combobox
				options={[
					{ text: 'Sick', value: 'Sick' },
					{ text: 'Vacation', value: 'Vacation' },
					{ text: 'Exams', value: 'Exams' }
				]}
				name="unavailableReason"
				bind:value={preferences.unavailableReason}
				showRemainingCount={false}
				disabled={preferences.available}
				label="Unavailable Reason"
				placeholder="Select your unavailable reason"
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
		</div>
		<div class="row">
			<Input
				id="gsTotalBandwidth"
				name="gsTotalBandwidth"
				placeholder="GS Total Bandwidth"
				type="number"
				label="GS Total Bandwidth"
				bind:value={preferences.gsTotalBandwidth}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);--gap: 0.5em;"
			/>
			<Input
				id="gsAvailableBandwidth"
				name="gsAvailableBandwidth"
				placeholder="GS Available Bandwidth"
				type="number"
				label="GS Available Bandwidth"
				bind:value={preferences.gsAvailableBandwidth}
				disabled
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);--gap: 0.5em;"
			/>
		</div>
		<div class="row">
			<Input
				id="optionalTotalBandwidth"
				name="optionalTotalBandwidth"
				placeholder="Optional Total Bandwidth"
				type="number"
				label="Optional Total Bandwidth"
				bind:value={preferences.optionalTotalBandwidth}
				disabled={!preferences.optional}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);--gap: 0.5em;"
			/>
			<Input
				id="optionalAvailableBandwidth"
				name="optionalAvailableBandwidth"
				placeholder="Optional Available Bandwidth"
				type="number"
				label="Optional Available Bandwidth"
				bind:value={preferences.optionalAvailableBandwidth}
				disabled
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);--gap: 0.5em;"
			/>
		</div>
		<div class="row">
			<Input
				id="essayTotalBandwidth"
				name="essayTotalBandwidth"
				placeholder="Essay Total Bandwidth"
				type="number"
				label="Essay Total Bandwidth"
				bind:value={preferences.essayTotalBandwidth}
				disabled={!preferences.essay}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);--gap: 0.5em;"
			/>
			<Input
				id="essayAvailableBandwidth"
				name="essayAvailableBandwidth"
				placeholder="Essay Available Bandwidth"
				type="number"
				label="Essay Available Bandwidth"
				bind:value={preferences.essayAvailableBandwidth}
				disabled
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
	.preferences {
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
		.preferences-form {
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
