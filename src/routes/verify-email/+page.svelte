<script lang="ts">
	import { enhance } from '$app/forms'
	import Button from '$lib/components/atoms/Button.svelte'
	import InputOtp from '$lib/components/atoms/InputOtp.svelte'
	import type { SubmitFunction } from './$types'
	let otpValue: string[] = []
	$: token = otpValue.join('')
	let loadingOtp: boolean = false

	const handleSubmitOtp: SubmitFunction = () => {
		loadingOtp = true
		otpValue = []
		return async ({ update }) => {
			update()
			loadingOtp = false
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="container">
	<div class="otp-heading">
		<h1>Confirm your Email</h1>
		<h5>Check your email and enter the 6 digit code you received!.</h5>
	</div>
	<form class="column flex otp-form" method="POST" use:enhance={handleSubmitOtp}>
		<InputOtp bind:value={otpValue} />
		<Button label={'Submit'} type="email-login" withLoader={loadingOtp} disabled={loadingOtp} />
		<input type="hidden" name="token" value={token} />
	</form>
</div>

<style lang="scss">
	.container {
		align-items: center;
		justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .otp-heading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .otp-form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
	}
</style>
