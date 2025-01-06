import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AddressLookupComponent } from './pages/address-lookup.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'address-lookup',
    component: AddressLookupComponent,
  },
];
