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
    }, [handleAuthRedirect]);

    return <div>Loading...</div>
}

const useProvideAuth = (providerType: 'okta' | 'cognito', config?: any): AuthContextState => {
    const [authService] = useState(() => createAuthService(providerType, config));
    const [user] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);

    const signIn = (): Promise<any> => {
        setLoading(true);
        return authService.signIn().then(() => setLoading(false));
    }

    const signOut = (): Promise<any> => {
        setLoading(true);
        return authService.signOut().then(() => setLoading(false));
    }

    const handleAuthRedirect = () => authService.handleAuthRedirect()
        .then(() => setLoading(false));

    return {
        user,
        isLoading,
        handleAuthRedirect,
        signIn,
        signOut
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
