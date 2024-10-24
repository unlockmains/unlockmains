import PocketBase, {AuthModel} from 'pocketbase'
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pocketbase: PocketBase,
		}
		interface PageData {
			session: Session | null
			user: User | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
