import type { IUser, IUserProfile } from '$lib/types';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			safeGetSession(): Promise<{ session: null; user: null; } | { session: Session; user: IUser; }>
			session: Session | null
			toastMessage: string
			user: IUser | null
		}
		interface PageData {
			user: IUser | null
			session: Session | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
