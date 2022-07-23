import React from 'react';
import { RouteProps } from "react-router-dom";
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
export interface RequiresAuthProps {
    children: JSX.Element;
    fallback: JSX.Element;
}
interface PrivateRouteProps extends RouteProps {
    fallback: JSX.Element;
}
export declare const PrivateRoute: ({ fallback, element, children, ...rest }: PrivateRouteProps) => JSX.Element;
export {};
