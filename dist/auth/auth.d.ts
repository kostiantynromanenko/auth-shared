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
    error: string | null;
    signIn: (credentials: SignInCredentials) => Promise<unknown>;
    signInWithRedirect: () => Promise<unknown>;
    signOut: () => Promise<unknown>;
    handleAuthRedirect: () => Promise<unknown>;
}
export declare const AuthContext: React.Context<AuthContextState>;
export declare const useAuth: () => AuthContextState;
export interface WithAuthProps extends AuthContextState {
}
export declare const withAuth: <T extends WithAuthProps = WithAuthProps>(WrappedComponent: React.ComponentType<T>) => {
    (props: Omit<T, keyof WithAuthProps>): JSX.Element;
    displayName: string;
};
export interface ProtectedRouteProps {
    children: JSX.Element;
    fallback?: JSX.Element;
    signOutPath?: string;
}
export declare const ProtectedRoute: ({ children, fallback, signOutPath }: ProtectedRouteProps) => JSX.Element;
