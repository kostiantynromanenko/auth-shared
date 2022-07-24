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

        return (): void => {
            Hub.remove('auth', authCallback);
        };
    }, []);

    const authCallback: HubCallback = ({ payload }) => {
        switch (payload.event) {
            case 'signIn':
            case 'cognitoHostedUI': {
                const authUser: AuthUser = {
                    email: payload.data.getUsername(),
                    username: payload.data.getUsername(),
                };
                setUser(authUser);
            } break;
            case 'signIn_failure':
            case 'cognitoHostedUI_failure':
                console.log('Error', payload.data);
                break;
        }

        setLoading(false);
    }

    // const checkUser = async (): Promise<void> => {
    //     try {
    //         const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
    //
    //         if (cognitoUser) {
    //             const authUser: AuthUser = {
    //                 email: cognitoUser.getUsername(),
    //                 username: cognitoUser.getUsername(),
    //             };
    //
    //             setUser(authUser);
    //         }
    //     } catch (error) {
    //         setUser(null);
    //     }
    //
    //     setLoading(false);
    // };

    const signIn = async ({username, password}: SignInCredentials): Promise<AuthUser> => {
        setLoading(true);
        const cognitoUser: CognitoUser = await CognitoAuth.signIn({username, password});

        if (cognitoUser?.challengeName === 'NEW_PASSWORD_REQUIRED') {
            await CognitoAuth.completeNewPassword(cognitoUser, password);
            return Promise.reject('New password confirmed.');
        }

        const authUser: AuthUser = {
            username,
            email: cognitoUser.getUsername()
        };

        setLoading(false);

        return Promise.resolve(authUser);
    };

    const signOut = (): Promise<void> => {
        setLoading(true);
        return CognitoAuth.signOut().then(() => setLoading(false));
    }

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


export const listenForAuth = () => {
    Hub.listen('auth', ({ payload }) => {
        switch (payload.event) {
            case 'signIn':
            case 'cognitoHostedUI':
                console.log('Authenticated...');
                console.log(payload.data);
                break;
            case 'signIn_failure':
            case 'cognitoHostedUI_failure':
                console.log('Error', payload.data);
                break;
        }
    });
}
