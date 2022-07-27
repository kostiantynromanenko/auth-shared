import React, {ReactElement} from 'react';
import {OktaAuth, OktaAuthOptions} from "@okta/okta-auth-js";
import {AuthService} from "../auth-service";
import {AuthContext, AuthUser, SignInCredentials} from "../auth";
import {useProvideAuth} from "./use-provide-auth";

export class OktaAuthService implements AuthService {
    private oktaAuth: OktaAuth;

    constructor(private config: OktaAuthOptions) {
        this.oktaAuth = new OktaAuth(config);
    }

    signIn({username, password}: SignInCredentials): Promise<any> {
        return this.oktaAuth.signInWithCredentials({
            username,
            password
        });
    }

    signInWithRedirect(): Promise<void> {
        return this.oktaAuth.signInWithRedirect();
    }

    signOut(): Promise<void> {
        return this.oktaAuth.signOut();
    }

    isAuthenticated(): Promise<boolean> {
        return this.oktaAuth.isAuthenticated();
    }

    getUser(): Promise<AuthUser> {
        return this.oktaAuth.getUser().then((user) => ({
            username: user.preferred_username,
            email: user.email
        } as AuthUser));
    }

    handleAuthRedirect(): Promise<AuthUser | null> {
        if (this.oktaAuth.token.isLoginRedirect()) {
            return this.oktaAuth.handleLoginRedirect()
                .then(() => this.getUser());
        }

        return Promise.reject('No logins redirected.');
    }
}

export interface OktaAuthProviderProps {
    children: ReactElement;
    config: OktaAuthOptions;
}

export const OktaAuthProvider = ({children, config}: OktaAuthProviderProps) => {
    const auth = useProvideAuth('okta', config);
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

