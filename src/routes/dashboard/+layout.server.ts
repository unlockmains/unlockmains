import type { PageServerLoad } from "../$types.js";
import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageLoad} */

export const ssr = true;

export const load: PageServerLoad = async ({ route, locals: { user, supabase } }) => {
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
                  profile = await supabase.from("evaluator_profile").select("*").eq("user_id", user.id).single();
            } else if (user.profile.user_type === "STUDENT") {
                  profile = await supabase.from("student_profile").select("*").eq("user_id", user.id).single();
                  // paymentHistory = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PAYMENT_HISTORY, [
                  //       Query.equal('users_profile', user.profile.$id),
                  // ])
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