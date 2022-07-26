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
        return this.oktaAuth.getUser();
    };
    return OktaAuthService;
}());
export { OktaAuthService };
