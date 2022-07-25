var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
export var withAuth = function (WrappedComponent) {
    var displayName = WrappedComponent.displayName || "Component";
    var ComponentWithTheme = function (props) {
        var user = useAuth().user;
        return _jsx(WrappedComponent, __assign({ user: user }, props));
    };
    ComponentWithTheme.displayName = "withAuth(".concat(displayName, ")");
    return ComponentWithTheme;
};
