import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthStore } from '../components/auth.store';

@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>User</p>
    <p>Name: {{ store.sub() }}</p>
    <ul>
      @for (role of store.roles(); track $index) {
        <li>Role: {{ role }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class UserComponent {
  store = inject(AuthStore);
}
