import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RAZORPAY_SECRET } from '$env/static/private';
import { PUBLIC_RAZORPAY_ID } from '$env/static/public';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { payment_id, customer_details } = await request.json();

        if (!payment_id) {
            return json({ error: 'Payment ID is required' }, { status: 400 });
        }

        const response = await fetch('https://api.razorpay.com/v1/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${PUBLIC_RAZORPAY_ID}:${RAZORPAY_SECRET}`)
            },
            body: JSON.stringify({
                type: 'invoice',
                payment_id: payment_id,
                customer: {
                    name: customer_details.name,
                    email: customer_details.email,
                    contact: customer_details.phone || ''
                },
                line_items: customer_details.line_items || [],
                notes: {
                    ...customer_details.notes,
                    'payment_id': payment_id
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return json({ error: 'Failed to generate invoice', details: errorData }, { status: response.status });
        }

        const invoiceData = await response.json();

        return json({ invoice: invoiceData });
    } catch (error) {
        console.error('Error generating invoice:', error);
        return json({ error: 'Failed to generate invoice' }, { status: 500 });
    }
};