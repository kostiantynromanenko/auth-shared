import { PropsWithChildren } from "react";
import { AccessToken, AuthServiceProvider, SignInCredentials } from "./index";
import { CognitoUser } from "amazon-cognito-identity-js";
export declare class CognitoAuthService implements AuthServiceProvider {
    getAccessToken(): Promise<AccessToken>;
    signIn(credentials: SignInCredentials): Promise<CognitoUser>;
    signOut(): Promise<void>;
}
export declare const CognitoAuthProvider: ({ children }: PropsWithChildren<any>) => JSX.Element;
