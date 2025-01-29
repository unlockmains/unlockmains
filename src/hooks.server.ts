import { createSessionClient, SESSION_COOKIE } from '$lib/appwrite';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authentication: Handle = async ({ event, resolve }) => {
  try {
    const { account, databases, storage, teams } = createSessionClient(event);
    event.locals.databases = databases;
    event.locals.storage = storage;
    if (event.cookies.get(SESSION_COOKIE)) {
      event.locals.account = account;
      event.locals.teams = teams;
      event.locals.user = {
        ...await account.get(), team: (await teams.list()).teams[0]
      }
    }
  } catch (err) {
    console.error("error session", err)
  }

  return resolve(event);
}

const unprotectedPrefix = ['/login', '/auth', '/verify-email', '/careers', '/registration', '/quick-links', '/about',  '/contact'];
export const authorization: Handle = async ({ event, resolve }) => {
  const {
    locals: { user }
  } = event;
  if (!unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) && event.url.pathname !== '/' ) {
    const loggedInUser = user?.$id
    if(!loggedInUser) {
      throw redirect(303, '/login');
    }
  }

  const result = await resolve(event);
  return result;
};

export const handle = sequence(authentication, authorization)