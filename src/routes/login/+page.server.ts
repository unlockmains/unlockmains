// src/routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

import { OAuth2Client } from "google-auth-library"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_GOOGLE_REDIRECT_URI } from "$env/static/public";

export const load: PageServerLoad = async ({ url, locals: { user } }) => {
	if (user) {
		redirect(303, "/dashboard");
	}

	return { url: url.origin }
}

export const actions: Actions = {
	googleAuth: async (event) => {
		const formData = await event.request.formData();
		const userType = formData.get('userType') as string;
		const { locals } = event;
		const {
			supabase,
		} = locals;

		// const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PUBLIC_GOOGLE_REDIRECT_URI);

		// const authorizedUrl = oAuth2Client.generateAuthUrl({
		// 	access_type: 'offline',
		// 	scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
		// 	prompt: 'consent',
		// });

		// throw redirect(302, authorizedUrl);
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: PUBLIC_GOOGLE_REDIRECT_URI
			}
		});
		if (error) throw redirect(404, error.message);
		throw redirect(302, data.url);
	},
	signInOtp: async (event) => {
		const {
			request,
			locals
		} = event
		const {
			supabase
		} = locals;
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)
		let userId = "";
		if (!validEmail) {
			return fail(400, { signInOtp: { success: false, type: "error", email, password, message: "Please enter a valid email address", userId } })
		}
		let error = null;

		if (email && password) {
			//emial password login
			// error = "error while login"

		} else {
			try {
				const response = await supabase.auth.signInWithOtp({
					email,
					options: {
						shouldCreateUser: true,
					}
				});
			} catch (err) {
				error = (err as Error).message;
			}
		}

		if (error) {
			return fail(400, {
				signInOtp: {
					success: false,
					type: "error",
					email,
					password,
					message: `There was an issue. ${error}. If error still persists please contact support.`,
					userId
				}
			})
		}

		return {
			signInOtp: {
				success: true,
				type: "success",
				email,
				password,
				message: 'Please check your email for a OTP to log into the website.',
				userId
			}
		}
	},
	// registerWithPassword: async (event) => {
	// 	const {
	// 		request,
	// 		locals: {  }
	// 	} = event
	// const formData = await request.formData()
	// const email = formData.get('email') as string
	// const password = formData.get('password') as string
	// const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)

	// if (!validEmail) {
	// 	return fail(400, { registerWithPassword: { success: false, type: "error", message: "Please enter a valid email address", email, password } })
	// }
	// if (!password) {
	// 	return fail(400, { registerWithPassword: { success: false, type: "error", message: "Please enter the password", email, password } })
	// }
	// const { error } = await supabase.auth.signUp({ email, password })
	// if (error) {
	// 	return fail(400, {
	// 		registerWithPassword: {
	// 			success: false,
	// 			type: "error",
	// 			email,
	// 			password,
	// 			message: `There was an issue, Please contact support.`
	// 		}
	// 	})
	// }

	// return {
	// 	registerWithPassword: {
	// 		success: true,
	// 		type: "success",
	// 		email,
	// 		password,
	// 		message: 'Please check your email. You wil receive a 6 digit code to register yourself.'
	// 	}
	// }
	// goto("/register")
	// }
}
