import { Component } from '@angular/core';
import { NavComponent } from './components/nav.component';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';

@Component({
  selector: 'app-root',
  template: `
    <app-nav />
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavComponent, RouterOutlet],
})
export class AppComponent {
  constructor(oauthService: OAuthService) {
    oauthService.configure(authCodeFlowConfig);
    oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
