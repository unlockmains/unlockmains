<script lang="ts">
	import { onMount } from 'svelte'
	import * as pdfjsLib from 'pdfjs-dist'
	import { Canvas, Point, Rect, Circle, Line, Triangle, IText, PencilBrush, Group } from 'fabric'
	import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'

	let pdfCanvas: HTMLCanvasElement
	let canvas: HTMLCanvasElement
	let fabricCanvas: Canvas
	let currentPage = 1
	let numPages = 0
	let currentTool = 'select'
	let currentColor = '#ff0000'
	let currentPDF: PDFDocumentProxy = {} as PDFDocumentProxy
	export let pdfUrl: string
	let activeShape: Rect | Circle | Line | Triangle | Group | null = null

	// Initialize PDF.js worker
	pdfjsLib.GlobalWorkerOptions.workerSrc = '/lib/pdf.worker.min.mjs'

	onMount(async () => {
		fabricCanvas = new Canvas(canvas, {
			isDrawingMode: false
		})

		fabricCanvas.backgroundColor = 'transparent'

		fabricCanvas.on('mouse:down', handleMouseDown)
		fabricCanvas.on('mouse:move', handleMouseMove)
		fabricCanvas.on('mouse:up', handleMouseUp)

		fabricCanvas.on('selection:created', function (e) {
			if (e.selected[0] instanceof IText) {
				currentTool = 'select'
			}
		})
	})

	onMount(async () => {
		await loadPDF(pdfUrl)
	})

	async function loadPDF(pdfUrl: string) {
		currentPDF = await pdfjsLib.getDocument(pdfUrl).promise
		numPages = currentPDF.numPages
		renderPage(currentPage)
	}

	async function renderPage(pageNumber: number) {
		const page = await currentPDF?.getPage(pageNumber)
		const viewport = page.getViewport({ scale: 1.0 })
		if (viewport) {
			canvas.width = viewport.width
			canvas.height = viewport.height
			fabricCanvas.setDimensions({ width: viewport.width, height: viewport.height })
			pdfCanvas.width = viewport.width
			pdfCanvas.height = viewport.height
		}

		const renderContext = {
			canvasContext: canvas.getContext('2d') as CanvasRenderingContext2D,
			viewport: viewport
		}
		await page?.render(renderContext).promise
	}

	function setTool(tool: string) {
		currentTool = tool
		fabricCanvas.isDrawingMode = tool === 'freehand'
		fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas)
		fabricCanvas.freeDrawingBrush.color = currentColor
		fabricCanvas.freeDrawingBrush.width = 2

		if (tool === 'freehand') {
			fabricCanvas.freeDrawingBrush.color = currentColor
			fabricCanvas.freeDrawingBrush.width = 2
		}
	}

	function setColor(color: string) {
		currentColor = color
		fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas)
		if (fabricCanvas.isDrawingMode) {
			fabricCanvas.freeDrawingBrush.color = color
		}
	}

	let isDrawing = false
	let startPoint: Point = { x: 0, y: 0 } as Point

	function handleMouseDown(event: any) {
		if (currentTool === 'select') return

		const pointer = fabricCanvas.getViewportPoint(event.e)

		if (currentTool === 'text') {
			addTextAnnotation(pointer)
			return
		}

		isDrawing = true
		activeShape = null
		startPoint = pointer
	}

	function handleMouseMove(event: any) {
		if (!isDrawing) return

		const pointer = fabricCanvas.getViewportPoint(event.e)

		switch (currentTool) {
			case 'rectangle':
				updateRectangle(startPoint, pointer)
				break
			case 'circle':
				updateCircle(startPoint, pointer)
				break
			case 'arrow':
				updateArrow(startPoint, pointer)
				break
		}
	}

	function handleMouseUp() {
		isDrawing = false
		activeShape = null
	}

	function drawRectangle(start: Point, end: Point) {
		console.log(start, end)
		activeShape = new Rect({
			left: Math.min(start.x, end.x),
			top: Math.min(start.y, end.y),
			width: Math.abs(end.x - start.x),
			height: Math.abs(end.y - start.y),
			fill: 'transparent',
			stroke: currentColor,
			strokeWidth: 2
		})

		fabricCanvas.add(activeShape)
	}

	function updateRectangle(start: Point, end: Point) {
		if (!activeShape) {
			drawRectangle(start, end)
			return
		}

		activeShape.set({
			left: Math.min(start.x, end.x),
			top: Math.min(start.y, end.y),
			width: Math.abs(end.x - start.x),
			height: Math.abs(end.y - start.y)
		})

		fabricCanvas.renderAll()
	}

	function drawCircle(start: Point, end: Point) {
		const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)) / 2

		activeShape = new Circle({
			left: start.x,
			top: start.y,
			radius: radius,
			fill: 'transparent',
			stroke: currentColor,
			strokeWidth: 2
		})

		fabricCanvas.add(activeShape)
	}

	function updateCircle(start: Point, end: Point) {
		if (!activeShape) {
			drawCircle(start, end)
			return
		}

		const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)) / 2

		if (activeShape instanceof Circle) {
			activeShape.set({
				radius: radius
			})
		}

		fabricCanvas.renderAll()
	}

	function drawArrow(start: Point, end: Point) {
		const group = new Group([], {
			left: start.x,
			top: start.y
		})

		const deltaX = end.x - start.x
		const deltaY = end.y - start.y
		const angle = Math.atan2(deltaY, deltaX)

		const line = new Line([start.x, start.y, end.x, end.y], {
			stroke: currentColor,
			strokeWidth: 2
		})

		const arrowHead = new Triangle({
			left: end.x,
			top: end.y,
			pointType: 'arrow_start',
			angle: angle * (180 / Math.PI),
			width: 20,
			height: 20,
			fill: currentColor
		})

		group.add(line as any)
		group.add(arrowHead as any)
		activeShape = group

		fabricCanvas.add(group as any)
	}

	function updateArrow(start: Point, end: Point) {
		if (!activeShape) {
			drawArrow(start, end)
			return
		}

		fabricCanvas.remove(activeShape as any)
		drawArrow(start, end)
	}

	function addTextAnnotation(pointer: Point) {
		const text = new IText('Enter text', {
			left: pointer.x,
			top: pointer.y,
			fontFamily: 'Arial',
			fill: currentColor,
			fontSize: 16
		})

		fabricCanvas.add(text)
		fabricCanvas.setActiveObject(text)
		text.enterEditing()
		text.selectAll()
	}

	function clearAnnotations() {
		fabricCanvas.clear()
		renderPage(currentPage)
	}

	async function nextPage() {
		if (currentPage < numPages) {
			currentPage++
			await renderPage(currentPage)
		}
	}

	async function prevPage() {
		if (currentPage > 1) {
			currentPage--
			await renderPage(currentPage)
		}
	}
</script>

<div class="pdf-viewer">
	<div class="toolbar">
		<div class="tool-group">
			<button class:active={currentTool === 'select'} on:click={() => setTool('select')}>
				Select
			</button>
			<button class:active={currentTool === 'rectangle'} on:click={() => setTool('rectangle')}>
				Rectangle
			</button>
			<button class:active={currentTool === 'circle'} on:click={() => setTool('circle')}>
				Circle
			</button>
			<button class:active={currentTool === 'arrow'} on:click={() => setTool('arrow')}>
				Arrow
			</button>
			<button class:active={currentTool === 'freehand'} on:click={() => setTool('freehand')}>
				Freehand
			</button>
			<button class:active={currentTool === 'text'} on:click={() => setTool('text')}> Text </button>
		</div>

		<input
			type="color"
			bind:value={currentColor}
			on:input={(e) => setColor(e.currentTarget.value)}
		/>

		<button on:click={clearAnnotations}>Clear</button>

		<div class="page-navigation">
			<button on:click={prevPage} disabled={currentPage === 1}>Previous</button>
			<span>{currentPage} / {numPages}</span>
			<button on:click={nextPage} disabled={currentPage === numPages}>Next</button>
		</div>
	</div>

	<div class="canvas-container">
		<div class="canvas-wrapper">
			<canvas bind:this={pdfCanvas} class="pdf-canvas" />
			<canvas bind:this={canvas} class="annotation-canvas" />
		</div>
	</div>
</div>

<style>
	.pdf-viewer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	.toolbar {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 0.5rem;
		background: #f5f5f5;
		border-radius: 4px;
	}

	.tool-group {
		display: flex;
		gap: 0.5rem;
	}

	button {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		background: white;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	button.active {
		background: #007bff;
		color: white;
		border-color: #0056b3;
	}

	.canvas-container {
		border: 1px solid #ccc;
		overflow: auto;
		max-width: 100%;
		margin: 0 auto;
	}

	.canvas-wrapper {
		position: relative;
		width: fit-content;
	}

	.pdf-canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.annotation-canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.page-navigation {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
