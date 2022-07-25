import { ReactNode } from 'react';
export declare const CognitoAuth: import("@aws-amplify/auth/lib-esm/Auth").AuthClass;
export declare const checkSession: () => Promise<void>;
export declare const CognitoAuthProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
