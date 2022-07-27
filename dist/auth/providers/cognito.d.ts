import { ReactElement } from 'react';
import { AuthUser, SignInCredentials } from '../auth';
import { AuthService } from '../auth-service';
export declare const CognitoAuth: import("@aws-amplify/auth/lib-esm/Auth").AuthClass;
export declare class CognitoAuthService implements AuthService {
    signIn({ username, password }: SignInCredentials): Promise<any>;
    signInWithRedirect(): Promise<any>;
    signOut(): Promise<void>;
    isAuthenticated(): Promise<boolean>;
    getUser(): Promise<AuthUser>;
    handleAuthRedirect(): Promise<AuthUser>;
}
export interface CognitoAuthProviderProps {
    children: ReactElement;
}
export declare const CognitoAuthProvider: ({ children }: CognitoAuthProviderProps) => JSX.Element;
