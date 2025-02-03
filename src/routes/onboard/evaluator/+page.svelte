<script lang="ts">
	import Background from '$lib/components/atoms/Background.svelte'
	import Step1 from '$lib/components/onboard/Step1.svelte'
	import Step2 from '$lib/components/onboard/Step2.svelte'
	import Step3 from '$lib/components/onboard/Step3.svelte'
	import Step4 from '$lib/components/onboard/Step4.svelte'
	import Timeline from '$lib/components/onboard/Timeline.svelte'
	import type { IEvaluatorOnBoardData } from '$lib/types'

	let formData: IEvaluatorOnBoardData = {
		name: '',
		phoneNumber: '',
		prelimsAttempts: undefined,
		mainsAttempts: undefined,
		interviewsAppeared: undefined,
		optionalSubject: '',
		hasRank: false,
		evaluationLanguage: '',
		experience: '',
		existingUser: 'No',
		existingUserEmail: '',
		assignment: ''
	}

	let currentStep = 1

	function nextStep() {
		if (currentStep < 4) currentStep++
	}

	function prevStep() {
		if (currentStep > 1) currentStep--
	}

	function submitForm() {
		console.log('Form submitted:', formData)
		currentStep = 4
	}
</script>

<Background />
<div class="onboarding-container">
	<Timeline {currentStep} />

	{#if currentStep === 1}
		<Step1 bind:formData {nextStep} />
	{:else if currentStep === 2}
		<Step2 bind:formData {nextStep} {prevStep} />
	{:else if currentStep === 3}
		<Step3 bind:formData {nextStep} {prevStep} />
	{:else if currentStep === 4}
		<Step4 />
	{/if}
</div>

<style lang="scss">
	.onboarding-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
