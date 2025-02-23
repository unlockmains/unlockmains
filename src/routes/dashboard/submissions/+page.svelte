<script lang="ts">
	import { goto } from '$app/navigation'
	import Grid from '$lib/components/atoms/Grid.svelte'
	import Modal from '$lib/components/atoms/Modal.svelte'
	import OpenPdf from '$lib/components/atoms/OpenPDF.svelte'
	import PageSpinner from '$lib/components/atoms/PageSpinner.svelte'
	import type { IRecentEvaluation, ISubmission } from '$lib/types'
	import { onMount } from 'svelte'

	let submissions = $state<ISubmission[]>([])

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
			title: 'Question Type 1',
			size: '10%'
		},
		{
			key: 'question_type_lvl2',
			title: 'Question Type 2',
			size: '10%'
		},
		{
			key: 'question_type_lvl3',
			title: 'Question Type 3',
			size: '10%'
		},
		{
			key: 'status',
			title: 'Status',
			size: '12%'
		},
		{
			key: 'is_pyq',
			title: 'is PYQ',
			size: '5%'
		},
		{
			key: 'total_questions',
			title: 'Questions Submitted',
			size: '8%'
		},
		{
			key: 'submittedFile',
			title: 'Submitted File',
			type: 'link',
			size: '5%',
			onClick: getFileView
		},
		{
			key: 'evaluatedFile',
			title: 'Evaluated File',
			type: 'link',
			size: '5%',
			onClick: (value: string) => getFileView(value, 'evaluation')
		},
		{
			key: 'evaluationRemark',
			title: 'Evaluator Remarks',
			size: '30%'
		}
	])

	let showModal = $state(false)

	onMount(async () => {
		pdfFileData.loading = true
		const response = await fetch('/api/student/all-submissions')
		if (response.ok) {
			const data = await response.json()
			submissions = data.map((submission: IRecentEvaluation) => ({
				...submission,
				submittedFile: submission.submittedFiles[0].file_id,
				evaluatedFile: submission.evaluations[0]?.evaluatedFiles[0]?.file_id,
				evaluationRemark: submission.evaluations[0]?.remarks,
				is_pyq: submission.is_pyq ? 'Yes' : 'No'
			}))
			pdfFileData.loading = false
		}
	})

	const onRowClick = (id: string) => {
		!pdfFileData.loading && goto(`/dashboard/view-evaluation/${id}`)
	}
</script>

<div class="dashboard-submissions">
	<h1>Submissions</h1>
	<Grid bind:data={submissions} bind:columns {onRowClick} />
	{#if pdfFileData.loading}
		<PageSpinner />
	{:else if pdfFileData.data && !pdfFileData.loading}
		<Modal {showModal}>
			<OpenPdf pdfUrl={pdfFileData.data} showAnnotations={false} />
		</Modal>
	{/if}
</div>

<style lang="scss">
	.dashboard-submissions {
		width: 100%;
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		padding: 1em;
	}
</style>
