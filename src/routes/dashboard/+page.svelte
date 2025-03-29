<script lang="ts">
	import { browser } from '$app/environment'
	import DashboardHome from '$lib/components/dashboard/DashboardHome.svelte'

	import { onMount } from 'svelte'
	import { toast } from 'svelte-sonner'

	let { data } = $props<{
		data: {
			toastMessage: string | undefined
			userPermission: 'STUDENT' | 'EVALUATOR' | 'ADMIN'
		}
	}>()
	const { userPermission, user } = data

	$effect(() => {
		if (data.toastMessage) {
			toast.success(data.toastMessage)
		}
	})

	onMount(() => {
		if (user && browser) {
			window.$chatwoot.setUser(user.id, {
				email: user.email,
				name: user.user_metadata.full_name,
				avatar_url: user.user_metadata.avatar_url,
				phone_number: user.phone
			})
		}
	})
</script>

<DashboardHome {userPermission} />
