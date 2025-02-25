<script lang="ts">
	import BinIcon from '../icons/BinIcon.svelte'
	import ImageIcon from '../icons/ImageIcon.svelte'
	import PdfIcon from '../icons/PDFIcon.svelte'
	import UploadIcon from '../icons/UploadIcon.svelte'

	let { name = '' } = $props()

	let uploadArea: HTMLDivElement | null = $state(null)
	let fileInput: HTMLInputElement | null = $state(null)
	let files = $state<File[]>([])

	const uploadAreaDragOver = (event: DragEvent) => {
		event.preventDefault()
		uploadArea && uploadArea.classList.add('hover')
	}

	const uploadAreaDragLeave = (event: DragEvent) => {
		event.preventDefault()
		uploadArea && uploadArea.classList.remove('hover')
	}

	const uploadAreaDrop = (event: DragEvent) => {
		event.preventDefault()
		uploadArea && uploadArea.classList.remove('hover')
		if (event?.dataTransfer?.files) {
			const newFiles = Array.from(event.dataTransfer.files)
			files = [...files, ...newFiles]
		}
	}

	const fileInputChange = (event: Event) => {
		const input = event.target as HTMLInputElement
		if (input.files) {
			const newFiles = Array.from(input.files)
			files = [...newFiles]
		}
	}

	const removeFile = (fileToRemove: File) => {
		files = files.filter((file) => file.name !== fileToRemove.name)
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore event_directive_deprecated -->
<div
	id="upload-area"
	class="upload-area"
	bind:this={uploadArea}
	on:dragover={uploadAreaDragOver}
	on:dragleave={uploadAreaDragLeave}
	on:drop={uploadAreaDrop}
	on:click={() => fileInput?.click()}
>
	{#if !files.length}
		<div class="upload-icon"><UploadIcon /></div>
		<p>Drag & drop your file here or click to upload!</p>
	{:else}
		<div class="file-list">
			{#if files}
				{#each files as file}
					<div class="file-item">
						{#if file.type.startsWith('image/')}
							<ImageIcon />
						{:else if file.type === 'application/pdf'}
							<PdfIcon />
						{:else}
							<span>No icon available</span>
						{/if}
						<span>{file.name}</span>
						<button
							on:click={(event) => {
								event.stopPropagation()
								removeFile(file)
							}}
						>
							<BinIcon />
						</button>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
	<input
		type="file"
		id="file-input"
		{name}
		bind:this={fileInput}
		on:change={fileInputChange}
		accept="application/pdf"
		multiple
	/>
</div>

<style lang="scss">
	.upload-area {
		border: 2px solid var(--custom-color-brand);
		border-radius: 10px;
		padding: 0.8em;
		text-align: center;
		transition: background-color 0.3s;
		user-select: none;
		width: 70%;

		&:hover {
			background-color: var(--color-zinc-400);
		}

		.upload-icon {
			font-size: 1em;
			margin-bottom: 0.8em;
		}

		p {
			font-size: 0.8em;
		}

		input[type='file'] {
			display: none;
		}

		.file-list {
			display: flex;
			flex-flow: row wrap;
			align-items: center;
			justify-content: center;

			.file-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				width: 6em;
				gap: 6px;
				border: 2px dashed var(--color-black-900);
				border-radius: 8px;
				padding: 0.2em;
				margin: 0.2em;
				background-color: var(--color-white-900);

				span {
					font-size: 0.7em;
					max-width: 100%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: pre;
				}

				button {
					outline: none;
					border: none;
					background: none;
				}
			}
		}
	}
</style>
