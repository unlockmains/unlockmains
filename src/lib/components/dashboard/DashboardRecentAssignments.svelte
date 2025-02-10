<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import type { IRecentAssignments } from '$lib/types'
	import Button from '../atoms/Button.svelte'
	import SkeletonLoading from '../atoms/SkeletonLoading.svelte'
	import PdfIcon from '../icons/PDFIcon.svelte'

	let loading = $state(false)
	let assignments = $state<IRecentAssignments[]>([])

	const getRecentAssignments = async () => {
		loading = true
		const response = await fetch('/api/recent-assignments')
		if (response.ok) {
			assignments = await response.json()
			browser && localStorage.setItem('recentAssignments', JSON.stringify(assignments))
			loading = false
		}
	}

	$effect(() => {
		if (browser && !localStorage.getItem('recentAssignments')) {
			getRecentAssignments()
		} else {
			assignments = JSON.parse(localStorage.getItem('recentAssignments') as string)
		}
	})
</script>

<div class="dashboard-recent-Assignments">
	<div class="header">
		<h4>Recent Assignments</h4>
		<Button type="link" label="View All" />
	</div>
	<div class="recent-Assignments">
		{#if loading}
			<div class="each-loading">
				{#each Array(3) as _}
					<SkeletonLoading height="10em" width="100%" />
				{/each}
			</div>
		{:else if assignments.length === 0}
			<div class="each-Assignments">
				<div>No New Assignments received</div>
			</div>
		{:else}
			{#each assignments as assignment}
				<div class="each-Assignments">
					<PdfIcon />
					<div class="date">{assignment.assignment_date}</div>
					<Button
						type="link"
						label="View"
						onClick={() => goto(`/dashboard/evaluate/${assignment.$id}`)}
					/>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.dashboard-recent-Assignments {
		.header {
			display: flex;
			flex-flow: row;
			align-items: center;
			justify-content: space-between;
		}
		.recent-Assignments {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1em;

			.each-Assignments {
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
