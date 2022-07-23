import React, { createContext, useContext } from 'react';
import {Navigate, useLocation} from "react-router-dom";

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

export const AuthContext = createContext<AuthContextState>({
    user: null,
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

export const RequiresAuth = ({children}: { children: JSX.Element}) => {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};