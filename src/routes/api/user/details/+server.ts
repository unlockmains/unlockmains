import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { Query } from 'node-appwrite';
import { setUserToCache } from '../../../auth/cache';
import { SESSION_COOKIE } from '$lib/appwrite';
import type { IUser } from '$lib/types';

export const POST: RequestHandler = async ({ locals: { databases, account, teams }, cookies }) => {
    const userDetail = await account.get();
    const userProfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB, [
        Query.equal("user_id", userDetail?.$id)
    ]);
    const completeUser = {
        ...userDetail, team: (await teams.list()).teams[0], profile: userProfile.documents[0]
    } as IUser;
    setUserToCache(cookies.get(SESSION_COOKIE)!, completeUser);
    return new Response(
        JSON.stringify({ message: "Success", user: completeUser }), {
        headers: {
            'Content-Type': 'application/plain'
        }
    });
}


