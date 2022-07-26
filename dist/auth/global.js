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
import { useEffect, useState } from "react";
import { AuthContext, useAuth } from "./auth";
import { createAuthService } from "./create-auth-service";
import { useNavigate } from "react-router-dom";
export var LoginCallback = function (_a) {
    var _b = _a.redirectUrl, redirectUrl = _b === void 0 ? '/' : _b;
    var handleAuthRedirect = useAuth().handleAuthRedirect;
    var navigate = useNavigate();
    useEffect(function () {
        handleAuthRedirect().then(function () { return navigate(redirectUrl); }).catch();
    }, [handleAuthRedirect]);
    return _jsx("div", { children: "Loading..." });
};
var useProvideAuth = function (providerType, config) {
    var authService = useState(function () { return createAuthService(providerType, config); })[0];
    var user = useState(null)[0];
    var _a = useState(true), isLoading = _a[0], setLoading = _a[1];
    // useEffect(() => {
    //     setLoading(true);
    //     authService.isAuthenticated().then((isAuthenticated) => {
    //         console.log('Authenticated: ' + isAuthenticated);
    //         if (isAuthenticated) {
    //             authService.getUser().then((user) => {
    //                 console.log('User:');
    //                 console.log(user);
    //                 setUser(user);
    //                 setLoading(false);
    //             })
    //         } else {
    //             setUser(null);
    //             setLoading(false);
    //         }
    //     });
    // }, [])
    var signIn = function () {
        setLoading(true);
        return authService.signIn().then(function () { return setLoading(false); });
    };
    var signOut = function () {
        setLoading(true);
        return authService.signOut().then(function () { return setLoading(false); });
    };
    var handleAuthRedirect = function () { return authService.handleAuthRedirect(); };
    return {
        user: user,
        isLoading: isLoading,
        handleAuthRedirect: handleAuthRedirect,
        signIn: signIn,
        signOut: signOut
    };
};
export var OktaAuthContextProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var auth = useProvideAuth('okta', config);
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
export var CognitoAuthContextProvider = function (_a) {
    var children = _a.children;
    var auth = useProvideAuth('cognito');
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
