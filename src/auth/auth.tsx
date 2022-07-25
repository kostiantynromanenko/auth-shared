import React, {createContext, useContext} from 'react';
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
    isLoading: boolean,
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
    fallback: JSX.Element,
    signOutPath?: string
}

export const RequiresAuth = ({ children, fallback, signOutPath }: RequiresAuthProps) => {
    const {user, isLoading} = useAuth();
    const location = useLocation();

    if (isLoading) {
        return fallback;
    }

    if (!user) {
        return <Navigate to={signOutPath || '/login'} state={{from: location}} replace/>;
    }

    return children;
}

export interface WithAuthProps {
    user: AuthUser | null;
}

export const withAuth = <T extends WithAuthProps = WithAuthProps>(
    WrappedComponent: React.ComponentType<T>
) => {
    const displayName =
        WrappedComponent.displayName || "Component";

    const ComponentWithTheme = (props: Omit<T, keyof WithAuthProps>) => {
        const { user } = useAuth();

        return <WrappedComponent user={user} {...(props as T)} />;
    };

    ComponentWithTheme.displayName = `withAuth(${displayName})`;

    return ComponentWithTheme;
}
