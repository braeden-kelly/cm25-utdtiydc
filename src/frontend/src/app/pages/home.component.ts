import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <p>Home Component</p>
    <a class="link" routerLink="user">User Profile</a>
  `,
  styles: ``,
})
export class HomeComponent {}
