<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import Button from '$lib/components/atoms/Button.svelte'
	import OpenPdf from '$lib/components/atoms/OpenPDF.svelte'
	import type { IPageAnnotations, IRecentAssignments, IUser } from '$lib/types'
	import { onMount } from 'svelte'
	let assignmentToView = $state<IRecentAssignments>()
	let pdfBUfferArray = $state<Uint8Array>()

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

	const getFileView = async () => {
		console.log('url', `/api/files/view/${assignmentToView?.submittedFiles[0].file_id}`)
		const response = await fetch(`/api/files/view/${assignmentToView?.submittedFiles[0].file_id}`, {
			method: 'POST'
		})
		if (response.ok) {
			pdfBUfferArray = (await response.body?.getReader().read())?.value
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
		<Button type="view" label="View" onClick={getFileView} />
		<Button type="next" label="Download" />
	</div>
</div>
{#if pdfBUfferArray}
	<div class="evaluation-container">
		<OpenPdf pdfUrl={pdfBUfferArray} onSave={handleSave} {savedAnnotations} />
	</div>
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
