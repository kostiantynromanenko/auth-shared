import {OktaAuthService} from "./okta";
import {AuthService} from "./auth-service";
import {CognitoAuthService} from "./cognito";

export const createAuthService = (provider: 'okta' | 'cognito'): AuthService => {
    if (provider === 'okta') {
        return new OktaAuthService();
    }
    if (provider === 'cognito') {
        return new CognitoAuthService();
    }

    return {} as AuthService;
}
