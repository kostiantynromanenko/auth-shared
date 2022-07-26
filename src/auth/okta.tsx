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
                .then(async () => {
                    const user = await this.oktaAuth.getUser();
                    return {
                        username: user.preferred_username,
                        email: user.email
                    } as AuthUser;
                });
        }

        return Promise.reject(null);
    }
}
