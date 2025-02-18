import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RAZORPAY_SECRET } from '$env/static/private';
import { PUBLIC_RAZORPAY_ID } from '$env/static/public';

export const GET: RequestHandler = async ({ url }) => {
    try {
        const paymentId = url.searchParams.get('payment_id');

        if (!paymentId) {
            return json({ error: 'Payment ID is required' }, { status: 400 });
        }

        const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${PUBLIC_RAZORPAY_ID}:${RAZORPAY_SECRET}`)
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return json({ error: 'Failed to fetch payment details', details: errorData }, { status: response.status });
        }

        const paymentDetails = await response.json();

        return json({ payment: paymentDetails });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        return json({ error: 'Failed to fetch payment details' }, { status: 500 });
    }
};