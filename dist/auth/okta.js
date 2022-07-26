import { OktaAuth } from "@okta/okta-auth-js";
var OktaAuthService = /** @class */ (function () {
    function OktaAuthService(config) {
        this.config = config;
        this.oktaAuth = new OktaAuth(config);
    }
    OktaAuthService.prototype.signIn = function () {
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
