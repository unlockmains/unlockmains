import type { Account, Client, Models } from 'node-appwrite';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			appwrite: Client,
			account: Account,
			user: Models.User<Models.Preferences> | undefined
		}
		interface PageData {
			user: User | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
