import { error } from '@sveltejs/kit';
import { getRecentEvaluations } from '../../recent-evaluation-sse/server';

export async function GET({ locals: { user, databases } }) {
    const userId = user?.profile.$id;
    if (!userId) {
        throw error(400, 'Missing userId');
    }

    return await getRecentEvaluations(databases, userId, false);
};
