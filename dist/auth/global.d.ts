import { ReactElement } from "react";
export interface ProviderProps {
    children: ReactElement;
}
export declare const OktaAuthContextProvider: ({ children }: ProviderProps) => JSX.Element;
export declare const CognitoAuthContextProvider: ({ children }: ProviderProps) => JSX.Element;
