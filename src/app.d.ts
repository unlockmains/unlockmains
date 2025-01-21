import type { Account, Client, Databases, Models, Storage, Teams } from 'node-appwrite';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			appwrite: Client,
			account: Account,
			user: (Models.User<Models.Preferences> & {team: Models.Team<Models.Preferences>}) |  undefined,
			databases: Databases,
			storage: Storage,
			teams: Teams
		}
		interface PageData {
			user: User | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
