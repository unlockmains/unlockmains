<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte'
	import Grid from '$lib/components/atoms/Grid.svelte'
	import Modal from '$lib/components/atoms/Modal.svelte'
	import OpenPdf from '$lib/components/atoms/OpenPDF.svelte'

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
</script>

<div style="width: 100%;">
	<h1>Submissions</h1>
	<!-- {#each submissions as submission}
		<div>{submission.name}</div>
	{/each} -->
	<Grid bind:data={submissions} bind:columns />

	<Button label="show modal" onClick={() => (showModal = true)} />

	<Modal {showModal}>
		<OpenPdf
			pdfUrl="https://shrey.shreykumar.com/api/files/question_submissions/g97jfi4t6rc5sc8/sample_multiple_onil1GEFjd.pdf"
		/>
	</Modal>

	<!-- /bminycuzvo03uqb/sample_R2Li3rnQNX.pdf -->
</div>

<style lang="scss">
</style>
