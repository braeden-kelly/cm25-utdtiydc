import { CanActivateFn, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';

import { LocationsComponent } from './pages/locations.component';
import { TodosComponent } from './pages/todos.component';
import { LocationLookupComponent } from './pages/location-lookup.component';
import { LocationAddComponent } from './pages/location-add.component';
import { UserComponent } from './pages/user.component';
import { inject } from '@angular/core';
import { AuthStore } from './components/auth.store';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [loggedInGuard()],
  },
  {
    path: 'locations',
    component: LocationsComponent,
  },
  {
    path: 'location-add',
    component: LocationAddComponent,
  },
  {
    path: 'location-lookup',
    component: LocationLookupComponent,
  },
];

function loggedInGuard(): CanActivateFn {
  return () => {
    const store = inject(AuthStore);
    return store.isAuthenticated();
  };
}
