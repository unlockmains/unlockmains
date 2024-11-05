<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte'
	import Grid from '$lib/components/atoms/Grid.svelte'
	import Modal from '$lib/components/atoms/Modal.svelte'
	import OpenPdf from '$lib/components/atoms/OpenPDF.svelte'
	import type { IPageAnnotations } from '$lib/types/index.js'

	export let data
	$: ({ submissions } = data)
	console.log(submissions)
	let columns = [
		{
			key: 'name',
			title: 'Name'
		},
		{
			key: 'noOfQuestions',
			title: 'No. of Questions'
		},
		{
			key: 'questionType',
			title: 'Question Type'
		},
		{
			key: 'status',
			title: 'Status'
		},
		{
			key: 'pyq',
			title: 'PYQ'
		},
		{
			key: 'submissionDate',
			title: 'Submission Date'
		},
		{
			key: 'submittedFileName',
			title: 'Submitted File'
		}
	]

	let showModal = false

	async function handleSave(annotations: IPageAnnotations) {
		console.log('saveing', annotations)
		try {
			// Save to localStorage
			localStorage.setItem('pdfAnnotations', JSON.stringify(annotations))

			// Or save to backend
			// await fetch('/api/save-annotations', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(annotations)
			// })
		} catch (error) {
			console.error('Failed to save annotations:', error)
		}
	}

	// Load saved annotations
	const savedAnnotations = JSON.parse(localStorage.getItem('pdfAnnotations') || '{}')
</script>

<div style="width: 100%;">
	<h1>Submissions</h1>
	<!-- {#each submissions as submission}
		<div>{submission.name}</div>
	{/each} -->
	<Grid bind:data={submissions} bind:columns />

	<Button label="show modal" onClick={() => (showModal = true)} />

	<!-- <Modal {showModal}> -->
	<OpenPdf
		pdfUrl="https://shrey.shreykumar.com/api/files/question_submissions/g97jfi4t6rc5sc8/sample_multiple_onil1GEFjd.pdf"
		onSave={handleSave}
		{savedAnnotations}
	/>
	<!-- </Modal> -->

	<!-- /bminycuzvo03uqb/sample_R2Li3rnQNX.pdf -->
</div>

<style lang="scss">
</style>
