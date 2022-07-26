import React, {ReactElement, useEffect, useState} from "react";
import {AuthContext, AuthContextState, AuthUser} from "./auth";
import {createAuthService} from "./create-auth-service";

const useProvideAuth = (provider: 'okta' | 'cognito'): AuthContextState => {
    const authService = createAuthService(provider);
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
    children: ReactElement
}

export const OktaAuthContextProvider = ({ children }: ProviderProps) => {
    const auth = useProvideAuth('okta');
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const CognitoAuthContextProvider = ({ children }: ProviderProps) => {
    const auth = useProvideAuth('cognito');
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
