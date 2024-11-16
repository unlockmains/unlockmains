<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms'
	import Button from '$lib/components/atoms/Button.svelte'
	import Input from '$lib/components/atoms/Input.svelte'
	import Separator from '$lib/components/atoms/Separator.svelte'
	import BooksIcon from '$lib/components/icons/BooksIcon.svelte'
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte'
	import { afterUpdate } from 'svelte'
	import type { ActionData, SubmitFunction } from './$types.js'
	import { toast } from 'svelte-sonner'
	import { goto } from '$app/navigation'

	export let form: ActionData
	let loadingOtp: boolean = false
	let loadingGoogle: boolean = false
	let loadingWithPassword: boolean = false
	let password: string = ''
	$: loginType = password?.length ? 'Login' : 'Login without Password'

	const handleSubmitOtp: SubmitFunction = () => {
		loadingOtp = true
		password = ''
		form = null
		return async ({ update }) => {
			update()
			loadingOtp = false
		}
	}

	const handleGoogleSignIn: SubmitFunction = () => {
		loadingGoogle = true
		return async ({ update }) => {
			update()
			loadingGoogle = false
		}
	}

	const handleWithPassword: SubmitFunction = () => {
		loadingWithPassword = true
		form = null
		return async ({ update }) => {
			update()
			loadingWithPassword = false
		}
	}

	afterUpdate(() => {
		if (form?.signInOtp?.message) {
			if (form.signInOtp.success) {
				toast.success(form?.signInOtp?.message)
				goto(`/verify-email?email=${form.signInOtp.email}&type=email`)
			} else {
				toast.error(form?.signInOtp?.message)
			}
		}
	})
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="container mt-6">
	<h1>Auth Provider</h1>
	<h5>Login with an auth provider. If you don't have an account yet it will be created for you.</h5>
	<form
		class="row flex flex-center"
		method="post"
		action="?/googleAuth"
		use:enhance={handleGoogleSignIn}
	>
		<div class="row flex flex-center">
			<Button
				label="Login with Google"
				type="google-login"
				withLoader={loadingGoogle}
				disabled={loadingGoogle}><GoogleIcon /></Button
			>
		</div>
	</form>
	<Separator><BooksIcon height="56" width="56" /></Separator>
	<div class="flex row justify-between">
		<div class="flex column col-6-sm">
			<h1>Login with Email</h1>
			<h5>Welcome back!</h5>
			<form class="row flex" method="POST" action="?/signInOtp" use:enhance={handleSubmitOtp}>
				<div class="form-widget">
					<div>
						<Input
							label="Email Address"
							id="email"
							name="email"
							type="email"
							placeholder="Email Address"
							value={form?.signInOtp?.email ?? ''}
						/>
					</div>
					<div>
						<Input
							label="Password"
							id="password"
							name="password"
							type="password"
							placeholder="Password (Optional)"
							bind:value={password}
						/>
					</div>
					<div>
						<Button
							label={loginType}
							type="email-login"
							withLoader={loadingOtp}
							disabled={loadingOtp}
						/>
					</div>
				</div>
			</form>
			{#if !password}
				<h5 class="otp-information">
					We will send you an email with a 6 digit code that you can use to sign in.
				</h5>
			{/if}
			<div class="flex row items-center gap-4">
				<h5>Forgot your Password?</h5>
				<Button type="link" label="Reset it!" />
			</div>
		</div>
		<div class="flex column col-6-sm">
			<h1>Want to build your career?</h1>
			<h5>Join us today.</h5>
			<form
				class="row flex"
				method="POST"
				action="?/registerWithPassword"
				use:enhance={handleWithPassword}
			>
				<div style="width: 100%;">
					<Button
						label="Join Now"
						type="register"
						withLoader={loadingWithPassword}
						disabled={loadingWithPassword}
					/>
				</div>
			</form>
		</div>
	</div>
</div>
