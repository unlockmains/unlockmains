<script lang="ts">
	import { enhance } from '$app/forms'
	import Button from '$lib/components/atoms/Button.svelte'
	import Combobox from '$lib/components/atoms/Combobox.svelte'
	import FileUpload from '$lib/components/atoms/FileUpload.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import RadioGroup from '$lib/components/atoms/RadioGroup.svelte'
	import ComboboxContext from '$lib/context/ComboboxContext.svelte'
	import { alwaysShow } from '$lib/stores/sideNavStore'
	import { toast } from 'svelte-sonner'
	import { goto } from '$app/navigation'
	import type { ActionData, SubmitFunction } from './$types'
	import type { INewSubmissionType } from '$lib/types'

	let { form, data } = $props<{
		form: ActionData
		data: { questionTypes: INewSubmissionType[] }
	}>()

	let radioValue = $state<'yes' | 'no' | undefined>(undefined)
	let loadingSubmission = $state(false)
	let selectedValue = $state<string | undefined>(undefined)
	const maxQuestions = $derived(
		data.questionTypes.find(
			(questionType: INewSubmissionType) => questionType.value === selectedValue
		)?.count ?? 0
	)

	const handleQuestionSubmission: SubmitFunction = () => {
		loadingSubmission = true
		return async ({ update }) => {
			update()
			loadingSubmission = false
		}
	}

	$effect(() => {
		if (form) {
			if (form.success) {
				toast.success('Submission Successful')
				goto(`/dashboard`)
			} else {
				toast.error(form?.message as string)
			}
		}
	})
</script>

<h1>New Submission</h1>
<div class="note">
	<h3>Note:</h3>
	<ul>
		<li>
			<b>File Format:</b> You can upload a single PDF file. We recommend using a PDF for optimal quality
			and ease of processing.
		</li>
		<li>
			<b>Handwriting Accuracy:</b> In case of any discrepancies in handwriting it may result in rejection
			of your submission. This could also lead to account suspension without the possibility of a refund.
		</li>

		<li>
			<b>Image Quality:</b> For best results, ensure that images are clear and legible. Blurry or low-resolution
			images may also lead to rejection.
		</li>

		<li>
			<b>File Size:</b> Please check that your file size does not exceed our maximum limit to ensure
			a smooth upload process.
		</li>

		<li>
			<b>Submission Confirmation:</b> After uploading your files, you will receive a confirmation notification.
			If you do not receive this, please check your submission.
		</li>
	</ul>
</div>
<form
	class="submission-area"
	enctype="multipart/form-data"
	method="post"
	use:enhance={handleQuestionSubmission}
>
	<div class="question-type">
		<ComboboxContext>
			<Combobox
				label="Question Type"
				name="question-type"
				placeholder="Click or Search"
				options={data.questionTypes}
				style="--height: 3em;--font-size: 0.8em;"
				disabled={false}
				showRemainingCount={true}
				bind:value={selectedValue}
			/>
		</ComboboxContext>
	</div>
	<div class="question-quantity">
		<Input
			id="question-quantity"
			name="question-quantity"
			placeholder="Enter Number"
			type="number"
			label="Number of Questions"
			value=""
			style="--height: 3em;--font-size: 0.8em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			min={1}
			max={maxQuestions}
		/>
	</div>
	<div class="question-file">
		<FileUpload name="question-files" />
	</div>
	<div class="question-pyq">
		<RadioGroup
			options={[
				{
					value: 'yes',
					label: 'Yes'
				},
				{
					value: 'no',
					label: 'No'
				}
			]}
			label="Is PYQ (optional)"
			name="question-pyq"
			bind:userSelected={radioValue}
		/>
	</div>
	<div style="align-self: center;">
		<Button
			label={'Submit'}
			type="submit"
			withLoader={loadingSubmission}
			disabled={loadingSubmission}
		/>
	</div>
</form>

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

	.submission-area {
		box-shadow: 0 0 4px 4px var(--color-zinc-300);
		border-radius: 4px;
		width: 95%;
		padding: 1em;
		background-color: var(--color-white-900);
		display: flex;
		flex-flow: column wrap;
		align-items: flex-start;
		gap: 1em;

		.question-type,
		.question-quantity {
			width: 15em;
		}
		.question-file {
			width: 100%;
		}
	}
</style>
