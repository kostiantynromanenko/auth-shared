import {createAuthService, ProviderType} from "./create-auth";
import {AuthContextState, AuthUser, SignInCredentials} from "../auth";
import {useEffect, useState} from "react";

export const useProvideAuth = (providerType: ProviderType, config?: any): AuthContextState => {
    const [authService] = useState(() => createAuthService(providerType, config));
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        checkSession().then();
    }, [])

    const signIn = async (credentials: SignInCredentials): Promise<void> => {
        setLoading(true);
        try {
            await authService.signIn(credentials);
        } catch (e: any) {
            setError('Sign in error: ' + e.message)
        }
        setLoading(false);
    };

    const signInWithRedirect = async (): Promise<void> => {
        setLoading(true);
        try {
            await authService.signInWithRedirect();
        } catch (e: any) {
            setError('Sign in error: ' + e.message)
        }
        setLoading(false);
    };

    const signOut = async (): Promise<void> => {
        setLoading(true);
        try {
            await authService.signOut();
        } catch (e: any) {
            setError('Sign out error: ' + e.message)
        }
        setLoading(false);
    }

    const handleAuthRedirect = async (): Promise<void> => {
        setLoading(true);
        try {
            const user = await authService.handleAuthRedirect();
            setUser(user);
        } catch (e: any) {
            setError('Auth redirect error: ' + e.message);
        }
        setLoading(false);
    }

    const checkSession = async (): Promise<void> => {
        setLoading(true);
        try {
            const isAuthenticated = await authService.isAuthenticated();
            if (isAuthenticated) {
                const authUser = await authService.getUser();
                setUser(authUser);
            } else {
                setUser(null);
            }
        } catch (e: any) {
            setUser(null);
        }
        setLoading(false);
    }

    return {
        user,
        error,
        isLoading,
        handleAuthRedirect,
        signIn,
        signInWithRedirect,
        signOut,
    }
}
