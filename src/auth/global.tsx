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

    useEffect(() => {
        checkSession().then();
    }, [])

    const signIn = async () => {
        setLoading(true);
        await authService.signIn();
        setLoading(false);
    }

    const signOut = async () => {
        setLoading(true);
        await authService.signOut();
        setLoading(false);
    }

    const handleAuthRedirect = async () => {
        const user = await authService.handleAuthRedirect();
        setUser(user);
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

    return {
        user,
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
