import React, { ReactNode } from 'react';
export declare const CognitoAuth: import("@aws-amplify/auth/lib-esm/Auth").AuthClass;
export declare const CognitoAuthProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
declare const RequiresAuth: ({ children }: {
    children: ReactNode | ReactNode[];
}) => React.ReactNode;
export default RequiresAuth;
