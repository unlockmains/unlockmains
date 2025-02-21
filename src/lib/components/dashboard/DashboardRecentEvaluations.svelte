<script lang="ts">
	import type { IRecentEvaluation } from '$lib/types'
	import { onDestroy, onMount } from 'svelte'
	import Button from '../atoms/Button.svelte'
	import SkeletonLoading from '../atoms/SkeletonLoading.svelte'
	import PdfIcon from '../icons/PDFIcon.svelte'
	import { convertISODateToDate } from '$lib/api/utils'
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'

	let loading = $state(false)
	let evaluations = $state<IRecentEvaluation[]>([])

	let eventSource: EventSource
	let connectionStatus = 'Disconnected'

	onMount(async () => {
		loading = true
		setupEventSource()
		const response = await fetch('/api/recent-evaluation')
		if (response.ok) {
			const data = await response.json()
			evaluations = data
			loading = false
		}
	})

	function setupEventSource() {
		eventSource = new EventSource('/api/recent-evaluation-sse')

		eventSource.onopen = () => {
			connectionStatus = 'Connected'
		}

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data)
				if (data.connected) {
					return
				}
				evaluations = data
			} catch (error) {
				console.error('Error parsing event data:', error)
			}
		}

		eventSource.onerror = (error) => {
			console.error('SSE Error:', error)
			connectionStatus = 'Error - Reconnecting...'
			eventSource.close()
			setTimeout(setupEventSource, 5000)
		}
	}

	onDestroy(() => {
		if (eventSource) {
			eventSource.close()
		}
	})
</script>

<div class="dashboard-recent-evaluations">
	<div class="header">
		<h4>Recent Evaluations</h4>
		<Button type="link" label="View All" onClick={() => goto('/dashboard/submissions')} />
	</div>
	<div class="recent-evaluations">
		{#if loading}
			<div class="each-loading">
				{#each Array(3) as _}
					<SkeletonLoading height="10em" width="100%" />
				{/each}
			</div>
		{:else if evaluations.length === 0}
			<div class="each-evaluation">
				<div>No Evaluations received till now</div>
			</div>
		{:else}
			{#each evaluations as evaluation}
				<a
					href={`/dashboard/view-evaluation/${evaluation.$id}`}
					onclick={() =>
						browser && localStorage.setItem('view-evaluation', JSON.stringify(evaluation))}
					class="each-evaluation"
				>
					<PdfIcon color="#414040" />
					<div class="date">
						<span>Evaluation Completed</span>
						{convertISODateToDate(evaluation.evaluations[0].evaluation_start)}
					</div>
					<div class="date">
						<span>Questions Evaluated</span>
						{evaluation.total_questions}
					</div>
					<div class="date">
						<span>Questions Type</span>
						{evaluation.question_type_lvl1}
					</div>
					{#if evaluation.question_type_lvl2}
						<div class="date">
							<span>Questions Type in GS</span>
							{evaluation.question_type_lvl2}
						</div>
					{/if}
				</a>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.dashboard-recent-evaluations {
		.header {
			display: flex;
			flex-flow: row;
			align-items: center;
			justify-content: space-between;
		}
		.recent-evaluations {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1em;

			.each-evaluation {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				background-color: var(--color-yellow-100);
				min-height: 14em;
				border-radius: 1em;
				font-size: 0.8em;
				gap: 0.5em;
				width: 33%;
				text-decoration: none;
				color: var(--color-zinc-800);
				padding: 0.3em;
				box-shadow: 0 6px rgba(0, 0, 0);
				border: 1px solid;

				.date {
					font-size: 0.8em;
				}

				&:hover {
					background-color: var(--color-yellow-500);
				}
			}

			.each-loading {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				min-height: 14em;
				border-radius: 1em;
				font-size: 0.8em;
				gap: 0.5em;
				width: 100%;
			}
		}
	}
</style>
