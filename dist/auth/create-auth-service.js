import { OktaAuthService } from "./okta";
import { CognitoAuthService } from "./cognito";
export var createAuthService = function (provider, config) {
    if (provider === 'okta') {
        return new OktaAuthService(config);
    }
    if (provider === 'cognito') {
        return new CognitoAuthService();
    }
    return {};
};
