// A responsive havigation component with links
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    <div class="navbar-end"></div>
  </div>`,
  styles: ``,
})
export class NavComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((o) => !o);
  }
}
