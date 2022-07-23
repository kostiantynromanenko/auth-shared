import { ReactNode } from 'react';
export declare const CognitoAuth: import("@aws-amplify/auth/lib-esm/Auth").AuthClass;
export declare const CognitoAuthProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export declare const RequiresAuth: ({ children }: {
    children: JSX.Element | JSX.Element[];
}) => JSX.Element | JSX.Element[];
