import type { PageServerLoad } from "../$types.js";
/** @type {import('./$types').PageLoad} */

export const prerender = false; // TODO: prerendering check once

export const load: PageServerLoad = ({ route }) => {
      return {
            slug: route.id,
            parentSlug: `/${route.id.split("/")[1]}`
      };
}