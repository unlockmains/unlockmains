import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB } from "$env/static/public";
import { Query, type Models } from "node-appwrite";
import type { PageServerLoad } from "../$types.js";
import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageLoad} */

export const ssr = true;

export const load: PageServerLoad = async ({ route, locals: { user, databases } }) => {
      if (!user) {
            redirect(303, '/')
      }
      if (!user.profile.admin_approved && user.profile.user_type === "EVALUATOR") {
            redirect(303, "/onboard/evaluator")
      }
      let studentProfile: Models.Document | null = null
      if (user.profile.user_type === "STUDENT") {
            const studentDocument = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB,
                  [
                        Query.equal("users_profile", user?.profile.$id),
                        Query.select(["$id", "unlimited_plan", "plan_active", "plan_start", "free_plan"]),
                        Query.limit(1),
                  ]);
            studentProfile = studentDocument.documents[0];
      }
      return {
            slug: route.id,
            parentSlug: `/${route.id.split("/")[1]}`,
            userType: user.profile.user_type,
            adminApproved: user.profile.admin_approved,
            user,
            studentProfile
      };
}