// src/lib/server/appwrite.js
import { Client, Account, Databases, Storage, Teams } from 'node-appwrite';
import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import type { RequestEvent } from '@sveltejs/kit';

export const SESSION_COOKIE = '$$session';
export const SESSION_ID = '$$id'

export function createAdminClient() {
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT)
        .setKey(APPWRITE_KEY); 
        
    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        },
        get teams() {
            return new Teams(client);
        }
    };
}

export function createSessionClient(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT);
    const session = event.cookies.get(SESSION_COOKIE);
    if(session) {
        client.setSession(session);
    }
    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        },
        get teams() {
            return new Teams(client);
        }
    };
}
