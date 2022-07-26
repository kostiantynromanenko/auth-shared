import React, {ReactElement, useEffect, useState} from "react";
import {AuthContext, AuthContextState, AuthUser, useAuth} from "./auth";
import {createAuthService} from "./create-auth-service";
import {OktaAuthOptions} from "@okta/okta-auth-js";

export const LoginCallback = () => {
    const { handleAuthRedirect } = useAuth();
    useEffect(() => {
        handleAuthRedirect().catch();
    }, [handleAuthRedirect]);

    return <div>Loading...</div>
}

const useProvideAuth = (providerType: 'okta' | 'cognito', config?: any): AuthContextState => {
    const [authService] = useState(() => createAuthService(providerType, config));
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);

    // useEffect(() => {
    //     setLoading(true);
    //     authService.isAuthenticated().then((isAuthenticated) => {
    //         console.log('Authenticated: ' + isAuthenticated);
    //         if (isAuthenticated) {
    //             authService.getUser().then((user) => {
    //                 console.log('User:');
    //                 console.log(user);
    //                 setUser(user);
    //                 setLoading(false);
    //             })
    //         } else {
    //             setUser(null);
    //             setLoading(false);
    //         }
    //     });
    // }, [])

    const signIn = (): Promise<any> => {
        setLoading(true);
        return authService.signIn().then(() => setLoading(false));
    }

    const signOut = (): Promise<any> => {
        setLoading(true);
        return authService.signOut().then(() => setLoading(false));
    }

    const handleAuthRedirect = () => authService.handleAuthRedirect();

    return {
        user,
        isLoading,
        handleAuthRedirect,
        signIn,
        signOut
    }
}

export interface ProviderProps {
    children: ReactElement;
}

export interface OktaAuthContextProviderProps extends ProviderProps {
    config: OktaAuthOptions
}

export const OktaAuthContextProvider = ({ children, config }: OktaAuthContextProviderProps) => {
    const auth = useProvideAuth('okta', config);
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const CognitoAuthContextProvider = ({ children }: ProviderProps) => {
    const auth = useProvideAuth('cognito');
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
