import { AuthUser } from './auth';
import { AuthService } from './auth-service';
export declare class CognitoAuthService implements AuthService {
    signIn(): Promise<unknown>;
    signOut(): Promise<unknown>;
    getUser(): Promise<AuthUser>;
    isAuthenticated(): Promise<boolean>;
    handleAuthRedirect(): Promise<any>;
}
