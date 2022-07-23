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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { Navigate, Route, useLocation } from "react-router-dom";
export var AuthContext = createContext({
    user: null,
    isLoading: true,
    signIn: function () { return Promise.resolve(); },
    signOut: function () { return Promise.resolve(); },
});
export var useAuth = function () { return useContext(AuthContext); };
export var PrivateRoute = function (_a) {
    var fallback = _a.fallback, element = _a.element, children = _a.children, rest = __rest(_a, ["fallback", "element", "children"]);
    var _b = useAuth(), user = _b.user, isLoading = _b.isLoading;
    var location = useLocation();
    var routeContent = element !== null && element !== void 0 ? element : children;
    if (isLoading) {
        routeContent = fallback;
    }
    if (!user) {
        routeContent = _jsx(Navigate, { to: "/", state: { from: location }, replace: true });
    }
    return _jsx(Route, __assign({}, rest, { element: routeContent }));
};
