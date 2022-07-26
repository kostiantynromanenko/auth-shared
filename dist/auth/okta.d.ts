import { OktaAuthOptions } from "@okta/okta-auth-js";
import { AuthService } from "./auth-service";
export declare class OktaAuthService implements AuthService {
    private config;
    private oktaAuth;
    constructor(config: OktaAuthOptions);
    signIn(): Promise<unknown>;
    signOut(): Promise<unknown>;
    isAuthenticated(): Promise<boolean>;
    getUser(): Promise<any>;
    handleAuthRedirect(): Promise<boolean>;
}
