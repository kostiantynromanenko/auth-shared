import { AuthUser, SignInCredentials } from "./auth";
export interface AuthService {
    signIn: (credentials: SignInCredentials) => Promise<unknown>;
    signInWithRedirect: () => Promise<unknown>;
    signOut: () => Promise<unknown>;
    isAuthenticated(): Promise<boolean>;
    getUser(): Promise<AuthUser>;
    handleAuthRedirect(): Promise<AuthUser | null>;
}
