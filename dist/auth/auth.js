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
    var children = _a.children, _b = _a.noAuthRedirectPath, noAuthRedirectPath = _b === void 0 ? '/' : _b, fallback = _a.fallback;
    var _c = useAuth(), user = _c.user, isLoading = _c.isLoading;
    var location = useLocation();
    if (isLoading) {
        return fallback;
    }
    if (!user) {
        return _jsx(Navigate, { to: noAuthRedirectPath, state: { from: location }, replace: true });
    }
    return children;
};
