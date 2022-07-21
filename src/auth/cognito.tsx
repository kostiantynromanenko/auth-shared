import React, {PropsWithChildren} from "react";
import {
    AccessToken,
    AuthContext,
    AuthServiceProvider,
    SignInCredentials, useProvideAuth
} from "./index";
import {a, Auth} from 'aws-amplify';
import {CognitoUser} from "amazon-cognito-identity-js";

export class CognitoAuthService implements AuthServiceProvider {
    async getAccessToken(): Promise<AccessToken> {
        const session = await Auth.currentSession();
        const token = session.getAccessToken();
        return token.getJwtToken();
    }

    signIn(credentials: SignInCredentials): Promise<CognitoUser> {
        return Auth.signIn(credentials.username, credentials.password, credentials.clientMetadata);
    }

    signOut(): Promise<void> {
        return Auth.signOut();
    }
}

export const CognitoAuthProvider = ({children}: PropsWithChildren<any>) => {
    const authService = new CognitoAuthService();
    const auth = useProvideAuth(authService);
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
