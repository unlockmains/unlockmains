import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';
import { RAZORPAY_SECRET } from '$env/static/private';
import { ID } from 'node-appwrite';
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PAYMENT_HISTORY, PUBLIC_APPWRITE_STUDENT_PROFILE_DB } from '$env/static/public';

export const POST: RequestHandler = async ({ request, locals: { user, databases } }) => {
    try {
        const payload = await request.json();
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            planDetails,
            studentProfileId,
        } = payload;

        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = HmacSHA256(body, RAZORPAY_SECRET).toString(Hex);

        if (expectedSignature !== razorpay_signature) {
            return json({ error: 'Invalid signature' }, { status: 400 });
        }

        const document = await databases.createDocument(
            PUBLIC_APPWRITE_DATABASE,
            PUBLIC_APPWRITE_PAYMENT_HISTORY,
            ID.unique(),
            {
                users_profile: user?.profile.$id,
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                amount: payload.amount,
                currency: payload.currency,
                status: 'Completed',
                customer_email: payload.email || '',
                customer_name: payload.name || '',
                timestamp: new Date().toISOString()
            }
        );

        await databases.updateDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, studentProfileId, {
            gs_submissions_left: planDetails.gs_allowed,
            optional_submissions_left: planDetails.optional_allowed,
            eassy_submissions_left: planDetails.essay_allowed,
            plan_active: true,
            plan_start: new Date().toISOString(),
            free_plan: false,
            pricing_structure: planDetails.$id
        })

        return json({ success: true, id: document.$id });
    } catch (error) {
        console.error('Payment verification error:', error);
        return json({ error: 'Failed to verify payment' }, { status: 500 });
    }
};