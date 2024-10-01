<script lang="ts">
	let uploadArea: HTMLDivElement
	let fileInput: HTMLInputElement
	let fileList: HTMLDivElement

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
		if (event?.dataTransfer?.files) handleFiles(event?.dataTransfer?.files)
	}

	const fileInputChange = (event: Event) => {
		const input = event.target as HTMLInputElement
		if (input.files) {
			handleFiles(input.files)
		}
	}

	function getFileIcon(fileType: string) {
		if (fileType.startsWith('image/')) {
			return 'https://via.placeholder.com/24?text=📷' // Placeholder for image icon
		} else if (fileType.startsWith('video/')) {
			return 'https://via.placeholder.com/24?text=🎥' // Placeholder for video icon
		} else if (fileType.startsWith('audio/')) {
			return 'https://via.placeholder.com/24?text=🎵' // Placeholder for audio icon
		} else {
			return 'https://via.placeholder.com/24?text=📄' // Placeholder for other file types
		}
	}

	function handleFiles(files: FileList) {
		for (const file of files) {
			const fileItem = document.createElement('div')
			fileItem.classList.add('file-item')

			const fileIcon = document.createElement('img')
			fileIcon.classList.add('file-icon')
			fileIcon.src = getFileIcon(file.type)
			fileIcon.alt = file.name

			const fileName = document.createElement('span')
			fileName.textContent = file.name

			const removeButton = document.createElement('button')
			removeButton.classList.add('remove-button')
			removeButton.textContent = 'Remove'

			removeButton.onclick = (event) => {
				event.stopPropagation()
				fileList.removeChild(fileItem)
			}

			fileItem.appendChild(fileIcon)
			fileItem.appendChild(fileName)
			fileItem.appendChild(removeButton)
			fileList.appendChild(fileItem)
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="upload-area"
	class="upload-area"
	bind:this={uploadArea}
	on:dragover={uploadAreaDragOver}
	on:dragleave={uploadAreaDragLeave}
	on:drop={uploadAreaDrop}
>
	<div class="upload-icon">📤</div>
	<p>Drag & drop your files here or click to upload</p>
	<input type="file" id="file-input" multiple bind:this={fileInput} on:change={fileInputChange} />
	<div id="file-list" class="file-list" bind:this={fileList}></div>
</div>

<style lang="scss">
	.upload-area {
		border: 2px dashed #007bff;
		border-radius: 10px;
		padding: 20px;
		text-align: center;
		margin: 50px;
		transition: background-color 0.3s;

		.upload-area:hover {
			background-color: #f0f8ff;
		}

		.upload-icon {
			font-size: 50px;
			margin-bottom: 10px;
		}

		.file-list {
			margin-top: 20px;
		}

		.file-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 5px 0;
		}

		.file-icon {
			width: 24px;
			height: 24px;
			margin-right: 10px;
		}

		.remove-button {
			background-color: #ff4d4d;
			color: white;
			border: none;
			border-radius: 5px;
			padding: 5px 10px;
			cursor: pointer;
		}

		.remove-button:hover {
			background-color: #ff1a1a;
		}
	}
</style>
