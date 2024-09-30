import type { PageServerLoad } from "../$types.js";
/** @type {import('./$types').PageLoad} */

export const prerender = true;

export const load: PageServerLoad = ({ route }) => {
    return {
          slug: route.id
    };
  }