import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import type { LayoutLoad } from './$types'
import type { IUser, IUserProfile } from '$lib/types'

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
    depends('supabase:auth')

    const supabase = isBrowser()
        ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            },
        })
        : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                fetch,
            },
            cookies: {
                getAll() {
                    return data.cookies
                },
            },
        })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: userProfile } = await supabase.from("user_profile").select("*").eq("user_id", user?.id).single();
    if (user) {
        const userWithProfile: IUser = {
            ...user,
            profile: userProfile as IUserProfile
        };
        return { session, user: userWithProfile }
    }
    return { session, user, supabase }
}