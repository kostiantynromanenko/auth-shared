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
}
