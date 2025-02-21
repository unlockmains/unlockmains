<script lang="ts">
	import type { IUser } from '$lib/types'
	import { getContext } from 'svelte'
	import UserAvatarIcon from '../icons/UserAvatarIcon.svelte'
	import DashboardRecentAssignments from './DashboardRecentAssignments.svelte'
	import DashboardRecentEvaluations from './DashboardRecentEvaluations.svelte'
	import type { Writable } from 'svelte/store'

	let { userPermission } = $props<{
		userPermission: 'STUDENT' | 'EVALUATOR' | 'ADMIN'
	}>()
	const userStore = getContext<Writable<IUser>>('userStore')
</script>

<div class="dashboard-container">
	<div class="dashboard-left">
		<div class="greeting">
			<h2>Hello, {$userStore?.name} 👋</h2>
			<h6>Nice to have you back, exciting day ahead!</h6>
		</div>
		{#if userPermission === 'STUDENT'}
			<DashboardRecentEvaluations />
		{:else if userPermission === 'EVALUATOR'}
			<DashboardRecentAssignments />
		{/if}
	</div>
	<div class="dashboard-right">
		<div class="profile-card">
			<div class="profile-image">
				<UserAvatarIcon color="#707070" width="3em" height="3em" />
			</div>
			<div class="profile-details">
				<h4>Profile Details</h4>
				<p>Name: {$userStore?.name}</p>
				<p>Email: {$userStore?.email}</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.dashboard-container {
		display: flex;
		flex-flow: row;
		width: 100%;
		height: 100%;

		.dashboard-left {
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
			width: 100%;
			height: 100vh;
			background-color: var(--color-zinc-300);
			box-shadow: inset 0px 0px 4px 8px rgba(0, 0, 0, 0.2);

			.profile-card {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 1em;
				border: 1px solid var(--color-zinc-400);
				border-radius: var(--custom-border-radius);
			}
		}

		@media only screen and (max-width: 768px) {
			flex-direction: column;

			.dashboard-left,
			.dashboard-right {
				height: 100%;
			}
		}
	}
</style>
