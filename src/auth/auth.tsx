import React, {createContext, useContext} from 'react';
import {Navigate, Route, RouteProps, useLocation} from "react-router-dom";

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

export const AuthContext = createContext<AuthContextState>({
    user: null,
    isLoading: true,
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

export interface RequiresAuthProps {
    children: JSX.Element,
    fallback: JSX.Element
}

interface PrivateRouteProps extends RouteProps {
    fallback: JSX.Element;
}

export const PrivateRoute = ({fallback, children, ...rest}: PrivateRouteProps) => {
    const {user, isLoading} = useAuth();
    const location = useLocation();

    let routeContent = children;

    if (isLoading) {
        routeContent = fallback;
    }

    if (!user) {
        routeContent = <Navigate to="/" state={{from: location}} replace/>;
    }

    return <Route {...rest} element={routeContent}/>
}
