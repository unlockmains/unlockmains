import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB } from '$env/static/public';
import { createSessionClient, SESSION_COOKIE } from '$lib/appwrite';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { Query } from 'node-appwrite';
import { cleanupCache, getUserFromCache, isUserInformationPresentInCache, setUserToCache, userCache } from './routes/auth/cache';

export const authentication: Handle = async ({ event, resolve }) => {
  try {
    const { account, databases, storage, teams, avatars, functions } = createSessionClient(event);
    event.locals.databases = databases;
    event.locals.storage = storage;
    event.locals.account = account;
    event.locals.teams = teams;
    event.locals.avatars = avatars;
    event.locals.functions = functions;
    const sessionCookie = event.cookies.get(SESSION_COOKIE);
    if (sessionCookie) {
      if (isUserInformationPresentInCache(sessionCookie)) {
        event.locals.user = getUserFromCache(sessionCookie);
      } else {
        const user = await account.get();
        const userProfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB, [
          Query.equal("user_id", user?.$id)
        ]);
        const completeUser = {
          ...user, team: (await teams.list()).teams[0], profile: userProfile.documents[0]
        };
        setUserToCache(sessionCookie, completeUser);
        event.locals.user = completeUser;
      }
      cleanupCache();
    }
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
    locals: { user }
  } = event;
  if (!unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) && event.url.pathname !== '/') {
    const loggedInUser = user?.$id
    if (!loggedInUser) {
      throw redirect(303, '/login');
    }
  }

  const result = await resolve(event);
  return result;
};

export const handle = sequence(authentication, authorization)