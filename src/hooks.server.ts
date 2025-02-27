import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSessionClient, SESSION_COOKIE } from '$lib/appwrite';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { Query } from 'node-appwrite';
import { cleanupCache, getUserFromCache, isUserInformationPresentInCache, setUserToCache, userCache } from './routes/auth/cache';
import { createServerClient } from '@supabase/ssr';
import { SUPABASE_ANON_KEY } from '$env/static/private';

export const authentication: Handle = async ({ event, resolve }) => {
  try {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, SUPABASE_ANON_KEY, {
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
      event.locals.user = user;
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
  const {
    locals: { user },
  } = event;
  if (!unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) && event.url.pathname !== '/') {
    const loggedInUser = user?.$id
    if (!loggedInUser) {
      throw redirect(303, '/');
    }
  }

  const result = await resolve(event);
  return result;
};

export const handle = sequence(authentication, authorization)