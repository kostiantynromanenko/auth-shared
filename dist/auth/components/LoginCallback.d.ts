/// <reference types="react" />
export interface LoginCallbackProps {
    redirectUrl?: string;
    fallback?: JSX.Element;
}
export declare const LoginCallback: ({ redirectUrl, fallback }: LoginCallbackProps) => JSX.Element;
