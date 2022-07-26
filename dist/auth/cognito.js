import { Auth } from 'aws-amplify';
var CognitoAuthService = /** @class */ (function () {
    function CognitoAuthService() {
    }
    CognitoAuthService.prototype.signIn = function () {
        return Auth.signIn({
            username: '',
            password: ''
        });
    };
    CognitoAuthService.prototype.signOut = function () {
        return Auth.signOut();
    };
    CognitoAuthService.prototype.getUser = function () {
        return Auth.currentAuthenticatedUser().then(function (user) { return ({
            username: user.getUsername(),
            email: user.getUsername()
        }); });
    };
    CognitoAuthService.prototype.isAuthenticated = function () {
        return Auth.currentSession().then(function (session) { return session && session.isValid(); });
    };
    CognitoAuthService.prototype.handleAuthRedirect = function () {
        return Promise.resolve();
    };
    return CognitoAuthService;
}());
export { CognitoAuthService };
