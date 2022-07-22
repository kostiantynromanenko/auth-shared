import React, { ReactNode, useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { AuthContext, AuthContextState, AuthUser, SignInCredentials } from './auth';
import { CognitoUser } from 'amazon-cognito-identity-js';

export const CognitoAuth = Auth;

const useProvideCognitoAuth = (): AuthContextState => {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const authListener = () => {
            checkUser().catch();
        };

        authListener();

        Hub.listen('auth', authListener);

        return (): void => {
            Hub.remove('auth', authListener);
        };
    }, []);

    const checkUser = async (): Promise<void> => {
        try {
            const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();

            if (cognitoUser) {
                const authUser: AuthUser = {
                    email: cognitoUser.getUsername(),
                    username: cognitoUser.getUsername(),
                };

                setUser(authUser);
            }
        } catch (error) {
            setUser(null);
        }
    };

    const signIn = async ({ username, password }: SignInCredentials): Promise<AuthUser> => {
        const cognitoUser: CognitoUser = await CognitoAuth.signIn({ username, password });

        if (cognitoUser?.challengeName === 'NEW_PASSWORD_REQUIRED') {
            await CognitoAuth.completeNewPassword(cognitoUser, password);
            return Promise.reject('New password confirmed.');
        }

        const authUser: AuthUser = {
            username,
            email: cognitoUser.getUsername(),
        };

        return Promise.resolve(authUser);
    };

    const signOut = () => CognitoAuth.signOut();

    return {
        user,
        signIn,
        signOut,
    };
};

export const CognitoAuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = useProvideCognitoAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
