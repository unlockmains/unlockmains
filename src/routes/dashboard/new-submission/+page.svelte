<script lang="ts">
	import Combobox from '$lib/components/atoms/Combobox.svelte'
	import FileUpload from '$lib/components/atoms/FileUpload.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import RadioGroup from '$lib/components/atoms/RadioGroup.svelte'
	import ComboboxContext from '$lib/context/ComboboxContext.svelte'
	import { alwaysShow } from '$lib/stores/sideNavStore'

	let radioValue: string = "no";
</script>

<main class:sideBarSpace={$alwaysShow}>
	<h1>New Submission</h1>
	<div class="note">
		<h3>Note:</h3>
		<ul>
			<li>
				<b>File Format:</b> You can upload multiple images or a single PDF file. We recommend using a
				PDF for optimal quality and ease of processing.
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
	<div class="submission-area">
		<div class="question-type">
			<ComboboxContext>
				<Combobox
					label="Question Type"
					name="questionType"
					placeholder="Type to find..."
					options={[
						{ text: 'Option 1', value: 'option-1' },
						{ text: 'Option 2', value: 'option-2' },
						{ text: 'Option 3', value: 'option-3' }
					]}
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
			/>
		</div>
		<div class="question-file">
			<FileUpload />
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
				label="Is PYQ"
				bind:userSelected={radioValue}
			/>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		justify-content: center;
		background-color: var(--color-white-800);
		width: calc(100% - max(15rem, 15%));
		min-height: max(100%, 100vh);
		gap: 2em;

		&.sideBarSpace {
			margin-left: max(15rem, 15%);
		}

		.note {
			box-shadow: 0 0 4px 4px var(--color-zinc-300);
			border-radius: 4px;
			width: 80%;
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
			min-height: 10rem;
			box-shadow: 0 0 4px 4px var(--color-zinc-300);
			border-radius: 4px;
			width: 80%;
			padding: 1em;
			background-color: var(--color-white-900);
			display: flex;
			justify-content: center;
			flex-flow: column wrap;
			align-items: center;

			.question-type,
			.question-quantity {
				width: 15em;
			}
			.question-file {
				width: 90%;
			}
		}
	}
</style>
