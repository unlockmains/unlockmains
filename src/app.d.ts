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
			supabase: SupabaseClient
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>
		}
		interface PageData {
			user: User | null
			session: Session | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
