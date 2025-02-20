import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_PROFILE_DB, PUBLIC_APPWRITE_PAYMENT_HISTORY, PUBLIC_APPWRITE_STUDENT_PROFILE_DB } from "$env/static/public";
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
      let profile = null
      let paymentHistory = null;
      try {
            if (user.profile.user_type === "EVALUATOR") {
                  profile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_PROFILE_DB, [
                        Query.equal('users_profile', user.profile.$id),
                        Query.select(['$id', "general_studies", "essay", "optional", "optional_subject", "evaluation_language", "available", "unavailable_reason", "gs_total_bw", "gs_available_bw", "optional_total_bw", "optional_available_bw", "essay_total_bw", "essay_available_bw"]),
                        Query.limit(1),
                  ])
            } else if (user.profile.user_type === "STUDENT") {
                  profile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, [
                        Query.equal('users_profile', user.profile.$id),
                        Query.select(['$id', "plan_active", "free_plan", "plan_start", "optional_subject", "target_year", "preparing_for", "other_preparing_for", "roll_number_pre", "roll_number_mains", "pricing_structure.*"]),
                        Query.limit(1),
                  ])
                  paymentHistory = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PAYMENT_HISTORY, [
                        Query.equal('users_profile', user.profile.$id),
                  ])
            }
      } catch (error) {
            console.error("Error fetching profile in dashboard/layout:", error);
      }
      return {
            slug: route.id,
            parentSlug: `/${route.id.split("/")[1]}`,
            userType: user.profile.user_type,
            adminApproved: user.profile.admin_approved,
            user,
            profile,
            paymentHistory
      };
}