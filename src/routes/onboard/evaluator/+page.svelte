<script lang="ts">
	import { enhance } from '$app/forms'
	import Background from '$lib/components/atoms/Background.svelte'
	import Step1 from '$lib/components/onboard/Step1.svelte'
	import Step2 from '$lib/components/onboard/Step2.svelte'
	import Step3 from '$lib/components/onboard/Step3.svelte'
	import Step4 from '$lib/components/onboard/Step4.svelte'
	import Step5 from '$lib/components/onboard/Step5.svelte'
	import Timeline from '$lib/components/onboard/Timeline.svelte'
	import type { IEvaluatorOnBoardStep1Data, IEvaluatorOnBoardStep2Data } from '$lib/types'
	import type { SubmitFunction } from '@sveltejs/kit'
	import type { Models, Storage } from 'node-appwrite'

	const { data } = $props<{
		data: {
			userName: string
			evaluatorLead: Models.Document
		}
	}>()

	let formDataStep1: IEvaluatorOnBoardStep1Data = $state({
		name: data.userName,
		phoneNumber: data.evaluatorLead?.phone_number ?? '',
		prelimsAttempts: data.evaluatorLead?.prelims_attempts ?? undefined,
		mainsAttempts: data.evaluatorLead?.mains_attempts ?? undefined,
		interviewsAppeared: data.evaluatorLead?.interviews_appeared ?? undefined,
		optionalSubject: data.evaluatorLead?.optional_subject ?? '',
		existingUser: data.evaluatorLead?.existing_user ?? 'No',
		existingUserEmail: data.evaluatorLead?.existing_user_email ?? '',
		hasRank: data.evaluatorLead?.has_rank ?? false,
		marksheet: data.evaluatorLead?.marksheet_id ?? null
	})

	let formDataStep2: IEvaluatorOnBoardStep2Data = $state({
		evaluationLanguage: data.evaluatorLead?.evaluation_language ?? '',
		experience: data.evaluatorLead?.experience ?? '',
		evaluateGeneralStudies: data.evaluatorLead?.evaluate_general_studies ?? [],
		evaluateEssay: data.evaluatorLead?.evaluate_essay ?? false,
		evaluateOptional: data.evaluatorLead?.evaluate_optional ?? false
	})

	let currentStep = $state(data.evaluatorLead?.current_step ?? 1)
	let loadingSubmission = $state(false)

	const handleBasicInformationSubmission: SubmitFunction = () => {
		loadingSubmission = true
		return async ({ update, result }) => {
			if (result.status === 400) {
				loadingSubmission = false
				return
			}
			await update()
			nextStep()
			loadingSubmission = false
		}
	}

	const handlePreferenceSubmission: SubmitFunction = () => {
		loadingSubmission = true
		return async ({ update, result }) => {
			if (result.status === 400) {
				loadingSubmission = false
				return
			}
			await update()
			nextStep()
			loadingSubmission = false
		}
	}

	const handleEvaluatorConversion: SubmitFunction = () => {
		loadingSubmission = true
		return async ({ update, result }) => {
			if (result.status === 400) {
				loadingSubmission = false
				return
			}
			await update()
			loadingSubmission = false
		}
	}

	function nextStep() {
		if (currentStep < 5) currentStep++
	}

	function prevStep(e: Event) {
		e.preventDefault()
		if (currentStep > 1) currentStep--
	}
</script>

<Background />
<div class="onboarding-container">
	<h1>On Boarding</h1>
	<h3>Please fill out all the information below in to complete your registration.</h3>
	<h4>Note:</h4>
	<ul>
		<li>You can only complete this onboarding process once.</li>
		<li>
			Please fill out all the information with sincerity, any missing information will be rejected
			immediately.
		</li>
		<li>All the fields marked with asterisk (*) are mandatory.</li>
	</ul>
	<Timeline {currentStep} />

	{#if currentStep === 1}
		<form
			enctype="multipart/form-data"
			method="post"
			action="?/basicInfo"
			use:enhance={handleBasicInformationSubmission}
		>
			<Step1 bind:formData={formDataStep1} {loadingSubmission} />
		</form>
	{:else if currentStep === 2}
		<form method="post" action="?/preferences" use:enhance={handlePreferenceSubmission}>
			<Step2 bind:formData={formDataStep2} {prevStep} {loadingSubmission} />
		</form>
	{:else if currentStep === 3}
		<Step3 {loadingSubmission} />
	{:else if currentStep === 4}
		<Step4 {loadingSubmission} />
	{:else if currentStep === 5}
		<form method="post" action="?/convertEvaluator" use:enhance={handleEvaluatorConversion}>
			<Step5 {loadingSubmission} />
		</form>
	{/if}
</div>

<style lang="scss">
	.onboarding-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
