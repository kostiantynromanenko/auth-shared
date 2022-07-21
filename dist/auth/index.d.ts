import React from "react";
export declare type IdToken = string;
export declare type AccessToken = string;
export declare type RefreshToken = string;
export declare type ClientMetaData = {
    [key: string]: string;
} | undefined;
export interface SignInCredentials {
    username: string;
    password: string;
    clientMetadata?: ClientMetaData;
}
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
export declare const useProvideAuth: (authProvider: AuthServiceProvider) => AuthContextState;
export declare const AuthContext: React.Context<AuthContextState>;
export declare const useAuth: () => AuthContextState;
