import { OktaAuthOptions } from "@okta/okta-auth-js";
import { AuthService } from "./auth-service";
import { AuthUser, SignInCredentials } from "./auth";
export declare class OktaAuthService implements AuthService {
    private config;
    private oktaAuth;
    constructor(config: OktaAuthOptions);
    signIn({ username, password }: SignInCredentials): Promise<any>;
    signInWithRedirect(): Promise<void>;
    signOut(): Promise<void>;
    isAuthenticated(): Promise<boolean>;
    getUser(): Promise<AuthUser>;
    handleAuthRedirect(): Promise<AuthUser | null>;
}
