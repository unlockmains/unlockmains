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
                    env.REDIRECT_URL + provider.name,
                );
        const recordId = res.record?.id;
        const dataToUpdate = {
            picture: res.meta?.rawUser.picture,
            name: res.meta?.rawUser.name,
            firstName: res.meta?.rawUser.given_name,
            lastName: res.meta?.rawUser.family_name,
        }
        await pocketbase.collection("users").update(recordId, dataToUpdate);
        const profileData = await pocketbase.collection("users_profile").getFirstListItem(`userId = "${recordId}"`).catch(() => null);
        console.log("profileData", profileData);
        if(!profileData?.id) {
            const questionType = await pocketbase.collection("question_type").create({
                option1: 2,
                option2: 2,
                option3: 2,
            })
            await pocketbase.collection("users_profile").create({
                type: "student",
                userId: recordId,
                activePlan: false,
                verified: true,
                submissionLeft: questionType.id,
            });
        }
    } catch (error) {
        console.log("error", error);
        return redirect(303, "/?fail=true");
    }

    throw redirect(303, "/");
};
