import { type RequestHandler } from "@sveltejs/kit";
import { SESSION_COOKIE, SESSION_ID, createAdminClient } from "$lib/appwrite";

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");

    if (!userId || !secret) {
        return new Response("Missing `userId` or `secret` query parameters", {
            status: 400,
        });
    }

    const { account } = createAdminClient();
    const session = await account.createSession(userId, secret);

    const headers = new Headers({
        location: "/dashboard",
    });
    
    headers.append("set-cookie", cookies.serialize(SESSION_COOKIE, session.secret, {
        sameSite: "strict",
        expires: new Date(session.expire),
        secure: true,
        path: "/",
    }));

    headers.append("set-cookie", cookies.serialize(SESSION_ID, session.$id, {
        sameSite: "strict",
        expires: new Date(session.expire),
        secure: true,
        path: "/",
    }));

    return new Response(null, { status: 302, headers });
};
