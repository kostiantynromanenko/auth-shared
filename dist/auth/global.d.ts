/// <reference types="react" />
import { OktaAuthOptions } from "@okta/okta-auth-js";
export interface LoginCallbackProps {
    redirectUrl?: string;
    fallback?: string;
}
export declare const LoginCallback: ({ redirectUrl, fallback }: LoginCallbackProps) => string | JSX.Element;
export interface ProviderProps {
    children: JSX.Element;
}
export interface OktaAuthContextProviderProps extends ProviderProps {
    config: OktaAuthOptions;
}
export declare const OktaAuthContextProvider: ({ children, config }: OktaAuthContextProviderProps) => JSX.Element;
export declare const CognitoAuthContextProvider: ({ children }: ProviderProps) => JSX.Element;
