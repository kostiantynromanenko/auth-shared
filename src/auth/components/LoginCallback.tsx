import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth";

export interface LoginCallbackProps {
    redirectUrl?: string;
    fallback?: JSX.Element;
}

export const LoginCallback = ({redirectUrl, fallback}: LoginCallbackProps) => {
    const {handleAuthRedirect} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleAuthRedirect().then(() => navigate(redirectUrl || '/', {replace: true})).catch();
    }, []);

    return fallback || <div>Loading...</div>
}
