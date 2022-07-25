import { OktaAuthService } from "./okta";
import { CognitoAuthService } from "./cognito";
export var createAuthService = function (provider) {
    if (provider === 'okta') {
        return new OktaAuthService();
    }
    if (provider === 'cognito') {
        return new CognitoAuthService();
    }
    return {};
};
