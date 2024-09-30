export type IToast = {
    id: string;
    type: 'success' | 'error' | 'info';
    dismissible: boolean;
    timeout: number;
    message: string;
}