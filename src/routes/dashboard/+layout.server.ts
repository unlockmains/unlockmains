import type { PageServerLoad } from "../$types.js";
import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageLoad} */

export const ssr = true;

export const load: PageServerLoad = async ({ route, locals: { user } }) => {
      if (!user) {
            redirect(303, '/login')
      }
      if (!user.profile.admin_approved && user.profile.user_type === "EVALUATOR") {
            redirect(303, "/onboard/evaluator")
      }
      return {
            slug: route.id,
            parentSlug: `/${route.id.split("/")[1]}`,
            userType: user.profile.user_type,
            adminApproved: user.profile.admin_approved,
            user
      };
}