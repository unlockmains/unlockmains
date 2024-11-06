<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import * as pdfjsLib from 'pdfjs-dist'
	import {
		Canvas,
		Point,
		Rect,
		Circle,
		Line,
		Triangle,
		IText,
		PencilBrush,
		Group,
		Path
	} from 'fabric'
	import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
	import { writable } from 'svelte/store'
	import type { IAnnotation, IPageAnnotations } from '$lib/types'
	import PDFAnnotateIcons from '../icons/PDFAnnotateIcons.svelte'

	export let pdfUrl: string
	export let initialScale = 1.0
	export let maxScale = 3.0
	export let minScale = 0.5
	export let onSave: (annotations: IPageAnnotations) => Promise<void> | undefined
	export let savedAnnotations: IPageAnnotations

	let pdfCanvas: HTMLCanvasElement
	let canvas: HTMLCanvasElement
	let fabricCanvas: Canvas
	let currentPage = 1
	let numPages = 0
	let currentPDF: PDFDocumentProxy | null = null
	let isLoading = true
	let error: string | null = null
	let scale = initialScale

	const annotationsStore = writable<IPageAnnotations>({})

	const toolState = writable({
		currentTool: 'select',
		currentColor: '#ff0000',
		isDrawing: false,
		activeShape: null as any,
		startPoint: { x: 0, y: 0 } as Point
	})

	pdfjsLib.GlobalWorkerOptions.workerSrc = '/lib/pdf.worker.min.mjs'

	onMount(async () => {
		if (savedAnnotations) {
			annotationsStore.set(savedAnnotations)
		}
	})

	onMount(async () => {
		try {
			fabricCanvas = new Canvas(canvas, {
				isDrawingMode: false,
				selection: true,
				backgroundColor: 'transparent'
			})

			fabricCanvas.on('mouse:down', handleMouseDown)
			fabricCanvas.on('mouse:move', handleMouseMove)
			fabricCanvas.on('mouse:up', handleMouseUp)
			fabricCanvas.on('selection:created', handleSelection)

			fabricCanvas.on('object:modified', saveCurrentPageAnnotations)
			fabricCanvas.on('object:added', saveCurrentPageAnnotations)
			fabricCanvas.on('object:removed', saveCurrentPageAnnotations)

			await loadPDF(pdfUrl)
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to initialize PDF viewer'
		}
	})

	onDestroy(() => {
		if (fabricCanvas) {
			fabricCanvas.dispose()
		}
		if (currentPDF) {
			currentPDF.destroy()
		}
	})

	async function loadPDF(url: string) {
		try {
			isLoading = true
			error = null

			currentPDF = await pdfjsLib.getDocument(url).promise
			numPages = currentPDF.numPages

			await renderPage(currentPage)
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load PDF'
		} finally {
			isLoading = false
		}
	}

	function serializeFabricObject(obj: any): IAnnotation {
		const json = obj.toObject()
		return {
			type: obj.type,
			data: json
		}
	}

	function deserializeFabricObject(annotation: IAnnotation): Promise<any> {
		return new Promise((resolve) => {
			switch (annotation.type) {
				case 'rect':
					resolve(new Rect(annotation.data as any))
					break
				case 'circle':
					resolve(new Circle(annotation.data as any))
					break
				case 'path':
					resolve(new Path(annotation.data.path as any, annotation.data as any))
					break
				case 'line':
					resolve(
						new Line(
							[annotation.data.x1, annotation.data.y1, annotation.data.x2, annotation.data.y2],
							annotation.data as any
						)
					)
					break
				case 'triangle':
					resolve(new Triangle(annotation.data as any))
					break
				case 'group':
					if (annotation.data.objects) {
						const shapes = annotation.data.objects.map((obj: any) =>
							deserializeFabricObject({ type: obj.type.toLowerCase(), data: obj })
						)
						console.log(shapes, annotation.data)
						Promise.all(shapes).then((objects) => {
							resolve(
								new Group(objects, {
									left: annotation.data.left,
									top: annotation.data.top,
									originX: 'center',
									originY: 'center',
									angle: annotation.data.angle
								})
							)
						})
					}
					break
				case 'i-text':
					resolve(
						new IText(annotation.data.text, {
							left: annotation.data.left,
							top: annotation.data.top,
							fontFamily: 'Arial',
							fill: annotation.data.fill,
							fontSize: annotation.data.fontSize,
							angle: annotation.data.angle
						})
					)
					break
				default:
					resolve(null)
			}
		})
	}

	async function saveCurrentPageAnnotations() {
		const objects = fabricCanvas.getObjects()
		const serializedObjects = objects.map(serializeFabricObject)

		annotationsStore.update((store) => ({
			...store,
			[currentPage]: serializedObjects
		}))

		if (onSave) {
			let currentStore: IPageAnnotations
			annotationsStore.subscribe(async (value) => {
				currentStore = value
				await onSave(currentStore)
			})()
		}
	}

	async function loadPageAnnotations(pageNumber: number) {
		let annotations: IAnnotation[] = []
		annotationsStore.subscribe((store) => {
			annotations = store[pageNumber] || []
		})()

		fabricCanvas.clear()

		for (const annotation of annotations) {
			const obj = await deserializeFabricObject(annotation)
			if (obj) {
				fabricCanvas.add(obj)
			}
		}

		fabricCanvas.requestRenderAll()
	}

	async function renderPage(pageNumber: number) {
		if (!currentPDF) return

		try {
			isLoading = true
			const page = await currentPDF.getPage(pageNumber)
			const viewport = page.getViewport({ scale })

			const dimensions = {
				width: viewport.width,
				height: viewport.height
			}

			pdfCanvas.width = dimensions.width
			pdfCanvas.height = dimensions.height
			canvas.width = dimensions.width
			canvas.height = dimensions.height
			fabricCanvas.setDimensions(dimensions)

			const renderContext = {
				canvasContext: pdfCanvas.getContext('2d') as CanvasRenderingContext2D,
				viewport
			}

			await page.render(renderContext).promise
			await loadPageAnnotations(pageNumber)
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to render page'
		} finally {
			isLoading = false
		}
	}

	function setTool(tool: string) {
		toolState.update((state) => {
			if (state.isDrawing) {
				cancelDrawing()
			}

			const newState = {
				...state,
				currentTool: tool
			}

			fabricCanvas.isDrawingMode = tool === 'freehand'
			if (tool === 'freehand') {
				const brush = new PencilBrush(fabricCanvas)
				brush.color = state.currentColor
				brush.width = 2
				fabricCanvas.freeDrawingBrush = brush
			}

			return newState
		})
	}

	function setColor(color: string) {
		toolState.update((state) => {
			const newState = {
				...state,
				currentColor: color
			}
			fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas)
			if (fabricCanvas.isDrawingMode) {
				fabricCanvas.freeDrawingBrush.color = color
			}

			return newState
		})
	}

	function handleMouseDown(event: any) {
		let state = { currentTool: $toolState.currentTool, currentColor: $toolState.currentColor }
		toolState.update((s) => {
			state = s
			return s
		})

		if (state.currentTool === 'select') return

		const pointer = fabricCanvas.getViewportPoint(event.e)

		if (state.currentTool === 'text') {
			addTextAnnotation(pointer)
			return
		}

		toolState.update((s) => ({
			...s,
			isDrawing: true,
			startPoint: pointer,
			activeShape: null
		}))
	}

	function handleMouseMove(event: any) {
		let state = {
			currentTool: $toolState.currentTool,
			currentColor: $toolState.currentColor,
			isDrawing: $toolState.isDrawing,
			startPoint: $toolState.startPoint,
			activeShape: $toolState.activeShape
		}
		toolState.update((s) => {
			state = s
			return s
		})

		if (!state.isDrawing) return

		const pointer = fabricCanvas.getViewportPoint(event.e)

		switch (state.currentTool) {
			case 'rectangle':
				updateRectangle(state.startPoint, pointer, state.currentColor)
				break
			case 'circle':
				updateCircle(state.startPoint, pointer, state.currentColor)
				break
			case 'arrow':
				updateArrow(state.startPoint, pointer, state.currentColor)
				break
		}
	}

	function handleMouseUp() {
		toolState.update((state) => ({
			...state,
			isDrawing: false,
			activeShape: null,
			currentTool: 'select'
		}))
	}

	function handleSelection(e: any) {
		if (e.selected?.[0] instanceof IText) {
			setTool('select')
		}
		console.log('select', e)
	}

	function cancelDrawing() {
		let state = {
			currentTool: $toolState.currentTool,
			currentColor: $toolState.currentColor,
			isDrawing: $toolState.isDrawing,
			startPoint: $toolState.startPoint,
			activeShape: $toolState.activeShape
		}
		toolState.update((s) => {
			state = s
			return s
		})

		if (state.activeShape) {
			fabricCanvas.remove(state.activeShape)
			fabricCanvas.requestRenderAll()
		}

		toolState.update((s) => ({
			...s,
			isDrawing: false,
			activeShape: null
		}))
	}

	function updateRectangle(start: Point, end: Point, color: string) {
		let state = {
			currentTool: $toolState.currentTool,
			currentColor: $toolState.currentColor,
			isDrawing: $toolState.isDrawing,
			startPoint: $toolState.startPoint,
			activeShape: $toolState.activeShape
		}
		toolState.update((s) => {
			state = s
			return s
		})

		if (!state.activeShape) {
			const rect = new Rect({
				left: Math.min(start.x, end.x),
				top: Math.min(start.y, end.y),
				width: Math.abs(end.x - start.x),
				height: Math.abs(end.y - start.y),
				fill: 'transparent',
				stroke: color,
				strokeWidth: 2
			})

			fabricCanvas.add(rect)
			toolState.update((s) => ({ ...s, activeShape: rect }))
		} else {
			state.activeShape.set({
				left: Math.min(start.x, end.x),
				top: Math.min(start.y, end.y),
				width: Math.abs(end.x - start.x),
				height: Math.abs(end.y - start.y)
			})
		}

		fabricCanvas.requestRenderAll()
	}

	function updateCircle(start: Point, end: Point, color: string) {
		let state = {
			activeShape: $toolState.activeShape
		}
		toolState.update((s) => {
			state = s
			return s
		})

		const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)) / 2
		const centerX = (start.x + end.x) / 2
		const centerY = (start.y + end.y) / 2

		if (!state.activeShape) {
			const circle = new Circle({
				left: centerX - radius,
				top: centerY - radius,
				radius: radius,
				fill: 'transparent',
				stroke: color,
				strokeWidth: 2,
				originX: 'center',
				originY: 'center'
			})

			fabricCanvas.add(circle)
			toolState.update((s) => ({ ...s, activeShape: circle }))
		} else {
			state.activeShape.set({
				left: centerX,
				top: centerY,
				radius: radius
			})
		}

		fabricCanvas.requestRenderAll()
	}

	function updateArrow(start: Point, end: Point, color: string) {
		let state = {
			activeShape: $toolState.activeShape
		}
		toolState.update((s) => {
			state = s
			return s
		})

		if (state.activeShape) {
			fabricCanvas.remove(state.activeShape)
		}

		const deltaX = end.x - start.x
		const deltaY = end.y - start.y
		const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

		const line = new Line([start.x, start.y, end.x, end.y], {
			stroke: color,
			strokeWidth: 2
		})

		const headLength = 15

		const arrowHead = new Triangle({
			width: headLength * 2,
			height: headLength,
			fill: color,
			left: end.x,
			top: end.y,
			angle: angle + 90,
			originX: 'center',
			originY: 'center'
		})

		const arrow = new Group([line, arrowHead], {
			left: start.x,
			top: start.y,
			originX: start.x < end.x ? 'left' : 'right',
			originY: start.y < end.y ? 'top' : 'bottom'
		})

		fabricCanvas.add(arrow)
		toolState.update((s) => ({ ...s, activeShape: arrow }))
		fabricCanvas.requestRenderAll()
	}

	function addTextAnnotation(pointer: Point) {
		let state = {
			currentTool: $toolState.currentTool,
			currentColor: $toolState.currentColor,
			isDrawing: $toolState.isDrawing,
			startPoint: $toolState.startPoint,
			activeShape: $toolState.activeShape
		}
		toolState.update((s) => {
			state = s
			return s
		})

		const text = new IText('Enter text', {
			left: pointer.x,
			top: pointer.y,
			fontFamily: 'Arial',
			fill: state.currentColor,
			fontSize: 16
		})

		fabricCanvas.add(text)
		fabricCanvas.setActiveObject(text)
		text.enterEditing()
		text.selectAll()
	}

	function changeScale(newScale: number) {
		scale = Math.max(minScale, Math.min(maxScale, newScale))
		renderPage(currentPage)
	}

	async function nextPage() {
		if (currentPage < numPages) {
			await saveCurrentPageAnnotations()
			currentPage++
			await renderPage(currentPage)
		}
	}

	async function prevPage() {
		if (currentPage > 1) {
			await saveCurrentPageAnnotations()
			currentPage--
			await renderPage(currentPage)
		}
	}

	// function exportAnnotations(): IPageAnnotations {
	// 	let annotations: IPageAnnotations
	// 	annotationsStore.subscribe((value) => {
	// 		annotations = value
	// 	})()
	// 	// return annotations
	// }

	async function importAnnotations(annotations: IPageAnnotations) {
		annotationsStore.set(annotations)
		await loadPageAnnotations(currentPage)
	}

	async function clearAnnotations() {
		fabricCanvas.clear()
		annotationsStore.update((store) => {
			const newStore = { ...store }
			delete newStore[currentPage]
			return newStore
		})
		await saveCurrentPageAnnotations()
	}

	function deleteSelectedObjects() {
		const activeObjects = fabricCanvas.getActiveObjects()
		if (activeObjects.length > 0) {
			activeObjects.forEach((obj) => {
				fabricCanvas.remove(obj)
			})
			fabricCanvas.discardActiveObject()
			fabricCanvas.requestRenderAll()
			saveCurrentPageAnnotations()
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			cancelDrawing()
		} else if (event.key === 'Delete' || event.key === 'Backspace') {
			const activeObject = fabricCanvas.getActiveObject()
			if (activeObject && !(activeObject instanceof IText && (activeObject as IText).isEditing)) {
				deleteSelectedObjects()
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="pdf-viewer">
	<!-- {#if error}
		<div class="error-message">
			{error}
		</div>
	{/if} -->

	<div class="toolbar">
		<div class="tool-group">
			<button
				class="tool-button"
				class:active={$toolState.currentTool === 'select'}
				on:click={() => setTool('select')}
			>
				<PDFAnnotateIcons name="hand" />
			</button>
			<button
				class="tool-button"
				class:active={$toolState.currentTool === 'rectangle'}
				on:click={() => setTool('rectangle')}
			>
				<PDFAnnotateIcons name="rect" />
			</button>
			<button
				class="tool-button"
				class:active={$toolState.currentTool === 'circle'}
				on:click={() => setTool('circle')}
			>
				<PDFAnnotateIcons name="circle" />
			</button>
			<button
				class="tool-button"
				class:active={$toolState.currentTool === 'arrow'}
				on:click={() => setTool('arrow')}
			>
				<PDFAnnotateIcons name="arrow" />
			</button>
			<button
				class="tool-button"
				class:active={$toolState.currentTool === 'freehand'}
				on:click={() => setTool('freehand')}
			>
				<PDFAnnotateIcons name="pencil" />
			</button>
			<button
				class="tool-button"
				class:active={$toolState.currentTool === 'text'}
				on:click={() => setTool('text')}
			>
				<PDFAnnotateIcons name="text" />
			</button>
			<button on:click={saveCurrentPageAnnotations}> <PDFAnnotateIcons name="save" /> </button>
		</div>

		<div class="color-picker">
			<input
				type="color"
				value={$toolState.currentColor}
				on:input={(e) => setColor(e.currentTarget.value)}
			/>
		</div>

		<div class="zoom-controls">
			<button on:click={() => changeScale(scale - 0.1)} disabled={scale <= minScale}
				><PDFAnnotateIcons name="zoom-out" /></button
			>
			<span>{(scale * 100).toFixed(0)}%</span>
			<button on:click={() => changeScale(scale + 0.1)} disabled={scale >= maxScale}
				><PDFAnnotateIcons name="zoom-in" /></button
			>
		</div>

		<button on:click={clearAnnotations}><PDFAnnotateIcons name="eraser" /></button>

		<div class="page-navigation">
			<button on:click={prevPage} disabled={currentPage === 1}
				><PDFAnnotateIcons name="prev" /></button
			>
			<span>{currentPage} / {numPages}</span>
			<button on:click={nextPage} disabled={currentPage === numPages}
				><PDFAnnotateIcons name="next" /></button
			>
		</div>
	</div>

	<div class="canvas-container" class:loading={isLoading}>
		{#if isLoading}
			<div class="loading-overlay">
				<span>Loading...</span>
			</div>
		{/if}
		<div class="canvas-wrapper">
			<canvas bind:this={pdfCanvas} class="pdf-canvas" />
			<canvas bind:this={canvas} class="annotation-canvas" />
		</div>
	</div>
</div>

<style lang="scss">
	.pdf-viewer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		height: 100%;

		button {
			padding: 0.5rem 1rem;
			cursor: pointer;
			transition: all 0.2s ease;
			outline: none;
			border: none;
			background: transparent;
		}

		button:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		button.active {
			background: #878787;
		}

		button.tool-button {
			cursor: pointer;
			transition: all 0.2s ease;
			outline: none;
			border: none;
			border-radius: 50%;
			height: 36px;
			width: 36px;
			background: transparent;
			display: grid;
			align-content: center;
			justify-content: center;
		}

		button.tool-button:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		button.tool-button.active {
			background: #f2c7c7;
		}
	}

	.toolbar {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 0.5rem;
		background: #f5f5f5;
		border-radius: 4px;
		flex-wrap: wrap;
	}

	.tool-group {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.canvas-container {
		position: relative;
		flex-grow: 1;
		border: 1px solid #ccc;
		overflow: auto;
		background: #f0f0f0;

		.canvas-wrapper {
			position: relative;
			width: fit-content;
			margin: 0 auto;

			.pdf-canvas {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.annotation-canvas {
				position: relative;
				z-index: 2;
			}
		}
	}

	.loading-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 3;
	}

	.page-navigation {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.zoom-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.color-picker {
		display: flex;
		align-items: center;
	}
</style>
