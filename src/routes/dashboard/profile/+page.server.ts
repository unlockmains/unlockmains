import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PAYMENT_HISTORY, PUBLIC_APPWRITE_PRICING_STRUCTURE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB } from '$env/static/public'
import { ID, Query } from 'node-appwrite'

export const load: PageServerLoad = async ({ locals: { user, databases } }) => {
  if (!user) {
    redirect(303, '/')
  }
  let profile = null
  let paymentHistory = null;
  if (user.profile.user_type === "EVALUATOR") {
    profile = null
  } else if (user.profile.user_type === "STUDENT") {
    profile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, [
      Query.equal('users_profile', user.profile.$id),
      Query.select(['$id', "plan_active", "free_plan", "plan_start", "optional_subject", "target_year", "preparing_for", "other_preparing_for", "roll_number_pre", "roll_number_mains", "pricing_structure.*"]),
      Query.limit(1),
    ])
    paymentHistory = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PAYMENT_HISTORY, [
      Query.equal('users_profile', user.profile.$id),
    ])
  }

  const allPlans = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PRICING_STRUCTURE);

  return { user, studentProfile: profile ? profile.documents[0] : null, allPlans: allPlans.documents, paymentHistory: paymentHistory ? paymentHistory.documents : [] }
}

export const actions: Actions = {
  basicInformation: async ({ request, locals: { account } }) => {
    const formData = await request.formData()
    const userId = formData.get('userId') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const oldPassword = formData.get('oldPassword') as string
    const newPassword = formData.get('newPassword') as string
    const errors: string[] = []
    const validPhone = '+91' + phone.replace(/\D/g, '');

    if (newPassword.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/[A-Z]/.test(newPassword)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(newPassword)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/[0-9]/.test(newPassword)) {
      errors.push('Password must contain at least one number')
    }
    if (!/[!@#$%^&*]/.test(newPassword)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)')
    }

    if (errors.length) {
      return fail(400, { basicInformation: { name, phone, email, success: false, message: "Password does not meet the requirements" } })
    }

    try {
      await account.updatePassword(newPassword, oldPassword);
      await account.updateName(name);
      await account.updatePhone(validPhone, oldPassword);
    } catch (error) {
      console.error('Error updating user information:', error);
      return fail(400, { basicInformation: { name, phone, email, success: false, message: (error as Error).message } });
    }

    return {
      basicInformation: {
        name, phone, email,
        success: true,
        message: "User information updated successfully."
      }
    }
  },
  mainInformation: async ({ request, locals: { databases } }) => {
    const formData = await request.formData()
    const studentProfileId = formData.get('studentProfileId') as string
    const optionalSubject = formData.get('optionalSubject') as string
    const targetYear = formData.get('targetYear') as string
    const preparingFor = formData.get('preparingFor') as string
    const otherPreparingFor = formData.get('otherPreparingFor') as string
    const rollNumberPre = formData.get('rollNumberPre') as string
    const rollNumberMains = formData.get('rollNumberMains') as string

    try {
      await databases.updateDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, studentProfileId, {
        optional_subject: optionalSubject,
        target_year: targetYear,
        preparing_for: preparingFor,
        other_preparing_for: preparingFor === "Others" ? otherPreparingFor : null,
        roll_number_pre: rollNumberPre,
        roll_number_mains: rollNumberMains
      });
    } catch (error) {
      console.error('Error updating user information:', error);
      return fail(400, {
        mainInformation: {
          optionalSubject, targetYear, preparingFor, otherPreparingFor, rollNumberPre, rollNumberMains,
          success: false,
          message: "Please try again."
        }
      })
    }

    return {
      mainInformation: {
        optionalSubject, targetYear, preparingFor, otherPreparingFor, rollNumberPre, rollNumberMains,
        success: true,
        message: "User information updated successfully."
      }
    }
  },
  signout: async ({ locals: { account } }) => {
    await account.deleteSession('current')
    redirect(303, '/')
  },
}
