import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.AUTH_ISSUER,
  redirectUri: window.location.origin + '/index.html',
  clientId: 'spa',
  responseType: 'code',
  scope: 'openid profile email offline_access api',
  showDebugInformation: true,
};
