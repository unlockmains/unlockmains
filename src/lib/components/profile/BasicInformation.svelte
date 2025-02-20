<script lang="ts">
	import { enhance } from '$app/forms'
	import type { IUser } from '$lib/types'
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit'
	import Button from '../atoms/Button.svelte'
	import Input from '../atoms/Input.svelte'
	import { toast } from 'svelte-sonner'
	import type { Writable } from 'svelte/store'
	import { getContext } from 'svelte'
	let { user } = $props<{
		user: IUser
	}>()
	let loadingSubmission = $state(false)
	const userStore = getContext<Writable<IUser>>('userStore')

	let basicInformation = $state<{
		name: string
		phone: string
		email: string
		oldPassword: string
		newPassword: string
	}>({
		name: user.name,
		email: user.email,
		phone: user.phone,
		oldPassword: '',
		newPassword: ''
	})

	const handleSubmit: SubmitFunction = () => {
		if (!basicInformation.oldPassword) {
			toast.error('Please enter your current password')
			return
		}
		loadingSubmission = true
		return async ({ update, result }) => {
			const actionResult = result as ActionResult & {
				data: {
					basicInformation: {
						message: string
						name: string
						phone: string
						email: string
						oldPassword: string
						newPassword: string
					}
				}
			}
			if (actionResult.status === 400) {
				loadingSubmission = false
				toast.error(actionResult.data?.basicInformation.message)
				return
			}
			await update()
			loadingSubmission = false
			toast.success(actionResult.data?.basicInformation.message)
			basicInformation = actionResult.data?.basicInformation
			userStore.set({ ...$userStore!, name: basicInformation.name })
		}
	}
</script>

<div class="basic-information">
	<h1>Basic Information</h1>
	<p>Manage you personal information, name, phone number, email.</p>
	<div class="separator"></div>
	<form
		class="basic-information-form"
		action="?/basicInformation"
		method="post"
		use:enhance={handleSubmit}
	>
		<div class="row">
			<Input
				id="name"
				name="name"
				placeholder="Name"
				type="text"
				label="Name"
				bind:value={basicInformation.name}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
			<Input
				id="email"
				name="email"
				placeholder="Email"
				type="email"
				label="Email"
				bind:value={basicInformation.email}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
				disabled
			/>
		</div>
		<div class="row">
			<Input
				id="phone"
				name="phone"
				placeholder="Phone"
				type="number"
				label="Phone"
				bind:value={basicInformation.phone}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
			<Input
				id="registationDate"
				name="registrationDate"
				placeholder="Registration Date"
				type="datetime"
				label="Registration Date"
				value={new Date(user.registration)}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
				disabled
			/>
		</div>
		<div class="row">
			<Input
				id="oldPassword"
				name="oldPassword"
				placeholder="Current Password"
				type="password"
				label="Current Password"
				bind:value={basicInformation.oldPassword}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand);"
			/>
			<Input
				id="newPassword"
				name="newPassword"
				placeholder="New Password"
				type="password"
				label="New Password"
				bind:value={basicInformation.newPassword}
				style="--height: 3em;--border-size-focus: 2px; --border-color-focus: var(--custom-color-brand)"
			/>
		</div>
		<div class="row end">
			<Button
				type="submit"
				label="Update"
				withLoader={loadingSubmission}
				disabled={loadingSubmission}
			/>
		</div>
	</form>
	<b>Note:</b>
	<ul>
		<li>
			Password must be at least 8 characters long, must contain at least one uppercase letter, one
			lowercase letter, one number and one special character (!@#$%^&*)
		</li>
		<li>Please do not use your email or phone number as your password.</li>
	</ul>
</div>

<style lang="scss">
	.basic-information {
		padding: 1em;
		margin: 1em;
		h1 {
			font-size: 2em;
			font-weight: bold;
			margin: 0.3em 0;
		}
		.separator {
			height: 1px;
			margin-top: 1em;
			margin-bottom: 1em;
			background-color: var(--color-zinc-400);
		}
		.basic-information-form {
			display: flex;
			flex-direction: column;
			gap: 1em;

			.row {
				display: flex;
				flex-direction: row;
				gap: 1em;

				&.end {
					justify-content: flex-end;
				}
			}
		}

		@media (max-width: 768px) {
			h1 {
				font-size: 1.5em;
			}
			p {
				font-size: 0.8em;
			}

			.basic-information-form {
				.row {
					flex-direction: column;
					&.end {
						align-items: flex-end;
					}
				}
				margin-bottom: 0.5em;
			}
			ul {
				li {
					font-size: 0.8em;
				}
			}
		}
	}
</style>
