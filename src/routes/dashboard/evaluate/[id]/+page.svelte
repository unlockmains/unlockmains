<script lang="ts">
	import { browser } from '$app/environment'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import Button from '$lib/components/atoms/Button.svelte'
	import FileUpload from '$lib/components/atoms/FileUpload.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import OpenPdf from '$lib/components/atoms/OpenPDF.svelte'
	import PageSpinner from '$lib/components/atoms/PageSpinner.svelte'
	import type { IPageAnnotations, IRecentAssignments } from '$lib/types'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	let assignmentToView = $state<IRecentAssignments>()
	let pdfFileData = $state<{
		loading: boolean
		error: string | null
		data?: Uint8Array
		viewClicked: boolean
		editClicked: boolean
		offlineEvaluateClicked: boolean
	}>({
		loading: false,
		error: null,
		viewClicked: false,
		editClicked: false,
		offlineEvaluateClicked: false
	})

	let loadingSubmission = $state(false)

	onMount(() => {
		assignmentToView = JSON.parse(localStorage.getItem('evaluate') as string)
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

	const makeFileOfflineEvaluate = async () => {
		pdfFileData.offlineEvaluateClicked = true
	}

	const handleEvaluationSubmission: SubmitFunction = () => {
		loadingSubmission = true
		return async ({ update }) => {
			update()
			loadingSubmission = false
		}
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
			label="Offline Evaluate"
			onClick={makeFileOfflineEvaluate}
			withLoader={pdfFileData.loading}
			disabled={pdfFileData.loading}
			style="--btn-background: var(--color-cyan-100);--btn-background-hover: var(--color-cyan-300);"
		/>
		<Button
			type="view"
			label="Edit"
			onClick={makeFileEditable}
			withLoader={pdfFileData.loading}
			disabled={true || pdfFileData.loading || pdfFileData.editClicked}
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
{#if !pdfFileData.loading && pdfFileData.data && !pdfFileData.offlineEvaluateClicked}
	<div class="evaluation-container">
		<OpenPdf
			pdfUrl={pdfFileData.data}
			onSave={handleSave}
			{savedAnnotations}
			showAnnotations={pdfFileData.editClicked}
		/>
	</div>
{:else if !pdfFileData.loading && pdfFileData.offlineEvaluateClicked}
	<form
		class="offline-evaluation-container"
		enctype="multipart/form-data"
		method="post"
		action="?/offlineEvaluation"
		use:enhance={handleEvaluationSubmission}
	>
		<input name="id" value={$page.params.id} type="hidden" />
		<div>
			<p class="label">Please upload the evaluated file</p>
			<FileUpload name="evaluated-files" />
		</div>
		<div>
			<Input
				id="submitted-quantity"
				name="submitted-quantity"
				placeholder="Enter Number"
				type="number"
				label="Number of Questions Submitted"
				value=""
				style="--height: 3em;--font-size: 0.8em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
				min={1}
			/>
		</div>
		<div>
			<Input
				id="remarks"
				name="remarks"
				placeholder="Enter Remarks"
				type="textarea"
				label="Enter remarks if any"
				value=""
				rows={10}
				cols={50}
			/>
		</div>
		<Button type="submit" label="Submit" withLoader={pdfFileData.loading} />
	</form>
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
			align-items: flex-start;
			justify-content: space-between;
			width: 100%;
			gap: 1em;
		}

		.action-button {
			display: flex;
			flex-flow: row wrap;
			align-self: flex-end;
			gap: 2em;
			justify-content: space-between;
		}
	}

	.offline-evaluation-container {
		box-shadow: 0 0 4px 4px var(--color-zinc-300);
		border-radius: 4px;
		width: 95%;
		padding: 1em;
		background-color: var(--color-white-900);
		display: flex;
		flex-flow: column wrap;
		align-items: flex-start;
		gap: 1em;
		.label {
			text-transform: capitalize;
			display: block;
			margin: 5px 0;
			color: var(--custom-color-secondary);
			font-size: 0.8rem;
		}
	}
</style>
