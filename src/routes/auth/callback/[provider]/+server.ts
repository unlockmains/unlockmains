import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from "google-auth-library"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_GOOGLE_REDIRECT_URI } from "$env/static/public";
import type { EmailOtpType, User } from '@supabase/supabase-js';

export async function GET(event) {
  const { url, locals, params } = event;
  const { supabase } = locals;
  const provider = params.provider;

  const code = url.searchParams.get('code');
  const secret = url.searchParams.get('secret');
  const email = url.searchParams.get('email');
  const userType = url.searchParams.get('userType');
  console.log("---", userType, code, secret, email)
  let { data: userProfileData } = await supabase.from("user_profile").select("*").eq("email", email).single();

  let user: User | null = null;
  try {
    if (code && provider === 'google') {
      /** used one
      const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PUBLIC_GOOGLE_REDIRECT_URI);
      const token = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(token.tokens);
      const user = oAuth2Client.credentials;
      const id_token = user.id_token?.split(".")[1];
      const id_token_payload = JSON.parse(atob(id_token!));
      */
      /*
      ID Token Payload: {
        iss: 'https://accounts.google.com',
        azp: '787617848849-t1c874tb20fvt15sbf7so6eri814b213.apps.googleusercontent.com',
        aud: '787617848849-t1c874tb20fvt15sbf7so6eri814b213.apps.googleusercontent.com',
        sub: '117221575420963506838',
        email: 'krshrey2802@gmail.com',
        email_verified: true,
        at_hash: 'PgKLQLLNa1rBEtOjbXcRFw',
        name: 'Shrey Kumar',
        picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ0mddThh5vYfVCzwthHLfbWIX2I12s6WjH_CAcnU7kgpbpmg=s96-c',
        given_name: 'Shrey',
        family_name: 'Kumar',
        iat: 1740924535,
        exp: 1740928135
      } 
      */

      const { data, error } = await supabase.auth.exchangeCodeForSession(code.split("/")[1]);
      console.log("data", data, error)
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