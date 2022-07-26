import React, {createContext, useContext} from 'react';

export interface AuthUser {
    username: string;
    email: string;
    attributes?: {
        [key: string]: string;
    };
}

export interface SignInCredentials {
    username: string;
    password: string;
}

export interface AuthContextState {
    user: AuthUser | null;
    isLoading: boolean,
    error: string | null,
    signIn: (credentials: SignInCredentials) => Promise<any>;
    signInWithRedirect: () => Promise<any>,
    signOut: () => Promise<unknown>;
    handleAuthRedirect: () => Promise<void>,
    checkSession: () => Promise<void>
}

export const AuthContext = createContext<AuthContextState>({
    user: null,
    isLoading: true,
    error: null,
    signIn: () => Promise.resolve(),
    signInWithRedirect: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
    handleAuthRedirect: () => Promise.resolve(),
    checkSession: () => Promise.resolve()
});

export const useAuth = () => useContext(AuthContext);
