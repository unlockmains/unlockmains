import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB } from "$env/static/public";
import { Query } from "node-appwrite";
import type { PageServerLoad } from "../$types.js";
import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageLoad} */

// export const prerender = false; // TODO: prerendering check once
export const ssr = true;

export const load: PageServerLoad = async ({ route, locals: { user, databases } }) => {
      if (!user) {
            redirect(303, '/login')
      }
      const userProfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_USER_PROFILE_DB, [
            Query.equal("user_id", user?.$id)
      ]);
      if (!userProfile.documents[0].admin_approved && userProfile.documents[0].user_type === "EVALUATOR") {
            redirect(303, "/onboard/evaluator")
      }
      return {
            slug: route.id,
            parentSlug: `/${route.id.split("/")[1]}`,
            userType: userProfile.documents[0].user_type,
            adminApproved: userProfile.documents[0].admin_approved
      };
}