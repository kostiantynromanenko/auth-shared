/// <reference types="react" />
import { OktaAuthOptions } from "@okta/okta-auth-js";
export declare const LoginCallback: ({ redirectUrl }: {
    redirectUrl?: string | undefined;
}) => JSX.Element;
export interface ProviderProps {
    children: JSX.Element;
}
export interface OktaAuthContextProviderProps extends ProviderProps {
    config: OktaAuthOptions;
}
export declare const OktaAuthContextProvider: ({ children, config }: OktaAuthContextProviderProps) => JSX.Element;
export declare const CognitoAuthContextProvider: ({ children }: ProviderProps) => JSX.Element;
