import {AuthUser} from "./auth";

export interface AuthService {
    signIn: () => Promise<unknown>;
    signOut: () => Promise<unknown>;
    checkSession: () => Promise<AuthUser>;
}
