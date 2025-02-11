<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import Button from '$lib/components/atoms/Button.svelte'
	import OpenPdf from '$lib/components/atoms/OpenPDF.svelte'
	import PageSpinner from '$lib/components/atoms/PageSpinner.svelte'
	import type { IPageAnnotations, IRecentAssignments } from '$lib/types'
	import { onMount } from 'svelte'
	let assignmentToView = $state<IRecentAssignments>()
	let pdfFileData = $state<{
		loading: boolean
		error: string | null
		data?: Uint8Array
		viewClicked: boolean
		editClicked: boolean
	}>({
		loading: false,
		error: null,
		viewClicked: false,
		editClicked: false
	})

	onMount(() => {
		const allAssignments = JSON.parse(localStorage.getItem('recentAssignments') as string)
		assignmentToView = allAssignments.find(
			(assignment: IRecentAssignments) => assignment.$id === $page.params.id
		)
	})

	async function handleSave(annotations: IPageAnnotations) {
		try {
			browser && localStorage.setItem('pdfAnnotations', JSON.stringify(annotations))

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
	const savedAnnotations = browser && JSON.parse(localStorage.getItem('pdfAnnotations') || '{}')

	const getFileDownload = async () => {
		pdfFileData.loading = true
		const response = await fetch(
			`/api/files/download/${assignmentToView?.submittedFiles[0].file_id}`,
			{
				method: 'POST'
			}
		)
		if (response.ok) {
			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `${$page.params.id}.pdf`
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			a.remove()
			pdfFileData.loading = false
		}
	}

	const getFileView = async () => {
		pdfFileData.loading = true
		pdfFileData.viewClicked = true
		const response = await fetch(`/api/files/view/${assignmentToView?.submittedFiles[0].file_id}`, {
			method: 'POST'
		})
		if (response.ok) {
			pdfFileData.data = (await response.body?.getReader().read())?.value
			pdfFileData.loading = false
		}
	}

	const makeFileEditable = async () => {
		if (!pdfFileData.data) {
			await getFileView()
		}
		pdfFileData.editClicked = true
	}
</script>

<div><h1>Evaluate</h1></div>
<div class="note">
	<h3>Note:</h3>
	<ul>
		<li>
			<b>Evaluation:</b> Evaluate the file.
		</li>
	</ul>
</div>
<div class="evaluation-container">
	<div class="question-type">
		<div>
			<h4>Question Type</h4>
			<p>{assignmentToView?.submissionDetails.question_type_lvl1}</p>
		</div>
		{#if assignmentToView?.submissionDetails.question_type_lvl2}
			<div>
				<h4>Question Type Level 2</h4>
				<p>{assignmentToView?.submissionDetails.question_type_lvl2}</p>
			</div>
		{/if}
		{#if assignmentToView?.submissionDetails.question_type_lvl3}
			<div>
				<h4>Question Type Level 3</h4>
				<p>{assignmentToView?.submissionDetails.question_type_lvl3}</p>
			</div>
		{/if}
		<div>
			<h4>Is it Previous Year Question?</h4>
			<p>{!assignmentToView?.submissionDetails.is_pyq ? 'No' : 'Yes'}</p>
		</div>
		<div>
			<h4>Total Question Submitted</h4>
			<p>{assignmentToView?.submissionDetails.total_questions}</p>
		</div>
	</div>
	<div class="action-button">
		<Button
			type="view"
			label="Reject"
			onClick={() => {}}
			withLoader={pdfFileData.loading}
			disabled={pdfFileData.loading}
			style="--btn-background: var(--color-red-400);--btn-background-hover: var(--color-red-700);"
		/>
		<Button
			type="view"
			label="Edit"
			onClick={makeFileEditable}
			withLoader={pdfFileData.loading}
			disabled={pdfFileData.loading || pdfFileData.editClicked}
			style="--btn-background: var(--color-yellow-100);--btn-background-hover: var(--color-yellow-500);"
		/>
		<Button
			type="view"
			label="View"
			onClick={getFileView}
			withLoader={pdfFileData.loading}
			disabled={pdfFileData.loading || pdfFileData.viewClicked}
		/>
		<Button
			onClick={getFileDownload}
			type="next"
			label="Download"
			withLoader={pdfFileData.loading}
		/>
	</div>
</div>
{#if !pdfFileData.loading && pdfFileData.data}
	<div class="evaluation-container">
		<OpenPdf
			pdfUrl={pdfFileData.data}
			onSave={handleSave}
			{savedAnnotations}
			showAnnotations={!pdfFileData.editClicked}
		/>
	</div>
{:else if pdfFileData.loading}
	<PageSpinner />
{/if}

<style lang="scss">
	.note {
		box-shadow: 0 0 4px 4px var(--color-zinc-300);
		border-radius: 4px;
		width: 95%;
		padding: 1em;
		background-color: var(--color-white-900);
		h3 {
			margin: 0;
			padding: 0;
			color: var(--custom-color-brand);
		}
		ul {
			li {
				margin-bottom: 8px;
				font-size: 0.8em;
			}
		}
	}
	.evaluation-container {
		box-shadow: 0 0 4px 4px var(--color-zinc-300);
		border-radius: 4px;
		width: 95%;
		padding: 1em;
		background-color: var(--color-white-900);
		display: flex;
		flex-flow: column wrap;
		align-items: flex-start;
		gap: 1em;

		.question-type {
			display: flex;
			flex-flow: row wrap;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			gap: 1em;
		}

		.action-button {
			display: flex;
			flex-flow: row wrap;
			align-self: flex-end;
			gap: 2em;
		}
	}
</style>
