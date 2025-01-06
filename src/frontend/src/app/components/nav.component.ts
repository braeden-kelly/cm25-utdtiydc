// A responsive havigation component with links
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthStore } from './auth.store';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `<div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a
              routerLink=""
              [routerLinkActive]="['underline']"
              [routerLinkActiveOptions]="{ exact: true }"
              >Homepage</a
            >
          </li>
          <li>
            <a routerLink="address-lookup" [routerLinkActive]="['underline']"
              >Address Lookup</a
            >
          </li>
          <li>
            <a routerLink="locations" [routerLinkActive]="['underline']"
              >Locations</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a routerLink="" class="btn btn-ghost text-xl"
        >Test Doubles<span class="text-xs font-light"
          >For Developer Confidence</span
        ></a
      >
    </div>
    <div class="navbar-end">
      @if (store.isAuthenticated()) {
        <button class="btn btn-warning" (click)="logOut()">
          Log Out {{ store.sub() }}
        </button>
      } @else {
        <button class="btn btn-primary" (click)="logIn()">Login</button>
      }
    </div>
  </div>`,
  styles: ``,
})
export class NavComponent {
  isMenuOpen = signal(false);
  store = inject(AuthStore);
  oidc = inject(OidcSecurityService);

  constructor() {
    this.oidc.checkAuth().subscribe((loginResponse: LoginResponse) => {
      console.log(loginResponse);
      if (loginResponse.isAuthenticated) {
        const ud = loginResponse.userData as unknown as { sub: string };
        this.store.logIn(ud.sub);
      }
    });
  }
  toggleMenu() {
    this.isMenuOpen.update((o) => !o);
  }
  logIn() {
    this.oidc.authorize();
  }
  logOut() {
    this.oidc.logoff().subscribe(() => this.store.logOut());
  }
}
