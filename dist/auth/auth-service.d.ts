import { AuthUser } from "./auth";
export interface AuthService {
    signIn: () => Promise<unknown>;
    signOut: () => Promise<unknown>;
    isAuthenticated(): Promise<boolean>;
    getUser(): Promise<AuthUser>;
    handleAuthRedirect(): Promise<AuthUser | null>;
}
