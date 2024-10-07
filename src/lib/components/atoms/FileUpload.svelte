<script lang="ts">
	import BinIcon from '../icons/BinIcon.svelte'
	import ImageIcon from '../icons/ImageIcon.svelte'
	import PdfIcon from '../icons/PDFIcon.svelte'
	import UploadIcon from '../icons/UploadIcon.svelte'

	let uploadArea: HTMLDivElement
	let fileInput: HTMLInputElement
	export let name: string = '';

	let files: File[] = []

	const uploadAreaDragOver = (event: DragEvent) => {
		event.preventDefault()
		uploadArea.classList.add('hover')
	}

	const uploadAreaDragLeave = (event: DragEvent) => {
		event.preventDefault()
		uploadArea.classList.remove('hover')
	}

	const uploadAreaDrop = (event: DragEvent) => {
		event.preventDefault()
		uploadArea.classList.remove('hover')
		if (event?.dataTransfer?.files) files = [...files, ...Object.values(event?.dataTransfer?.files)]
	}

	const fileInputChange = (event: Event) => {
		const input = event.target as HTMLInputElement
		if (input.files) {
			files = [...files, ...Object.values(input.files)]
		}
	}

	const removeFile = (fileToRemove: File) => {
		files = files.filter((file) => file.name !== fileToRemove.name)
	}

	// const testFileData = async () => {
	// 	console.log('files', files)
	// 	const reader = new FileReader()
	// 	reader.readAsDataURL(files[0])
	// 	reader.onload = function () {
	// 		console.log(reader.result)
	// 	}
	// 	reader.onerror = function (error) {
	// 		console.log('Error: ', error)
	// 	}
	// }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="upload-area"
	class="upload-area"
	bind:this={uploadArea}
	on:dragover={uploadAreaDragOver}
	on:dragleave={uploadAreaDragLeave}
	on:drop={uploadAreaDrop}
	on:click={() => fileInput.click()}
>
	<div class="upload-icon"><UploadIcon /></div>
	<p>Drag & drop your file here or click to upload!</p>
	<!-- multiple and image/png, image/jpeg, application/pdf -->
	<input
		type="file"
		id="file-input"
		{name}
		bind:this={fileInput}
		on:change={fileInputChange}
		accept="application/pdf"
	/>
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
</div>

<style lang="scss">
	.upload-area {
		border: 2px dashed var(--custom-color-brand);
		border-radius: 10px;
		padding: 0.8em;
		text-align: center;
		transition: background-color 0.3s;
		user-select: none;

		&:hover {
			background-color: var(--color-gold-400);
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
			justify-content: flex-start;

			.file-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				width: 6em;
				gap: 6px;
				border: 2px dashed black;
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
