<script lang="ts">
	import Combobox from '$lib/components/atoms/Combobox.svelte'
	import Select from '$lib/components/atoms/Select.svelte'
	import ComboboxContext from '$lib/context/ComboboxContext.svelte'
	import { alwaysShow } from '$lib/stores/sideNavStore'
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

		div {
			box-shadow: 0 0 4px 4px var(--color-zinc-300);
			border-radius: 4px;
			width: 80%;
			padding: 1em;
			background-color: var(--color-white-900);
		}

		.note {
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
		}
	}
</style>
