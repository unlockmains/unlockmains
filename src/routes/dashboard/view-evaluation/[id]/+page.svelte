<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { convertISODateToDate } from '$lib/api/utils'
	import Button from '$lib/components/atoms/Button.svelte'
	import FileUpload from '$lib/components/atoms/FileUpload.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import OpenPdf from '$lib/components/atoms/OpenPDF.svelte'
	import PageSpinner from '$lib/components/atoms/PageSpinner.svelte'
	import type { IRecentEvaluation } from '$lib/types'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	let viewEvaluation = $state<IRecentEvaluation>()
	let pdfFileData = $state<{
		loading: boolean
		error: string | null
		data?: Uint8Array
		viewClicked: boolean
	}>({
		loading: false,
		error: null,
		viewClicked: false
	})

	let loadingEvaluation = $state(false)

	onMount(() => {
		viewEvaluation = JSON.parse(localStorage.getItem('view-evaluation') as string)
		console.log('viewEvaluation', viewEvaluation)
	})

	const getFileDownload = async () => {
		pdfFileData.loading = true
		const response = await fetch(
			`/api/files/download/${viewEvaluation?.evaluations[0].evaluatedFiles[0].file_id}?type=evaluation`,
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
		const response = await fetch(
			`/api/files/view/${viewEvaluation?.evaluations[0].evaluatedFiles[0].file_id}?type=evaluation`,
			{
				method: 'POST'
			}
		)
		if (response.ok) {
			pdfFileData.data = (await response.body?.getReader().read())?.value
			pdfFileData.loading = false
		}
	}

	const handleEvaluationSubmission: SubmitFunction = () => {
		loadingEvaluation = true
		return async ({ update }) => {
			update()
			loadingEvaluation = false
		}
	}
</script>

<div><h1>View Evaluation</h1></div>
<div class="note">
	<h3>Note:</h3>
	<ul>
		<li>
			<b>Complaints:</b> Reach out to support.
		</li>
	</ul>
</div>
<div class="evaluation-container">
	<div class="question-type">
		<div>
			<h4>Question Type</h4>
			<p>{viewEvaluation?.question_type_lvl1}</p>
		</div>
		{#if viewEvaluation?.question_type_lvl2}
			<div>
				<h4>Question Type Level 2</h4>
				<p>{viewEvaluation?.question_type_lvl2}</p>
			</div>
		{/if}
		{#if viewEvaluation?.question_type_lvl3}
			<div>
				<h4>Question Type Level 3</h4>
				<p>{viewEvaluation?.question_type_lvl3}</p>
			</div>
		{/if}
		<div>
			<h4>Is it Previous Year Question?</h4>
			<p>{!viewEvaluation?.is_pyq ? 'No' : 'Yes'}</p>
		</div>
		<div>
			<h4>Total Question Submitted</h4>
			<p>{viewEvaluation?.total_questions}</p>
		</div>
		{#if viewEvaluation?.evaluations[0].evaluation_start}
			<div>
				<h4>Evaluation Start Date</h4>
				<p>{convertISODateToDate(viewEvaluation?.evaluations[0].evaluation_start)}</p>
			</div>
		{/if}
		{#if viewEvaluation?.evaluations[0].evaluation_end}
			<div>
				<h4>Evaluation End Date</h4>
				<p>{convertISODateToDate(viewEvaluation?.evaluations[0].evaluation_end)}</p>
			</div>
		{/if}
		<div>
			<h4>Remarks</h4>
			<p>{viewEvaluation?.evaluations[0].remarks}</p>
		</div>
	</div>
	<div class="action-button">
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
		<OpenPdf pdfUrl={pdfFileData.data} showAnnotations={false} />
	</div>
{:else if !pdfFileData.loading && false}
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

			div {
				flex: 1 1 calc(20% - 1em);
				box-sizing: border-box;
			}
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
