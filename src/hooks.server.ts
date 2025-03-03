import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { cleanupCache, getUserFromCache, isUserInformationPresentInCache, setUserToCache, userCache } from './routes/auth/cache';
import { createServerClient } from '@supabase/ssr';
import type { IUserProfile } from '$lib/types';

export const authentication: Handle = async ({ event, resolve }) => {
  try {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      cookies: {
        getAll: () => event.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: '/' })
          })
        },
      },
    })
    event.locals.safeGetSession = async () => {
      const {
        data: { session },
      } = await event.locals.supabase.auth.getSession()
      if (!session) {
        return { session: null, user: null }
      }

      const {
        data: { user },
        error,
      } = await event.locals.supabase.auth.getUser()
      if (error) {
        return { session: null, user: null }
      }
      const userProfile = await event.locals.supabase.from("user_profile").select("*").eq("user_id", user?.id).single();
      if (user)
        event.locals.user = {
          ...user,
          profile: userProfile.data as IUserProfile
        };
      return { session, user }
    }

    return resolve(event, {
      filterSerializedResponseHeaders(name) {
        return name === 'content-range' || name === 'x-supabase-api-version'
      },
    })
  } catch (err) {
    console.error("error session", err)
  }
  const toastMessage = event.cookies.get('toastMessage');
  if (toastMessage) {
    event.cookies.delete('toastMessage', { path: '/' });
    event.locals.toastMessage = toastMessage;
  }
  return resolve(event);
}

const unprotectedPrefix = ['/login', '/auth', '/verify-email', '/careers', '/quick-links', '/about', '/contact'];
export const authorization: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession()
  event.locals.session = session
  const userProfile = await event.locals.supabase.from("user_profile").select("*").eq("user_id", user?.id).single();
  if (user)
    event.locals.user = {
      ...user,
      profile: userProfile.data as IUserProfile
    };

  if (!event.locals.session && !unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) && event.url.pathname !== '/') {
    redirect(303, '/')
  }
  return resolve(event)
};

export const handle = sequence(authentication, authorization)