import React, {ReactNode, useEffect, useState} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {AuthContext, AuthContextState, AuthUser, SignInCredentials} from './auth';
import {AuthService} from './auth-service';

export const CognitoAuth = Auth;

const useProvideAuth = (): AuthContextState => {
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
        } catch (e: any) {
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

export const checkSession = async (): Promise<void> => {
    try {
        const user = await CognitoAuth.currentAuthenticatedUser();
        if (!user) {
            await CognitoAuth.federatedSignIn();
        }
    } catch (e) {
        await CognitoAuth.federatedSignIn();
    }
}

export const CognitoAuthProvider = ({children}: { children: ReactNode }) => {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export class CognitoAuthService implements AuthService {
    signIn(): Promise<unknown> {
        return Promise.resolve();
    }

    signOut(): Promise<unknown> {
        return Promise.resolve();
    }

    getUser(): Promise<AuthUser> {
        return CognitoAuth.currentAuthenticatedUser().then((user: CognitoUser) => ({
            username: user.getUsername(),
            email: user.getUsername()
        }));
    }

    isAuthenticated(): Promise<boolean> {
        return CognitoAuth.currentSession().then((session) => session && session.isValid());
    }
}
