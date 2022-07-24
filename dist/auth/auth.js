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
    var children = _a.children, fallback = _a.fallback, signOutPath = _a.signOutPath;
    var _b = useAuth(), user = _b.user, isLoading = _b.isLoading;
    var location = useLocation();
    if (isLoading) {
        return fallback;
    }
    if (!user) {
        return _jsx(Navigate, { to: signOutPath || '/login', state: { from: location }, replace: true });
    }
    return children;
};
