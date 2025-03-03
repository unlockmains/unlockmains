import type { IUserProfile } from '$lib/types';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Account, Client, Databases, Models, Storage, Teams, Avatars, Functions } from 'node-appwrite';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>
			session: Session | null
			user: User & { profile: IUserProfile } | null
			toastMessage: string
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
