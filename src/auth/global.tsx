import React, {useEffect, useState} from "react";
import {AuthContext, AuthContextState, AuthUser, useAuth} from "./auth";
import {createAuthService} from "./create-auth-service";
import {OktaAuthOptions} from "@okta/okta-auth-js";
import {useNavigate} from "react-router-dom";

export const LoginCallback = ({redirectUrl = '/'}) => {
    const {handleAuthRedirect} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleAuthRedirect().then(() => navigate(redirectUrl)).catch();
    }, []);

    return <div>Loading...</div>
}

const useProvideAuth = (providerType: 'okta' | 'cognito', config?: any): AuthContextState => {
    const [authService] = useState(() => createAuthService(providerType, config));
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        checkSession().then();
    }, [])

    const signIn = async () => withLoading(async () => {
        try {
            await authService.signIn();
        } catch (e: Error) {
            setError('Sign in error: ' + e.message)
        }
    });

    const signOut = async () => {
        setLoading(true);
        try {
            await authService.signOut();
        } catch (e: Error) {
            setError('Sign out error: ' + e.message)
        }
        setLoading(false);
    }

    const handleAuthRedirect = async () => {
        setLoading(true);
        try {
            const user = await authService.handleAuthRedirect();
            setUser(user);
        } catch (e: Error) {
            setError('Auth redirect error: ' + e.message);
        }
        setLoading(false);
    }

    const checkSession = async () => {
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

    const withLoading = (action: () => void) => {
        setLoading(true);
        action();
        setLoading(false);
    }

    return {
        user,
        error,
        isLoading,
        handleAuthRedirect,
        checkSession,
        signIn,
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
