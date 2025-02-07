<script lang="ts">
	import DashboardRecentAssignments from './DashboardRecentAssignments.svelte'
	import DashboardRecentEvaluations from './DashboardRecentEvaluations.svelte'

	let { userPermission, user } = $props<{
		userPermission: 'STUDENT' | 'EVALUATOR' | 'ADMIN'
		user: { name: string; email: string; photo: string }
	}>()

	$effect(() => {
		console.log(userPermission, user)
	})
</script>

<div class="dashboard-left">
	<div class="greeting">
		<h2>Hello, {user.name}</h2>
		<h6>Nice to have you back, exciting day ahead!</h6>
	</div>
	{#if userPermission === 'STUDENT'}
		<DashboardRecentEvaluations />
	{:else if userPermission === 'EVALUATOR'}
		<DashboardRecentAssignments />
	{/if}
</div>
<div class="dashboard-right"></div>

<style lang="scss">
	.dashboard-left {
		border: 1px solid red;
		width: 100%;
		height: 100vh;
		padding: 1em;

		.greeting {
			display: flex;
			flex-flow: column;
			h2 {
				font-size: 2em;
				font-weight: bold;
				margin: 0.3em 0;
			}
			h6 {
				font-size: 1em;
				font-weight: normal;
				margin: 0.3em 0;
			}
		}
	}

	.dashboard-right {
		border: 1px solid blue;
		width: 100%;
		height: 100vh;
		background-color: var(--color-zinc-300);
	}
</style>
