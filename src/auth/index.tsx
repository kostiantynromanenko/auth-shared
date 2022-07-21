import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";

export type IdToken = string;
export type AccessToken = string;
export type RefreshToken = string;

export type ClientMetaData =
    | {
    [key: string]: string;
}
    | undefined;

export interface SignInCredentials {
    username: string;
    password: string;
    clientMetadata?: ClientMetaData;
}

// export interface StorageProvider {
//     getAccessToken(): AccessToken | null;
//
//     storeAccessToken(token: AccessToken): void;
//
//     clearTokens(): void;
// }
//
// export class LocalStorageProvider implements StorageProvider {
//     getAccessToken(): AccessToken | null {
//         return localStorage.getItem("mf_access_token");
//     }
//
//     storeAccessToken(token: AccessToken): void {
//         localStorage.setItem("mf_access_token", token);
//     }
//
//     clearTokens(): void {
//         localStorage.removeItem("mf_access_token");
//     }
// }
//
// export type StorageType = 'local' | 'session';
//
// export const getStorageProvider = (type: StorageType) => {
//     return new LocalStorageProvider();
// }

export interface AuthServiceProvider {
    getAccessToken(): Promise<AccessToken>;

    signIn(credentials: SignInCredentials): Promise<any>;

    signOut(): Promise<void>;
}

export interface AuthContextState {
    accessToken: AccessToken | null;
    setAccessToken: (accessToken: AccessToken) => void;
    signIn: (credentials: SignInCredentials) => Promise<any>;
    signOut: () => Promise<void>;
}

export const useProvideAuth = (authProvider: AuthServiceProvider): AuthContextState => {
    const [accessToken, setAccessToken] = useState<AccessToken | null>(null);

    useEffect(() => {
        let mounted = true;
        const checkAuth = async () => {
            try {
                const token = await authProvider.getAccessToken();
                if (mounted) {
                    setAccessToken(token);
                }
            } catch {
                if (mounted) {
                    setAccessToken(null);
                }
            }
        };

        checkAuth().then();

        return () => {
            mounted = false;
        };
    }, [setAccessToken]);

    const signIn = useCallback(
        async (credentials: SignInCredentials) => authProvider.signIn(credentials),
        []
    );

    const signOut = useCallback(async () => {
        await authProvider.signOut();
        setAccessToken(null);
    }, [setAccessToken]);

    return {accessToken, signIn, signOut, setAccessToken};
};

export const AuthContext = createContext<AuthContextState>({
    accessToken: null,
    signIn: () => Promise.resolve(null),
    signOut: () => Promise.resolve(),
    setAccessToken: () => {
        return;
    }
});

export const useAuth = () => useContext(AuthContext);

