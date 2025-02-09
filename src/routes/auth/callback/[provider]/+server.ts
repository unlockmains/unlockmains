import { type RequestHandler } from "@sveltejs/kit";
import { SESSION_COOKIE, createAdminClient } from "$lib/appwrite";
import { ID, Query } from "node-appwrite";
import {
  PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_TEAM,
  PUBLIC_APPWRITE_STUDENT_PROFILE_DB, PUBLIC_APPWRITE_STUDENT_TEAM,
  PUBLIC_APPWRITE_USER_PROFILE_DB
} from "$env/static/public";
import { AuthError } from "$lib/types/errors";
import { AuthErrorCode } from "$lib/types/enums";
import { authStore } from "$lib/stores/userStore";

export const GET: RequestHandler = async ({ url, cookies, params }) => {
  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");
  const userType = url.searchParams.get("userType");
  const provider = params.provider;


  if (!userId || !secret) {
    throw new AuthError(
      AuthErrorCode.INVALID_PARAMETERS,
      "Missing userId or secret parameters",
      400
    );
  }

  const { account, teams, databases } = createAdminClient();
  try {
    const session = await account.createSession(userId, secret);

    const userProfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB, [
      Query.equal("user_id", userId)
    ]);

    if (!userProfile.documents.length) {
      const isEvaluator = userType === "evaluator";
      const teamId = isEvaluator ? PUBLIC_APPWRITE_EVALUATOR_TEAM : PUBLIC_APPWRITE_STUDENT_TEAM;
      await teams.createMembership(teamId, [], undefined, userId)

      const newUserProfile = await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB, ID.unique(), {
        "user_id": userId,
        "registration_date": new Date().toISOString(),
        "user_type": isEvaluator ? "EVALUATOR" : "STUDENT",
        "admin_approved": isEvaluator ? false : true
      })

      if (!isEvaluator) {
        await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, ID.unique(), {
          "users_profile": newUserProfile.$id,
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

  } catch (error) {
    if (error instanceof AuthError) {
      return new Response(
        JSON.stringify({
          code: error.code,
          message: error.message
        }), {
        status: error.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.error('Unexpected authentication error:', error);
    return new Response(
      JSON.stringify({
        code: AuthErrorCode.UNKNOWN_ERROR,
        message: 'An unexpected error occurred'
      }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
