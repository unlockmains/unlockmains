// src/routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
	const { session } = await safeGetSession()
	if (session) {
		redirect(303, '/account')
	}

	return { url: url.origin }
}

export const actions: Actions = {
	googleAuth: async (event) => {
		const {
			locals: { supabase }
		} = event;

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});

		if (error) {
			return fail(400, {
				googleAuth: {
					success: false,
					message: `There was an issue, Please contact support.`
				}
			})
		}

		if (data.url) {
			throw redirect(303, data.url ?? "/");
		}

	},
	signInOtp: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)

		if (!validEmail) {
			return fail(400, { signInOtp: { success: false, type: "error", email, password, message: "Please enter a valid email address" } })
		}
		let error = null;
		if (email && password) {
			const { error: signInWithPasswordError } = await supabase.auth.signInWithPassword({ email, password })
			error = signInWithPasswordError
		} else {
			const { error: signInWithOtpError } = await supabase.auth.signInWithOtp({ email })
			error = signInWithOtpError
		}

		if (error) {
			return fail(400, {
				signInOtp: {
					success: false,
					type: "error",
					email,
					password,
					message: `There was an issue. ${error.message}. If error still persists please contact support.`
				}
			})
		}

		return {
			signInOtp: {
				success: true,
				type: "success",
				email,
				password,
				message: 'Please check your email for a OTP to log into the website.'
			}
		}
	},
	registerWithPassword: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)

		if (!validEmail) {
			return fail(400, { registerWithPassword: { success: false, type: "error", message: "Please enter a valid email address", email, password } })
		}
		if (!password) {
			return fail(400, { registerWithPassword: { success: false, type: "error", message: "Please enter the password", email, password } })
		}
		const { error } = await supabase.auth.signUp({ email, password })
		if (error) {
			return fail(400, {
				registerWithPassword: {
					success: false,
					type: "error",
					email,
					password,
					message: `There was an issue, Please contact support.`
				}
			})
		}

		return {
			registerWithPassword: {
				success: true,
				type: "success",
				email,
				password,
				message: 'Please check your email. You wil receive a 6 digit code to register yourself.'
			}
		}
	}
}
