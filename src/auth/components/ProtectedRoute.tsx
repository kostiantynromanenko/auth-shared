import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../auth";

export interface ProtectedRouteProps {
    children: JSX.Element,
    fallback?: JSX.Element,
    signOutPath?: string
}

export const ProtectedRoute = ({ children, fallback, signOutPath }: ProtectedRouteProps) => {
    const {user, isLoading} = useAuth();
    const location = useLocation();

    if (isLoading) {
        return fallback || <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to={signOutPath || '/'} state={{from: location}} replace/>;
    }

    return children;
}
