<script lang="ts">
	import DashboardHome from '$lib/components/dashboard/DashboardHome.svelte'
	import { toast } from 'svelte-sonner'

	let { data } = $props<{
		data: {
			toastMessage: string | undefined
			userPermission: 'STUDENT' | 'EVALUATOR' | 'ADMIN'
			user: { name: string; email: string; photo: string }
		}
	}>()
	const { userPermission, user } = data

	$effect(() => {
		if (data.toastMessage) {
			toast.success(data.toastMessage)
		}
	})
</script>

<DashboardHome {userPermission} {user} />
