import React from 'react';
import {Auth} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {AuthUser} from './auth';
import {AuthService} from './auth-service';

export class CognitoAuthService implements AuthService {
    constructor(private config) {
        Auth.configure(config);
    }

    signIn(): Promise<unknown> {
        return Auth.signIn({
            username: '',
            password: ''
        });
    }

    signOut(): Promise<unknown> {
        return Auth.signOut();
    }

    getUser(): Promise<AuthUser> {
        return Auth.currentAuthenticatedUser().then((user: CognitoUser) => ({
            username: user.getUsername(),
            email: user.getUsername()
        }));
    }

    isAuthenticated(): Promise<boolean> {
        return Auth.currentSession().then((session) => session && session.isValid());
    }

    handleAuthRedirect(): Promise<any> {
        return Promise.resolve();
    }
}
