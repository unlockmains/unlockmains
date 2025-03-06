import type { RequestHandler } from '@sveltejs/kit';
import { getRecentEvaluations } from '../recent-evaluation-sse/server';

export const GET: RequestHandler = async ({ locals: { user, supabase } }) => {
    return await getRecentEvaluations(supabase, user?.id!);
}