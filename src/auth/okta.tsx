import React from 'react';
import {OktaAuth, OktaAuthOptions} from "@okta/okta-auth-js";
import {AuthService} from "./auth-service";
import {AuthUser} from "./auth";

export class OktaAuthService implements AuthService {
    private oktaAuth: OktaAuth;

    constructor(private config: OktaAuthOptions) {
        this.oktaAuth = new OktaAuth(config);
    }

    signIn(): Promise<unknown> {
        return this.oktaAuth.signInWithRedirect();
    }

    signOut(): Promise<unknown> {
        return this.oktaAuth.signOut();
    }

    isAuthenticated(): Promise<boolean> {
        return this.oktaAuth.isAuthenticated();
    }

    getUser(): Promise<any> {
        return this.oktaAuth.getUser();
    }

    handleAuthRedirect(): Promise<AuthUser | null> {
        if (this.oktaAuth.token.isLoginRedirect()) {
            return this.oktaAuth.handleLoginRedirect()
                .then(() => this.getAuthUser());
        }

        return Promise.reject('No logins redirected.');
    }

    private getAuthUser(): Promise<AuthUser> {
        return this.oktaAuth.getUser().then((user) => ({
            username: user.preferred_username,
            email: user.email
        } as AuthUser));
    }
}
