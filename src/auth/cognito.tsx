import React, {ReactNode, useEffect, useState} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {AuthContext, AuthContextState, AuthUser, SignInCredentials} from './auth';
import {HubCallback} from "@aws-amplify/core/src/Hub";

export const CognitoAuth = Auth;

const useProvideCognitoAuth = (): AuthContextState => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        Hub.listen('auth', authCallback);

        defineUser().then();

        return (): void => {
            Hub.remove('auth', authCallback);
        };
    }, []);

    const authCallback: HubCallback = async ({payload}) => {
        console.log('Hub event: ' + payload.event);
        await defineUser();
    }

    const defineUser = async (): Promise<void> => {
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

        setLoading(false);
    }

    const signIn = async ({username, password}: SignInCredentials): Promise<AuthUser> => {
        const cognitoUser: CognitoUser = await CognitoAuth.signIn({username, password});

        if (cognitoUser?.challengeName === 'NEW_PASSWORD_REQUIRED') {
            await CognitoAuth.completeNewPassword(cognitoUser, password);
            return Promise.reject('New password confirmed.');
        }

        const authUser: AuthUser = {
            username,
            email: cognitoUser.getUsername()
        };

        return Promise.resolve(authUser);
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
