import type { Account, Client, Databases, Models, Storage } from 'node-appwrite';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			appwrite: Client,
			account: Account,
			user: Models.User<Models.Preferences> | undefined,
			databases: Databases,
			storage: Storage
		}
		interface PageData {
			user: User | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
