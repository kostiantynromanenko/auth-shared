import { ReactElement } from 'react';
import { AuthService } from "./auth-service";
export declare const OktaAuthProvider: ({ children }: {
    children: ReactElement;
}) => JSX.Element;
export declare class OktaAuthService implements AuthService {
    signIn(): Promise<unknown>;
    signOut(): Promise<unknown>;
    checkSession(): Promise<any>;
}
