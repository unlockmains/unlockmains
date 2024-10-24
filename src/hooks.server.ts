import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private'
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authentication: Handle = async ({ event, resolve }) => {
  event.locals.pocketbase = new PocketBase(env.PB_URL);
  event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    event.locals.pocketbase.authStore.isValid && await event.locals.pocketbase.collection('users').authRefresh();
  } catch (_) {
    event.locals.pocketbase.authStore.clear();
  }

  const response = await resolve(event);

  response.headers.append('set-cookie', event.locals.pocketbase.authStore.exportToCookie({ sameSite: 'Lax', httpOnly: false }));

  return response;
}

const unprotectedPrefix = ['/login', '/register', '/auth'];
export const authorization: Handle = async ({ event, resolve }) => {
  const {
    locals: {pocketbase}
  } = event;
  if (!unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) && event.url.pathname !== '/') {
    const loggedIn = pocketbase.authStore.model;
    if (!loggedIn) {
      throw redirect(303, '/login');
    }
  }

  const result = await resolve(event);
  return result;
};

export const handle = sequence(authentication, authorization)