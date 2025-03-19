import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from "google-auth-library"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_GOOGLE_REDIRECT_URI } from "$env/static/public";
import type { User } from '@supabase/supabase-js';

export async function GET(event) {
  const { url, locals, params } = event;
  const { supabase } = locals;
  const provider = params.provider;

  const code = url.searchParams.get('code');
  const secret = url.searchParams.get('secret');
  const email = url.searchParams.get('email');
  const userType = url.searchParams.get('userType');
  let { data: userProfileData } = await supabase.from("user_profile").select("*").eq("email", email).single();

  let user: User | null = null;
  try {
    if (code && provider === 'google') {

      const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PUBLIC_GOOGLE_REDIRECT_URI);
      const token = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(token.tokens);
      const user = oAuth2Client.credentials;

      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: user.id_token!,
      })

      if (error) {
        console.error('Supabase Sign-in Error:', error)
      }
    } else if (email && secret && provider === 'otp') {
      const res = await supabase.auth.verifyOtp({
        email,
        token: secret,
        type: userProfileData ? 'email' : 'signup'
      })
      console.log("res.data.session", res.data.session)
      user = res.data.user
    }
    if (user) {
      const { data } = await supabase.from("user_profile").select("*").eq("user_id", user.id);
      const isEvaluator = userType === "evaluator"
      if (!data?.length) {
        await supabase.from("user_profile").insert({
          user_id: user.id,
          user_type: isEvaluator ? "EVALUATOR" : "STUDENT",
          admin_approved: !isEvaluator,
          email
        });
        if (!isEvaluator) {
          await supabase.from("student_profile").insert({
            user_id: user.id,
          })
        } else {
          const { data, error } = await supabase.from("evaluator_lead").insert({
            user_id: user.id,
          })
          console.log("evaluator lead", data, error)
        }
      }
    }
  } catch (err) {
    console.log("Error logging with google", err)
  }
  throw redirect(303, '/dashboard');
}