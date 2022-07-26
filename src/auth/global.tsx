import React, {ReactElement, useEffect, useState} from "react";
import {AuthContext, AuthContextState, AuthUser} from "./auth";
import {createAuthService} from "./create-auth-service";
import {OktaAuthOptions} from "@okta/okta-auth-js";

const useProvideAuth = (providerType: 'okta' | 'cognito', config?: any): AuthContextState => {
    const authService = createAuthService(providerType, config);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        authService.isAuthenticated().then((isAuthenticated) => {
            if (isAuthenticated) {
                authService.getUser().then((user) => {
                    setUser(user);
                    setLoading(false);
                })
            } else {
                setUser(null);
            }

            setLoading(false);
        });
    })

    const signIn = (): Promise<any> => {
        setLoading(true);
        return authService.signIn().then(() => setLoading(false));
    }

    const signOut = (): Promise<any> => {
        setLoading(true);
        return authService.signOut().then(() => setLoading(false));
    }

    return {
        user,
        isLoading,
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
