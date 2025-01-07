import { redirect, type RequestHandler } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { SESSION_COOKIE, createAdminClient } from "$lib/appwrite";


export const GET: RequestHandler = async ({ locals, url, cookies }) => {
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");

    if (!userId || !secret) {
        return new Response("Missing `userId` or `secret` query parameters", {
            status: 400,
        });
    }

    // Exchange the token `userId` and `secret` for a session
    const { account } = createAdminClient();
    const session = await account.createSession(userId, secret);

    const headers = new Headers({
        location: "/account",
        "set-cookie": cookies.serialize(SESSION_COOKIE, session.secret, {
            sameSite: "strict",
            expires: new Date(session.expire),
            secure: true,
            path: "/",
        }),
    });

    return new Response(null, { status: 302, headers });
};
