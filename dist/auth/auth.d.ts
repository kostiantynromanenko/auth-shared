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
    isLoading: boolean;
    signIn: (credentials: SignInCredentials) => Promise<unknown>;
    signOut: () => Promise<unknown>;
}
export declare const AuthContext: React.Context<AuthContextState>;
export declare const useAuth: () => AuthContextState;
export declare const withAuth: <T extends WithAuthProps = WithAuthProps>(WrappedComponent: React.ComponentType<T>) => {
    (props: Omit<T, "user">): JSX.Element;
    displayName: string;
};
export interface RequiresAuthProps {
    children: JSX.Element;
    fallback: JSX.Element;
    signOutPath?: string;
}
export declare const RequiresAuth: ({ children, fallback, signOutPath }: RequiresAuthProps) => JSX.Element;
export interface WithAuthProps {
    user: AuthUser | null;
}
