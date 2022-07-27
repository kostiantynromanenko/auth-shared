/// <reference types="react" />
export interface ProtectedRouteProps {
    children: JSX.Element;
    fallback?: JSX.Element;
    signOutPath?: string;
}
export declare const ProtectedRoute: ({ children, fallback, signOutPath }: ProtectedRouteProps) => JSX.Element;
