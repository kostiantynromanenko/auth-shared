import { Auth } from 'aws-amplify';
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
