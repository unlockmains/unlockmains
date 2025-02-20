<script lang="ts">
	import Grid from '$lib/components/atoms/Grid.svelte'
	import Modal from '$lib/components/atoms/Modal.svelte'
	import OpenPdf from '$lib/components/atoms/OpenPDF.svelte'
	import PageSpinner from '$lib/components/atoms/PageSpinner.svelte'
	import type { IEvaluations, IRecentAssignments, IRecentEvaluation } from '$lib/types'
	import { onMount } from 'svelte'

	let evaluations = $state<IEvaluations[]>([])

	let pdfFileData = $state<{
		loading: boolean
		error: string | null
		data?: Uint8Array
	}>({
		loading: false,
		error: null
	})

	let getFileView = async (fileId: string, type?: string) => {
		pdfFileData.loading = true
		showModal = false
		pdfFileData.data = undefined
		const response = await fetch(`/api/files/view/${fileId}?type=${type}`, {
			method: 'POST'
		})
		if (response.ok) {
			const fileData = await response.arrayBuffer()
			pdfFileData.data = new Uint8Array(fileData)
			pdfFileData.loading = false
			showModal = true
		}
	}

	let columns = $state([
		{
			key: 'question_type_lvl1',
			title: 'Question Type 1'
		},
		{
			key: 'question_type_lvl2',
			title: 'Question Type 2'
		},
		{
			key: 'question_type_lvl3',
			title: 'Question Type 3'
		},
		{
			key: 'status',
			title: 'Status'
		},
		{
			key: 'is_pyq',
			title: 'is PYQ'
		},
		{
			key: 'total_questions',
			title: 'Questions Submitted'
		},
		{
			key: 'submittedFile',
			title: 'Submitted File',
			type: 'link',
			onClick: getFileView
		},
		{
			key: 'evaluatedFile',
			title: 'Evaluated File',
			type: 'link',
			onClick: (value: string) => getFileView(value, 'evaluation')
		},
		{
			key: 'remarks',
			title: 'Evaluator Remarks'
		}
	])

	let showModal = $state(false)

	onMount(async () => {
		pdfFileData.loading = true
		const response = await fetch('/api/evaluator/all-evaluations')
		if (response.ok) {
			const data = await response.json()
			evaluations = data.map((submission: IRecentAssignments) => ({
				...submission.submissionDetails,
				is_pyq: submission.submissionDetails.is_pyq ? 'Yes' : 'No',
				submittedFile: submission.submittedFiles[0].file_id,
				evaluatedFile: submission.evaluations[0]?.evaluatedFiles[0]?.file_id,
				remarks: submission.evaluations[0]?.remarks,
				evaluationStart: submission.evaluations[0]?.evaluation_start,
				evaluationEnd: submission.evaluations[0]?.evaluation_end
			}))
			pdfFileData.loading = false
		}
	})
</script>

<div class="dashboard-evaluations">
	<h1>Evaluations</h1>
	<Grid bind:data={evaluations} bind:columns />
	{#if pdfFileData.loading}
		<PageSpinner />
	{:else if pdfFileData.data && !pdfFileData.loading}
		<Modal {showModal}>
			<OpenPdf pdfUrl={pdfFileData.data} showAnnotations={false} />
		</Modal>
	{/if}
</div>

<style lang="scss">
	.dashboard-evaluations {
		width: 100%;
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		padding: 1em;
	}
</style>
