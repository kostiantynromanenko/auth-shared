import { ReactElement } from "react";
import { OktaAuthOptions } from "@okta/okta-auth-js";
export interface ProviderProps {
    children: ReactElement;
}
export interface OktaAuthContextProviderProps extends ProviderProps {
    config: OktaAuthOptions;
}
export declare const OktaAuthContextProvider: ({ children, config }: OktaAuthContextProviderProps) => JSX.Element;
export declare const CognitoAuthContextProvider: ({ children }: ProviderProps) => JSX.Element;
