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