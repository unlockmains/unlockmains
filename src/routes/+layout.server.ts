// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { pocketbase }, cookies }) => {
  
  const user = pocketbase.authStore.model;
  console.log('load2', user)

  return {
    user,
    cookies: cookies.getAll(),
  }
}