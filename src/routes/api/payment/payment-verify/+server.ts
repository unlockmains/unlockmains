import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';
import { RAZORPAY_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request, locals: { user, supabase } }) => {
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

        const paymentHistory = await supabase.from("payment_history").insert({
            user_id: user?.id,
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            amount: payload.amount ?? 1,
            currency: payload.currency ?? "INR",
            status: 'Completed',
            customer_email: payload.email || '',
            customer_name: payload.name || '',
            timestamp: new Date().toISOString()
        })
        console.log("paymentHistory", paymentHistory)

        await supabase.from("student_profile").update({
            gs_submissions_left: planDetails.gs_allowed,
            optional_submissions_left: planDetails.optional_allowed,
            essay_submissions_left: planDetails.essay_allowed,
            plan_active: true,
            plan_start: new Date().toISOString(),
            free_plan: false,
            pricing_structure: planDetails.id
        }).eq("id", studentProfileId);

        return json({ success: true, id: paymentHistory?.id });
    } catch (error) {
        console.error('Payment verification error:', error);
        return json({ error: 'Failed to verify payment' }, { status: 500 });
    }
};