import { ReactNode } from 'react';
import { AuthUser } from './auth';
import { AuthService } from './auth-service';
export declare const CognitoAuth: import("@aws-amplify/auth/lib-esm/Auth").AuthClass;
export declare const checkSession: () => Promise<void>;
export declare const CognitoAuthProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export declare class CognitoAuthService implements AuthService {
    signIn(): Promise<unknown>;
    signOut(): Promise<unknown>;
    getUser(): Promise<AuthUser>;
    isAuthenticated(): Promise<boolean>;
    handleAuthRedirect(): Promise<any>;
}
