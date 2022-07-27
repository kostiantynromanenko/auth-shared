import { AuthService } from "../auth-service";
export declare type ProviderType = 'okta' | 'cognito';
export declare const createAuthService: (provider: ProviderType, config?: any) => AuthService;
