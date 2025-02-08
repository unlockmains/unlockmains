<script lang="ts">
	import Button from '../atoms/Button.svelte'
	import PdfIcon from '../icons/PDFIcon.svelte'
	const mockEvaluations = [
		{
			id: 1,
			fileName: 'evaluation-1.pdf',
			evaluatedAt: '2023-01-01 12:00:00'
		},
		{
			id: 2,
			fileName: 'evaluation-2.pdf',
			evaluatedAt: '2023-01-02 12:00:00'
		},
		{
			id: 3,
			fileName: 'evaluation-3.pdf',
			evaluatedAt: '2023-01-03 12:00:00'
		}
	]

	const getRecentEvaluations = async () => {
		const response = await fetch('/api/recent-evaluation')
		if (response.ok) {
			const data = await response.json()
			console.log(data)
		}
	}

	$effect(() => {
		getRecentEvaluations()
	})
</script>

<div class="dashboard-recent-evaluations">
	<div class="header">
		<h4>Dashboard Recent Evaluations</h4>
		<Button type="link" label="View All" />
	</div>
	<div class="recent-evaluations">
		{#each mockEvaluations as evaluation}
			<div class="each-evaluation">
				<PdfIcon />
				<div class="file-name">{evaluation.fileName}</div>
				<div class="date">{evaluation.evaluatedAt}</div>
				<Button type="link" label="View" />
			</div>
		{/each}
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
				background-color: var(--color-zinc-300);
				min-height: 10em;
				border-radius: 1em;
				font-size: 0.8em;
				gap: 0.5em;
				width: 100%;

				.file-name,
				.date {
					font-size: 0.8em;
				}
			}
		}
	}
</style>
