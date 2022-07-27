import React from "react";
import { AuthContextState } from "../auth";
export interface WithAuthProps extends AuthContextState {
}
export declare const withAuth: <T extends WithAuthProps = WithAuthProps>(WrappedComponent: React.ComponentType<T>) => {
    (props: Omit<T, keyof WithAuthProps>): JSX.Element;
    displayName: string;
};
