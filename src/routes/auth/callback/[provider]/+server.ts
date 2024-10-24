import { redirect, type RequestHandler } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
    const {
        pocketbase 
    } = locals
    const provider = JSON.parse(cookies.get("provider") || "{}");

    if (provider.state !== url.searchParams.get("state")) {
        throw new Error("State parameters don't match");
    }

    try {
        const res = await
            pocketbase.collection("users")
                .authWithOAuth2Code(
                    provider.name,
                    url.searchParams.get("code") || "",
                    provider.codeVerifier,
                    env.REDIRECT_URL + provider.name
                );
    } catch (error) {
        return redirect(303, "/?fail=true");
    }

    throw redirect(303, "/");
};
