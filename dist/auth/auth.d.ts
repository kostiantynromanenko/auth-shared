import React from 'react';
import { AuthService } from "./auth-service";
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
    isLoading: boolean;
    error: string | null;
    signIn: (credentials: SignInCredentials) => Promise<any>;
    signInWithRedirect: () => Promise<any>;
    signOut: () => Promise<unknown>;
    handleAuthRedirect: () => Promise<void>;
    authService: AuthService | null;
}
export declare const AuthContext: React.Context<AuthContextState>;
export declare const useAuth: () => AuthContextState;
