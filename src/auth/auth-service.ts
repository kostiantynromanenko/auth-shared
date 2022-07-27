import {AuthUser, SignInCredentials} from "./auth";

export interface AuthService {
    signIn: (credentials: SignInCredentials) => Promise<any>;
    signInWithRedirect: () => Promise<any>;
    signOut: () => Promise<unknown>;

    isAuthenticated(): Promise<boolean>

    getUser(): Promise<AuthUser>;

    handleAuthRedirect(): Promise<AuthUser | null>;
}

