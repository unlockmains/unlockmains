import { type RequestHandler } from "@sveltejs/kit";
import { SESSION_COOKIE, createAdminClient } from "$lib/appwrite";
import { ID, Query } from "node-appwrite";
import {
  PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_TEAM,
  PUBLIC_APPWRITE_STUDENT_PROFILE_DB, PUBLIC_APPWRITE_STUDENT_TEAM,
  PUBLIC_APPWRITE_USER_PROFILE_DB
} from "$env/static/public";

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

  const userProfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB, [
    Query.equal("user_id", userId)
  ]);

  if (!userProfile.documents.length) {
    const isEvaluator = userType === "evaluator";
    const teamId = isEvaluator ? PUBLIC_APPWRITE_EVALUATOR_TEAM : PUBLIC_APPWRITE_STUDENT_TEAM;
    await teams.createMembership(teamId, [], undefined, userId)

    await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB, ID.unique(), {
      "user_id": userId,
      "registration_date": new Date().toISOString(),
      "user_type": isEvaluator ? "EVALUATOR" : "STUDENT",
      "admin_approved": isEvaluator ? false : true
    })

    if (!isEvaluator) {
      await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, ID.unique(), {
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
