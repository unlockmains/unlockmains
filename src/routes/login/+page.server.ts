// src/routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async ({ url, locals: { pocketbase } }) => {
	const user = pocketbase.authStore.model;
	if (user) {
		redirect(303, "/dashboard");
	}

	const authMethods = await pocketbase.collection("users").listAuthMethods();
	const fail = url.searchParams.get("fail") === "true";

	return { providers: authMethods.authProviders, fail };
}

export const actions: Actions = {
	googleAuth: async (event) => {
		const {
			locals: { pocketbase },
			cookies,
		} = event;
		const provider = (
			await pocketbase.collection("users").listAuthMethods()
		).authProviders.find((p) => p.name === "google");

		cookies.set("provider", JSON.stringify(provider), {
			httpOnly: true,
			path: `/auth/callback/google`,
		});

		throw redirect(303, provider?.authUrl + env.REDIRECT_URL + provider?.name);
	},
	signInOtp: async (event) => {
		const {
			request,
			locals: { pocketbase }
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
			const authData = await pocketbase.collection("users").authWithPassword(email, password)
			// error = "error while login"

		} else {
			try {
				const authData = await fetch(`${env.PB_URL}api/otp/auth`, {
					method: "POST",
					body: JSON.stringify({ email: email })
				})
				if (!authData.ok) {
					throw Error("There was an issue while logging in")
				}
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
					message: `There was an issue. ${error}. If error still persists please contact support.`
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
	// registerWithPassword: async (event) => {
	// 	const {
	// 		request,
	// 		locals: { supabase }
	// 	} = event
	// 	const formData = await request.formData()
	// 	const email = formData.get('email') as string
	// 	const password = formData.get('password') as string
	// 	const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)

	// 	if (!validEmail) {
	// 		return fail(400, { registerWithPassword: { success: false, type: "error", message: "Please enter a valid email address", email, password } })
	// 	}
	// 	if (!password) {
	// 		return fail(400, { registerWithPassword: { success: false, type: "error", message: "Please enter the password", email, password } })
	// 	}
	// 	const { error } = await supabase.auth.signUp({ email, password })
	// 	if (error) {
	// 		return fail(400, {
	// 			registerWithPassword: {
	// 				success: false,
	// 				type: "error",
	// 				email,
	// 				password,
	// 				message: `There was an issue, Please contact support.`
	// 			}
	// 		})
	// 	}

	// 	return {
	// 		registerWithPassword: {
	// 			success: true,
	// 			type: "success",
	// 			email,
	// 			password,
	// 			message: 'Please check your email. You wil receive a 6 digit code to register yourself.'
	// 		}
	// 	}
	// }
}
