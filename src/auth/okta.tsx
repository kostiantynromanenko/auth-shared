import React from 'react';
import {OktaAuth, OktaAuthOptions} from "@okta/okta-auth-js";
import {AuthService} from "./auth-service";

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

    handleAuthRedirect(): Promise<boolean> {
        const handleLoginRedirect = async () => {
            await this.oktaAuth.handleLoginRedirect();
        };

        if (this.oktaAuth.token.isLoginRedirect()) {
            handleLoginRedirect()
                .then(() => {
                    console.log(this.oktaAuth.getUser());
                })
                .catch(e => {
                console.error(e);
            });

            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    }
}
