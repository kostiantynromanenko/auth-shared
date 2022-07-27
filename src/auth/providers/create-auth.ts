import {OktaAuthService} from "./okta";
import {CognitoAuthService} from "./cognito";
import {AuthService} from "../auth-service";

export type ProviderType = 'okta' | 'cognito';

export const createAuthService = (provider: ProviderType, config?: any): AuthService => {
    if (provider === 'okta') {
        return new OktaAuthService(config);
    }
    if (provider === 'cognito') {
        return new CognitoAuthService();
    }

    return {} as AuthService;
}
