import React from "react";
import {AuthContextState, useAuth} from "../auth";

export interface WithAuthProps extends AuthContextState {}

export const withAuth = <T extends WithAuthProps = WithAuthProps>(
    WrappedComponent: React.ComponentType<T>
) => {
    const displayName =
        WrappedComponent.displayName || "Component";

    const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
        const authProps = useAuth();
        return <WrappedComponent {...authProps} {...(props as T)} />;
    };

    ComponentWithAuth.displayName = `withAuth(${displayName})`;

    return ComponentWithAuth;
}
