import { createSessionClient } from '$lib/appwrite';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const SESSION_COOKIE = 'session';

export const authentication: Handle = async ({ event, resolve }) => {
  try {
    const { account, databases, storage } = createSessionClient(event);
    event.locals.databases = databases;
    event.locals.storage = storage;
    event.locals.account = account;
    event.locals.user = await account.get();
  } catch(err) {
    console.error("error session", err)
  }
  
  return resolve(event);
}

const unprotectedPrefix = ['/login', '/register', '/auth', '/verify-email'];
export const authorization: Handle = async ({ event, resolve }) => {
  const {
    locals: { user }
  } = event;
  if (!unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) && event.url.pathname !== '/') {
    const loggedIn = user?.$id
    if (!loggedIn) {
      throw redirect(303, '/login');
    }
  }

  const result = await resolve(event);
  return result;
};

export const handle = sequence(authentication, authorization)