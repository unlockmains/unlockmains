<script lang="ts">
	import type { IRecentEvaluation } from '$lib/types'
	import { onMount } from 'svelte'
	import Button from '../atoms/Button.svelte'
	import SkeletonLoading from '../atoms/SkeletonLoading.svelte'
	import PdfIcon from '../icons/PDFIcon.svelte'

	let loading = $state(false)
	let evaluations = $state<IRecentEvaluation[]>([])

	const getRecentEvaluations = async () => {
		loading = true
		const response = await fetch('/api/recent-evaluation')
		if (response.ok) {
			evaluations = await response.json()
			loading = false
		}
	}

	onMount(() => {
		getRecentEvaluations()
	})
</script>

<div class="dashboard-recent-evaluations">
	<div class="header">
		<h4>Recent Evaluations</h4>
		<Button type="link" label="View All" />
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
				<div class="each-evaluation">
					<PdfIcon />
					<div class="date">{evaluation.$updatedAt}</div>
					<Button type="link" label="View" />
				</div>
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
				justify-content: center;
				background-color: var(--color-yellow-100);
				min-height: 10em;
				border-radius: 1em;
				font-size: 0.8em;
				gap: 0.5em;
				width: 100%;

				.date {
					font-size: 0.8em;
				}
			}

			.each-loading {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				min-height: 10em;
				border-radius: 1em;
				font-size: 0.8em;
				gap: 0.5em;
				width: 100%;
			}
		}
	}
</style>
