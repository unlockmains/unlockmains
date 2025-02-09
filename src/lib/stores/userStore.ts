import type { IUser } from '$lib/types';
import { writable } from 'svelte/store';

interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    loading: boolean;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        isAuthenticated: false,
        user: null,
        loading: true
    });

    return {
        subscribe,
        setAuth: (user: IUser) => {
            set({
                isAuthenticated: true,
                user,
                loading: false
            });
        },
        clearAuth: () => {
            set({
                isAuthenticated: false,
                user: null,
                loading: false
            });
        },
        setLoading: (loading: boolean) => {
            update(state => ({ ...state, loading }));
        }
    };
}

export const authStore = createAuthStore();