import { fail, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { ID, Query, type Models } from "node-appwrite";
import { PUBLIC_APPWRITE_EVALUATION_REGISTER_BUCKET, PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_LEAD_DB, PUBLIC_APPWRITE_EVALUATOR_LEAD_ASSIGNMENT } from '$env/static/public'
import { getFileWithUpdatedFileName } from '$lib/api/utils';

export const load: PageServerLoad = async ({ url, locals: { user, databases } }) => {
  const evaluatorLead: Models.DocumentList<Models.Document> = await databases.listDocuments(
    PUBLIC_APPWRITE_DATABASE,
    PUBLIC_APPWRITE_EVALUATOR_LEAD_DB,
    [
      Query.equal("users_profile", user?.profile.$id)
    ]);

  return { url: url.origin, userName: user?.name, evaluatorLead: evaluatorLead.documents[0] }
}

export const actions: Actions = {
  basicInfo: async (event) => {
    const {
      locals: { databases, storage, user }
    } = event;
    const formData = await event.request.formData()
    const error: { fieldName: string, message: string }[] = []

    const name = formData.get('name') as string
    if (!name) {
      error.push({ fieldName: 'name', message: 'Please enter your name' })
    }
    const phoneNumber = formData.get('phoneNumber') as string
    if (!phoneNumber) {
      error.push({ fieldName: 'phoneNumber', message: 'Please enter your phone number' })
    }
    const mainsAttempts = Number(formData.get('mainsAttempts'))
    if (!mainsAttempts) {
      error.push({ fieldName: 'mainsAttempts', message: 'Please enter the number of mains attempts' })
    }
    const prelimsAttempts = Number(formData.get('prelimsAttempts'))
    if (!prelimsAttempts) {
      error.push({ fieldName: 'prelimsAttempts', message: 'Please enter the number of prelims attempts' })
    }
    const interviewsAppeared = Number(formData.get('interviewsAppeared'))
    if (!interviewsAppeared) {
      error.push({ fieldName: 'interviewsAppeared', message: 'Please enter the number of interviews appeared' })
    }
    const optionalSubject = formData.get('optionalSubject') as string
    if (!optionalSubject) {
      error.push({ fieldName: 'optionalSubject', message: 'Please enter the optional subject' })
    }
    const hasRank = formData.get('hasRank') === "false" ? false : true
    const existingUser = formData.get('existingUser')
    const existingUserEmail = formData.get('existingUserEmail')
    if (existingUser === 'Yes' && !existingUserEmail) {
      error.push({ fieldName: 'existingUserEmail', message: 'Please existing user email' })
    }

    if (error.length) {
      return fail(400, { basicInfo: error })
    }

    let evaluatorLead: Models.DocumentList<Models.Document> | Models.Document = await databases.listDocuments(
      PUBLIC_APPWRITE_DATABASE,
      PUBLIC_APPWRITE_EVALUATOR_LEAD_DB,
      [
        Query.equal("users_profile", user?.profile.$id)
      ]);

    const documentToCreateUpdate = {
      "name": name,
      "phone_number": phoneNumber,
      "mains_attempts": mainsAttempts,
      "prelims_attempts": prelimsAttempts,
      "interviews_appeared": interviewsAppeared,
      "optional_subject": optionalSubject,
      "has_rank": hasRank,
      "existing_user": existingUser,
      "existing_user_email": existingUser === 'Yes' ? existingUserEmail : null,
      "current_step": 2
    }

    if (!evaluatorLead.documents[0]) {
      const file = formData.get('marksheet') as File;
      const fileId = ID.unique();
      const fileToUpload = getFileWithUpdatedFileName({ file, fileId })
      const marksheetFile = await storage.createFile(PUBLIC_APPWRITE_EVALUATION_REGISTER_BUCKET, fileId, fileToUpload);
      evaluatorLead = await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_LEAD_DB, ID.unique(), {
        "users_profile": user?.profile.$id,
        ...documentToCreateUpdate,
        "marksheet_id": marksheetFile.$id,
      })
    } else {
      evaluatorLead = await databases.updateDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_LEAD_DB, evaluatorLead.documents[0].$id, {
        ...documentToCreateUpdate,
      })
    }
    return { "message": "success" }
  },
  preferences: async (event) => {
    const {
      locals: { databases, user }
    } = event;
    const formData = await event.request.formData()
    const error: { fieldName: string, message: string }[] = []

    const evaluationLanguage = formData.get('evaluationLanguage') as string
    if (!evaluationLanguage) {
      error.push({ fieldName: 'evaluationLanguage', message: 'Please select Evaluation Language' })
    }
    const experience = formData.get('experience') as string
    if (!experience) {
      error.push({ fieldName: 'experience', message: 'Please enter your experience' })
    }
    const evaluateGeneralStudies = formData.getAll('evaluateGeneralStudies') as string[]
    if (evaluateGeneralStudies.length < 2) {
      error.push({ fieldName: 'evaluateGeneralStudies', message: 'Please select at least 2 general studies' })
    }
    const evaluateEssay = formData.get('evaluateEssay') === "false" ? false : true
    const evaluateOptional = formData.get('evaluateOptional') === "false" ? false : true

    if (error.length) {
      return fail(400, { basicInfo: error })
    }

    let evaluatorLead: Models.DocumentList<Models.Document> | Models.Document = await databases.listDocuments(
      PUBLIC_APPWRITE_DATABASE,
      PUBLIC_APPWRITE_EVALUATOR_LEAD_DB,
      [
        Query.equal("users_profile", user?.profile.$id)
      ]);

    const documentToCreateUpdate = {
      "evaluation_language": evaluationLanguage,
      "experience": experience,
      "evaluate_general_studies": evaluateGeneralStudies,
      "evaluate_essay": evaluateEssay,
      "evaluate_optional": evaluateOptional,
      "current_step": 3
    }

    evaluatorLead = await databases.updateDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_LEAD_DB, evaluatorLead.documents[0].$id, {
      ...documentToCreateUpdate,
    })
    return true;
  },
  getAssignment1File: async ({ locals }) => {
    try {
      const { storage } = locals;
      let assignment1 = await storage.listFiles(
        PUBLIC_APPWRITE_EVALUATOR_LEAD_ASSIGNMENT,
        [Query.equal('name', 'Assignment_1.pdf')]
      );

      if (assignment1.total === 0) {
        throw fail(400, { message: 'No File Found' });
      }

      const fileId = assignment1.files[0].$id;
      const fileDownload = await storage.getFileDownload(PUBLIC_APPWRITE_EVALUATOR_LEAD_ASSIGNMENT, fileId);

      return new Response(fileDownload, {
        headers: {
          'Content-Disposition': `attachment; filename="Assignment_1.pdf"`,
          'Content-Type': 'application/pdf'
        }
      });
    } catch (err) {
      console.error('Error downloading file:', err);
      throw fail(500, { message: 'Error downloading file' });
    }
  }
}