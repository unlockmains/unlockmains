import { error } from '@sveltejs/kit';
import { getRecentAssignments } from './server.js';

export async function GET({ locals: { user, databases } }) {
    const userId = user?.profile.$id;
    if (!userId) {
        throw error(400, 'Missing userId');
    }

    let isStreamActive = true;
    let interval: ReturnType<typeof setInterval>;;
    const stream = new ReadableStream({
        start(controller) {
            try {
                controller.enqueue('data: ' + JSON.stringify({ connected: true }) + '\n\n');
                interval = setInterval(async () => {
                    if (!isStreamActive) {
                        clearInterval(interval);
                        return;
                    }

                    try {
                        const response = await getRecentAssignments(databases, userId);
                        if (!response.ok) {
                            throw new Error('Failed to fetch from Appwrite');
                        }
                        const data = await response.json();

                        if (isStreamActive) {
                            controller.enqueue('data: ' + JSON.stringify(data) + '\n\n');
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                        if (isStreamActive) {
                            controller.enqueue('data: ' + JSON.stringify({ error: 'Error fetching data' }) + '\n\n');
                        }
                    }
                }, 60000);
            } catch (error) {
                console.error('Stream initialization error:', error);
                isStreamActive = false;
                clearInterval(interval);
                controller.error(error);
            }
        },
        cancel() {
            isStreamActive = false;
            clearInterval(interval);
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    });
};
