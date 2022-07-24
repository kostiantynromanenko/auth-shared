import React, {ReactNode, useEffect, useState} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {AuthContext, AuthContextState, AuthUser, SignInCredentials} from './auth';
import {HubCallback} from "@aws-amplify/core/src/Hub";

export const CognitoAuth = Auth;

const useProvideCognitoAuth = (): AuthContextState => {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        Hub.listen('auth', authCallback);

        getUser().then((authUser) => setUser(authUser));

        return (): void => {
            Hub.remove('auth', authCallback);
        };
    }, []);

    const authCallback: HubCallback = ({payload}) => {
        switch (payload.event) {
            case 'signIn':
            case 'cognitoHostedUI':
                getUser().then((authUser) => setUser(authUser));
                break;
            case 'signIn_failure':
            case 'cognitoHostedUI_failure':
                console.log('Error', payload.data);
                break;
            case 'signOut':
                setUser(null);
                break;
        }
    }

    const getUser = (): Promise<AuthUser> => {
        return Auth.currentAuthenticatedUser().then((user: CognitoUser) => ({
            username: user.getUsername(),
            email: user.getUsername()
        }));
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

    const signOut = (): Promise<void> => {
        return CognitoAuth.signOut();
    }

    return {
        user,
        signIn,
        signOut,
    };
};

export const CognitoAuthProvider = ({children}: { children: ReactNode }) => {
    const auth = useProvideCognitoAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
