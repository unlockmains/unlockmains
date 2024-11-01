<script lang="ts">
	import { Grid, PrelineTheme } from '@mediakular/gridcraft'
	export let data
	$: ({ submissions } = data)
	console.log(submissions)
	let theme = PrelineTheme
	let columns = [
		{
			key: 'name',
			title: 'Name'
		},
		{
			key: 'noOfQuestions',
			title: 'No. of Questions'
		},
		{
			key: 'questionType',
			title: 'Question Type'
		},
		{
			key: 'status',
			title: 'Status'
		},
		{
			key: 'submissionDate',
			title: 'Submission Date'
		}
	]
</script>

<div>
	<h1>Submissions</h1>
	<!-- {#each submissions as submission}
		<div>{submission.name}</div>
	{/each} -->
	<Grid bind:data={submissions} bind:columns {theme} />
</div>

<style lang="scss">
</style>
