import type { Account, Client, Databases, Models, Storage, Teams, Avatars, Functions } from 'node-appwrite';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account: Account,
			user: (Models.User<Models.Preferences> & { team: Models.Team<Models.Preferences> } & { profile: Models.Document<Models.UserProfile> }) | undefined,
			databases: Databases,
			storage: Storage,
			teams: Teams,
			toastMessage: string | undefined,
			avatars: Avatars,
			functions: Functions,
		}
		interface PageData {
			user: User | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
