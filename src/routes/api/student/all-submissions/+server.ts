import { error } from '@sveltejs/kit';
import { getRecentEvaluations } from '../../recent-evaluation-sse/server';

export async function GET({ locals: { user, supabase } }) {
    const userId = user?.id;
    if (!userId) {
        throw error(400, 'Missing userId');
    }

    return await getRecentEvaluations(supabase, userId, false);
};
