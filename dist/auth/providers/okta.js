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
import { OktaAuth } from "@okta/okta-auth-js";
import { AuthContext } from "../auth";
import { useProvideAuth } from "./use-provide-auth";
var OktaAuthService = /** @class */ (function () {
    function OktaAuthService(config) {
        this.config = config;
        this.oktaAuth = new OktaAuth(config);
    }
    OktaAuthService.prototype.signIn = function (_a) {
        var username = _a.username, password = _a.password;
        return this.oktaAuth.signInWithCredentials({
            username: username,
            password: password
        });
    };
    OktaAuthService.prototype.signInWithRedirect = function () {
        return this.oktaAuth.signInWithRedirect();
    };
    OktaAuthService.prototype.signOut = function () {
        return this.oktaAuth.signOut();
    };
    OktaAuthService.prototype.isAuthenticated = function () {
        return this.oktaAuth.isAuthenticated();
    };
    OktaAuthService.prototype.getUser = function () {
        return this.oktaAuth.getUser().then(function (user) { return ({
            username: user.preferred_username,
            email: user.email
        }); });
    };
    OktaAuthService.prototype.handleAuthRedirect = function () {
        var _this = this;
        if (this.oktaAuth.token.isLoginRedirect()) {
            return this.oktaAuth.handleLoginRedirect()
                .then(function () { return _this.getUser(); });
        }
        return Promise.reject('No logins redirected.');
    };
    return OktaAuthService;
}());
export { OktaAuthService };
export var OktaAuthProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var auth = useProvideAuth('okta', config);
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
