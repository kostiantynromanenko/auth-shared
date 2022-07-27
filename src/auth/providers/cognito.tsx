import React, {ReactElement} from 'react';
import {Auth} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {AuthContext, AuthUser, SignInCredentials} from '../auth';
import {AuthService} from '../auth-service';
import {useProvideAuth} from "./use-provide-auth";

export const CognitoAuth = Auth;

export class CognitoAuthService implements AuthService {
    signIn({username, password}: SignInCredentials): Promise<any> {
        return CognitoAuth.signIn({
            username,
            password
        });
    }

    signInWithRedirect(): Promise<any> {
        return CognitoAuth.federatedSignIn();
    }

    signOut(): Promise<void> {
        return CognitoAuth.signOut();
    }

    isAuthenticated(): Promise<boolean> {
        return this.getUser().then((user) => !!user);
    }

    getUser(): Promise<AuthUser> {
        return CognitoAuth.currentAuthenticatedUser().then((user: CognitoUser) => ({
            username: user.getUsername(),
            email: user.getUsername()
        } as AuthUser));
    }

    handleAuthRedirect(): Promise<AuthUser> {
        return this.getUser();
    }
}

export interface CognitoAuthProviderProps {
    children: ReactElement;
}

export const CognitoAuthProvider = ({children}: CognitoAuthProviderProps) => {
    const auth = useProvideAuth('cognito');
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
