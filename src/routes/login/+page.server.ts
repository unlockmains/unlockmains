// src/routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

import { createAdminClient } from "$lib/appwrite";
import { ID, OAuthProvider } from "node-appwrite";

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

		const { account } = createAdminClient();
		const redirectUrl = await account.createOAuth2Token(
			OAuthProvider.Google,
			`${event.url.origin}/auth/callback/google?userType=${userType}`,
			`${event.url.origin}/404`
		);
		throw redirect(302, redirectUrl)
	},
	signInOtp: async (event) => {
		const {
			request,
		} = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)
		let userId = "";
		if (!validEmail) {
			return fail(400, { signInOtp: { success: false, type: "error", email, password, message: "Please enter a valid email address", userId } })
		}
		let error = null;
		const { account } = createAdminClient();

		if (email && password) {
			const authData = await account.createEmailToken(
				ID.unique(),
				email,
			);
			// error = "error while login"

		} else {
			try {
				const sessionToken = await account.createEmailToken(
					ID.unique(),
					email,
				);
				if (!sessionToken.userId) {
					throw Error("There was an issue while logging in")
				}
				userId = sessionToken.userId
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
