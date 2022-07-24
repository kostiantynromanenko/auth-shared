import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { Navigate, useLocation } from "react-router-dom";
export var AuthContext = createContext({
    user: null,
    isLoading: true,
    signIn: function () { return Promise.resolve(); },
    signOut: function () { return Promise.resolve(); },
});
export var useAuth = function () { return useContext(AuthContext); };
export var RequiresAuth = function (_a) {
    var children = _a.children, noAuthRedirectPath = _a.noAuthRedirectPath, fallback = _a.fallback;
    var _b = useAuth(), user = _b.user, isLoading = _b.isLoading;
    var location = useLocation();
    if (isLoading) {
        return fallback;
    }
    if (!user) {
        return _jsx(Navigate, { to: noAuthRedirectPath || '/', state: { from: location }, replace: true });
    }
    return children;
};