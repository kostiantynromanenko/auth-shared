import React, {ReactElement, useEffect, useState} from 'react';
import {OktaAuth, OktaAuthOptions, toRelativeUrl, UserClaims} from "@okta/okta-auth-js";
import {AuthContextState, AuthUser, SignInCredentials} from "./auth";
import {Security} from "@okta/okta-react";
import {createBrowserHistory} from "history";
import {AuthService} from "./auth-service";

const Okta = new OktaAuth({
    issuer: 'https://dev-71768760.okta.com/oauth2/default',
    clientId: '0oa5wzyrw0vOyoX995d7',
    redirectUri: 'http://localhost:3000/login'
} as OktaAuthOptions);

const useProvideAuth = (): AuthContextState => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

    }, []);

    const signIn = async ({username, password}: SignInCredentials): Promise<AuthUser> => {
        setLoading(true);
        return Okta.signInWithCredentials({username, password}).then((transaction) => {
            const authUser = transaction.user as AuthUser;
            setUser(authUser);
            setLoading(false);
            return authUser;
        });
    };

    const signOut = (): Promise<void> => Okta.signOut().then(() => setUser(null));

    return {
        user,
        isLoading,
        signIn,
        signOut,
    };
};

export const OktaAuthProvider = ({children}: { children: ReactElement }) => {
    const history = createBrowserHistory();
    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        <Security oktaAuth={Okta} restoreOriginalUri={restoreOriginalUri}>
            {children}
        </Security>
    );
}

export class OktaAuthService implements AuthService {
    signIn(): Promise<unknown> {
        return Okta.signInWithRedirect();
    }

    signOut(): Promise<unknown> {
        return Okta.signOut();
    }

    checkSession(): Promise<any> {
        return Okta.getUser<AuthUser>();
    }
}
