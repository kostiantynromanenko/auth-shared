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
import { AuthContext } from "./auth";
import { createAuthService } from "./create-auth-service";
import { useEffect, useState } from "react";
var useProvideAuth = function (provider) {
    var authService = createAuthService(provider);
    var _a = useState(null), user = _a[0], setUser = _a[1];
    var _b = useState(true), isLoading = _b[0], setLoading = _b[1];
    useEffect(function () {
        setLoading(true);
        authService.checkSession().then(function (user) {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
    });
    var signIn = function () {
        setLoading(true);
        return authService.signIn().then(function () { return setLoading(false); });
    };
    var signOut = function () {
        setLoading(true);
        return authService.signOut().then(function () { return setLoading(false); });
    };
    return {
        user: user,
        isLoading: isLoading,
        signIn: signIn,
        signOut: signOut
    };
};
export var OktaAuthContextProvider = function (_a) {
    var children = _a.children;
    var auth = useProvideAuth('okta');
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
export var CognitoAuthContextProvider = function (_a) {
    var children = _a.children;
    var auth = useProvideAuth('cognito');
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
