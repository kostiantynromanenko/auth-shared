import React, {ReactNode, useEffect, useState} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {AuthContext, AuthContextState, AuthUser, SignInCredentials} from './auth';

export const CognitoAuth = Auth;

const useProvideCognitoAuth = (): AuthContextState => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        Hub.listen('auth', () => checkUser());

        checkUser().then();

        return (): void => {
            Hub.remove('auth', () => checkUser());
        };
    }, []);

    const checkUser = async (): Promise<void> => {
        try {
            setLoading(true);

            const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();

            if (cognitoUser) {
                const authUser: AuthUser = {
                    username: cognitoUser.getUsername(),
                    email: cognitoUser.getUsername()
                }
                setUser(authUser);
            } else {
                setUser(null);
            }
        } catch (e: Error) {
            setUser(null);
        } finally {
            setLoading(false)
        }
    }

    const signIn = async ({username, password}: SignInCredentials): Promise<CognitoUser> => {
        return CognitoAuth.signIn({username, password});
    };

    const signOut = (): Promise<void> => CognitoAuth.signOut();

    return {
        user,
        isLoading,
        signIn,
        signOut,
    };
};

export const CognitoAuthProvider = ({children}: { children: ReactNode }) => {
    const auth = useProvideCognitoAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
