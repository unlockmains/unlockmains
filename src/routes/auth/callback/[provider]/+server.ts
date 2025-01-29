import { type RequestHandler } from "@sveltejs/kit";
import { SESSION_COOKIE, createAdminClient } from "$lib/appwrite";
import { ID, Query } from "node-appwrite";
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_TEAM, PUBLIC_APPWRITE_STUDENT_TEAM } from "$env/static/public";

export const GET: RequestHandler = async ({ url, cookies }) => {
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");
    const userType = url.searchParams.get("userType");
    
    if (!userId || !secret) {
        return new Response("Missing `userId` or `secret` query parameters", {
            status: 400,
        });
    }

    const { account, teams, databases } = createAdminClient();
    const session = await account.createSession(userId, secret);
    const isEvaluator = userType === "evaluator";
    const teamId = isEvaluator ? PUBLIC_APPWRITE_EVALUATOR_TEAM : PUBLIC_APPWRITE_STUDENT_TEAM;

    const userTeams = await teams.listMemberships(teamId , [Query.equal("userId", userId)]);

    if(!userTeams.total) {
      await teams.createMembership(teamId, [], undefined, userId)

      const userProfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, "679a65110038887f33e5", [Query.equal("user_id", userId)]);

      if (!userProfile.documents.length) {
            await databases.createDocument(PUBLIC_APPWRITE_DATABASE, "679a65110038887f33e5", ID.unique(), {
                  "user_id": userId,
                  "registration_date": new Date().toISOString(),
                  "user_type":  isEvaluator ? "EVALUATOR" : "STUDENT"
            })

            await databases.createDocument(PUBLIC_APPWRITE_DATABASE, "67992413002b9627b5e7", ID.unique(), {
                  "user_id": userId,
                  "gs_submissions_left": 2,
                  "optional_submissions_left": 0,
                  "eassy_submissions_left": 0,
                  "unlimited_plan": false,
                  "plan_active": false,
                  "free_plan": true,
                  "plan_start": new Date().toISOString(),
            });
      }
    }

    const headers = new Headers({
        location: "/dashboard",
        "set-cookie": cookies.serialize(SESSION_COOKIE, session.secret, {
          sameSite: "lax",
          expires: new Date(session.expire),
          secure: true,
          path: "/",
        }),
      });

    return new Response(null, { status: 302, headers });
};
