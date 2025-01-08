import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AddressLookupComponent } from './pages/address-lookup.component';
import { LocationsComponent } from './pages/locations.component';
import { TodosComponent } from './pages/todos.component';
import { LocationLookupComponent } from './pages/location-lookup.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'address-lookup',
    component: AddressLookupComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: 'user',
    component: AddressLookupComponent,
  },
  {
    path: 'locations',
    component: LocationsComponent,
  },
  {
    path: 'location-lookup',
    component: LocationLookupComponent,
  },
];
