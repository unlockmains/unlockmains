import type { AuthErrorCode } from "./enums";

export class AuthError extends Error {
    constructor(
        public code: AuthErrorCode,
        public message: string,
        public status: number,
        public originalError?: unknown
    ) {
        super(message);
        this.name = 'AuthError';
    }
}