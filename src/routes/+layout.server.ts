// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { pocketbase }, cookies }) => {
  
  // const user = pocketbase.authStore.model;

  return {
    user: null,
    cookies: cookies.getAll(),
  }
}