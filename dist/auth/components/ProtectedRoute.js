import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth";
export var ProtectedRoute = function (_a) {
    var children = _a.children, fallback = _a.fallback, signOutPath = _a.signOutPath;
    var _b = useAuth(), user = _b.user, isLoading = _b.isLoading;
    var location = useLocation();
    if (isLoading) {
        return fallback || _jsx("div", { children: "Loading..." });
    }
    if (!user) {
        return _jsx(Navigate, { to: signOutPath || '/', state: { from: location }, replace: true });
    }
    return children;
};
