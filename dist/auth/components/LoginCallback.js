import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
export var LoginCallback = function (_a) {
    var redirectUrl = _a.redirectUrl, fallback = _a.fallback;
    var handleAuthRedirect = useAuth().handleAuthRedirect;
    var navigate = useNavigate();
    useEffect(function () {
        handleAuthRedirect().then(function () { return navigate(redirectUrl || '/'); }).catch();
    }, []);
    return fallback || _jsx("div", { children: "Loading..." });
};
