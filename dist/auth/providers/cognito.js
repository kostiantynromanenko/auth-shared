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
import { Auth } from 'aws-amplify';
import { AuthContext } from '../auth';
import { useProvideAuth } from "./use-provide-auth";
export var CognitoAuth = Auth;
var CognitoAuthService = /** @class */ (function () {
    function CognitoAuthService() {
    }
    CognitoAuthService.prototype.signIn = function (_a) {
        var username = _a.username, password = _a.password;
        return CognitoAuth.signIn({
            username: username,
            password: password
        });
    };
    CognitoAuthService.prototype.signInWithRedirect = function () {
        return CognitoAuth.federatedSignIn();
    };
    CognitoAuthService.prototype.signOut = function () {
        return CognitoAuth.signOut();
    };
    CognitoAuthService.prototype.isAuthenticated = function () {
        return this.getUser().then(function (user) { return !!user; });
    };
    CognitoAuthService.prototype.getUser = function () {
        return CognitoAuth.currentAuthenticatedUser().then(function (user) { return ({
            username: user.getUsername(),
            email: user.getUsername()
        }); });
    };
    CognitoAuthService.prototype.handleAuthRedirect = function () {
        return this.getUser();
    };
    return CognitoAuthService;
}());
export { CognitoAuthService };
export var CognitoAuthProvider = function (_a) {
    var children = _a.children;
    var auth = useProvideAuth('cognito');
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
