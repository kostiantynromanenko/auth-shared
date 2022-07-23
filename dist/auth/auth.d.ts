import React from 'react';
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
    signIn: (credentials: SignInCredentials) => Promise<unknown>;
    signOut: () => Promise<unknown>;
}
export declare const AuthContext: React.Context<AuthContextState>;
export declare const useAuth: () => AuthContextState;
export declare const RequiresAuth: ({ children }: {
    children: JSX.Element;
}) => JSX.Element;
