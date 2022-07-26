import React, {useEffect, useState} from "react";
import {AuthContext, AuthContextState, AuthUser, SignInCredentials, useAuth} from "./auth";
import {createAuthService} from "./create-auth-service";
import {OktaAuthOptions} from "@okta/okta-auth-js";
import {useNavigate} from "react-router-dom";

export interface LoginCallbackProps {
    redirectUrl?: string;
    fallback?: string;
}

export const LoginCallback = ({redirectUrl, fallback}: LoginCallbackProps) => {
    const {handleAuthRedirect} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleAuthRedirect().then(() => navigate(redirectUrl || '/')).catch();
    }, []);

    return fallback || <div>Loading...</div>
}

const useProvideAuth = (providerType: 'okta' | 'cognito', config?: any): AuthContextState => {
    const [authService] = useState(() => createAuthService(providerType, config));
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        checkSession().then();
    }, [])

    const signIn = async (credentials: SignInCredentials): Promise<void> => {
        setLoading(true);
        try {
            await authService.signIn(credentials);
        } catch (e: Error) {
            setError('Sign in error: ' + e.message)
        }
        setLoading(false);
    };

    const signInWithRedirect = async (): Promise<void> => {
        setLoading(true);
        try {
            await authService.signInWithRedirect();
        } catch (e: Error) {
            setError('Sign in error: ' + e.message)
        }
        setLoading(false);
    };

    const signOut = async (): Promise<void> => {
        setLoading(true);
        try {
            await authService.signOut();
        } catch (e: Error) {
            setError('Sign out error: ' + e.message)
        }
        setLoading(false);
    }

    const handleAuthRedirect = async (): Promise<void> => {
        setLoading(true);
        try {
            const user = await authService.handleAuthRedirect();
            setUser(user);
        } catch (e: Error) {
            setError('Auth redirect error: ' + e.message);
        }
        setLoading(false);
    }

    const checkSession = async (): Promise<void> => {
        setLoading(true);
        try {
            const isAuthenticated = await authService.isAuthenticated();
            if (isAuthenticated) {
                const authUser = await authService.getUser();
                setUser(authUser);
            } else {
                setUser(null);
            }
        } catch (e) {
            setUser(null);
        }
        setLoading(false);
    }

    return {
        user,
        error,
        isLoading,
        handleAuthRedirect,
        checkSession,
        signIn,
        signInWithRedirect,
        signOut,
    }
}

export interface ProviderProps {
    children: JSX.Element;
}

export interface OktaAuthContextProviderProps extends ProviderProps {
    config: OktaAuthOptions
}

export const OktaAuthContextProvider = ({children, config}: OktaAuthContextProviderProps) => {
    const auth = useProvideAuth('okta', config);
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const CognitoAuthContextProvider = ({children}: ProviderProps) => {
    const auth = useProvideAuth('cognito');
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
