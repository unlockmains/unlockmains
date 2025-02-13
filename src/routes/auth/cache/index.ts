import type { IUser } from "$lib/types";

export const userCache = new Map();
export const CACHE_DURATION = 5 * 60 * 1000;

export function cleanupCache() {
    const now = Date.now();
    for (const [key, value] of userCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
            userCache.delete(key);
        }
    }
}

export function setUserToCache(sessionCookie: string, user: IUser) {
    const now = Date.now();
    userCache.set(sessionCookie, {
        user,
        timestamp: now
    });
}

export function getUserFromCache(sessionCookie: string) {
    const cachedData = userCache.get(sessionCookie);
    if (cachedData) {
        const now = Date.now();
        if (now - cachedData.timestamp < CACHE_DURATION) {
            return cachedData.user;
        }
    }
    return null;
}

export function removeUserFromCache(sessionCookie: string) {
    const cachedData = userCache.get(sessionCookie);
    if (cachedData) {
        userCache.delete(sessionCookie);
    }
    return null;
}

export function isUserInformationPresentInCache(sessionCookie: string) {
    return userCache.has(sessionCookie)
}