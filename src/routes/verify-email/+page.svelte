<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte'
	import InputOtp from '$lib/components/atoms/InputOtp.svelte'
	import { goto } from '$app/navigation'
	import { AuthErrorCode } from '$lib/types/enums'
	let otpValue: string[] = []
	$: token = otpValue.join('')
	let loadingOtp: boolean = false
	export let data

	const handleOtpValidationAndLogin = async (token: string) => {
		loadingOtp = true
		try {
			const searchParams = new URLSearchParams({
				userId: data.userId,
				secret: token,
				userType: 'student'
			})

			const response = await fetch(`/auth/callback/otp?${searchParams}`)

			if (!response.ok) {
				const errorData = await response.json()

				switch (errorData.code) {
					case AuthErrorCode.INVALID_TOKEN:
						throw new Error('Invalid OTP. Please try again.')

					case AuthErrorCode.USER_NOT_FOUND:
						throw new Error('User account not found.')

					case AuthErrorCode.SESSION_CREATION_FAILED:
						throw new Error('Unable to create session. Please try again.')

					default:
						throw new Error('An unexpected error occurred. Please try again later.')
				}
			}
			// need to change to something to replace login button on header
			goto('/dashboard', { replaceState: true })
		} catch (error) {
			if (error instanceof Error) {
				console.error('Authentication error:', error.message)
			} else {
				console.error('Unexpected error:', error)
			}
			return error
		} finally {
			loadingOtp = false
		}
	}
</script>

<svelte:head>
	<title>Verify Email</title>
</svelte:head>

<div class="container">
	<div class="otp-heading">
		<h1>Confirm your Email</h1>
		<h5>Check your email and enter the 6 digit code you received!.</h5>
	</div>
	<div class="otp-form">
		<InputOtp bind:value={otpValue} />
		<Button
			label={'Submit'}
			type="email-login"
			withLoader={loadingOtp}
			disabled={loadingOtp}
			onClick={() => handleOtpValidationAndLogin(token)}
		/>
		<input type="hidden" name="token" value={token} />
	</div>
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
