export type IToast = {
    id: string;
    type: 'success' | 'error' | 'info';
    dismissible: boolean;
    timeout: number;
    message: string;
}

export type INewSubmissionType = {
    text: string;
    value: string;
    disabled?: boolean;
    options?: INewSubmissionType[]
}

export enum INewSubmittedStatus {
    DRAFT = "Draft",
    SUBMITTED = "Submitted",
    UNDER_REVIEW = "Under Review",
    EVALUATED = "Evaluated",
    COMPLETED = "Completed"
}

export type ISubmission = {
    collectionId: string,
    collectionName: string,
    id: string,
    isPyq: boolean,
    name: string,
    noOfQuestions: number,
    questionType: string,
    status: INewSubmittedStatus,
    submissionDate: string,
    submittedFile: string[]
}

export type IAnnotation = {
    type: string
    data: object & { text: string }
}

export interface IPageAnnotations {
    [pageNumber: number]: IAnnotation[]
}