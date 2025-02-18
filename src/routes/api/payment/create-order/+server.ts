import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_RAZORPAY_ID } from '$env/static/public';
import { RAZORPAY_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { amount, currency = 'INR' } = await request.json();

        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${PUBLIC_RAZORPAY_ID}:${RAZORPAY_SECRET}`)
            },
            body: JSON.stringify({
                amount: amount * 100, // Razorpay expects amount in paise
                currency,
                receipt: `receipt_${Date.now()}`
            })
        });

        const order = await response.json();

        return json({ order });
    } catch (error) {
        console.log('Error creating Razorpay order:', error);
        return json({ error: 'Failed to create order' }, { status: 500 });
    }
};