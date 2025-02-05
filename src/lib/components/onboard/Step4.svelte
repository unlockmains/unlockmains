<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import Button from '../atoms/Button.svelte'
	import Input from '../atoms/Input.svelte'

	let { loadingSubmission = $bindable() } = $props<{
		loadingSubmission: boolean
	}>()

	let error = $state(false)
	let downloading = $state(false)
	let evaluatedAssignment2 = $state<File | undefined>(undefined)
	let success = $state(false)

	const handleAssignment2Submission: SubmitFunction = () => {
		loadingSubmission = true
		return async ({ update, result }) => {
			if (result.status === 400) {
				loadingSubmission = false
				error = true
				return
			}
			await update()
			loadingSubmission = false
			if (result.status === 200) {
				success = true
			}
		}
	}

	const downloadAssignment2 = async () => {
		downloading = true
		const response = await fetch('/api/evaluator/assignment2', {
			method: 'POST'
		})
		if (response.ok) {
			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'Assignment_2.pdf'
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			a.remove()
			downloading = false
		}
	}
</script>

<form
	enctype="multipart/form-data"
	method="post"
	action="?/assignment2"
	use:enhance={handleAssignment2Submission}
>
	<div class="form-container">
		<h4>Steps:</h4>
		<ul>
			<li>You are assigned an assignment to evaluate.</li>
			<li>You can download the assignment from below.</li>
			<li>
				Based on the verification of the submitted evaluated copy of the assignment, you will be
				allowed to proceed to next step.
			</li>
			<li>Please submit the evaluated copy of the assignment with 24 hours.</li>
			<li>
				If you face any issues, please reach out to us on the details mentioned in Contact Page.
			</li>
		</ul>
		<div class="form-group">
			<h1>Assignment 2</h1>
			<Button
				type="submit"
				label="Download Assignment 2"
				onClick={() => downloadAssignment2()}
				style="--btn-width: 16em;"
				withLoader={downloading}
				disabled={downloading}
			/>
			{#if downloading}
				<div class="loader-container">
					<p>Please wait while we download the assignment</p>
				</div>
			{/if}
		</div>

		<div class="form-group">
			<Input
				type="file"
				name="evaluatedFile2"
				bind:value={evaluatedAssignment2}
				label="Upload your Evaluated Copy of Assignment 2"
				id="marksheet"
				placeholder="Upload your Evaluated Copy of Assignment 2"
				disabled={success || loadingSubmission}
			/>
		</div>
	</div>

	<div class="form-navigation">
		<Button
			label="Submit"
			type="next"
			onClick={() => {}}
			withLoader={loadingSubmission}
			disabled={loadingSubmission}
		/>
	</div>
</form>

{#if success}
	<div class="success-message">
		<h4>
			🎉 Congratulations! You have successfully submitted assignment 2. <br />Sit back and Relax
			until we evaluate your submission.<br /> You will receive a confirmation email once your submission
			is evaluated.
		</h4>
	</div>
{/if}

{#if error && !success}
	<div class="errors">
		<p>Please fill out all required fields before you proceed.</p>
	</div>
{/if}

<style lang="scss">
	.form-container {
		display: flex;
		flex-direction: column;
		gap: 1em;

		h4 {
			margin: 0.3em 1em;
		}

		.form-group {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1em;
			margin-bottom: 15px;
		}
	}
	.form-navigation {
		display: flex;
		gap: 1em;
		margin-top: 1em;
		justify-content: flex-end;
	}

	.errors {
		color: var(--color-red-700);
		font-size: 1.5em;
		margin-top: 1em;
	}

	.success-message {
		text-align: center;
		font-size: 1.5em;
		color: var(--color-green-700);
	}
</style>
