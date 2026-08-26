import {Routes} from '@angular/router';

import {authGuard} from './core/guards/auth.guard';
import {guestGuard} from './core/guards/guest.guard';

import {GuestLayout} from './core/layout/guest-layout/guest-layout';
import {MainLayout} from './core/layout/main-layout/main-layout';

import {Login} from './features/auth/pages/login/login';
import {Dashboard} from './features/dashboard/pages/dashboard/dashboard';
import {Home} from './features/home/pages/home/home';
import {Restaurants} from './features/restaurants/pages/restaurants/restaurants';

export const routes: Routes = [
  {
    path: '',
    component: GuestLayout,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        component: Home
      },

      {
        path: 'restaurants',
        component: Restaurants
      },

      {
        path: 'login',
        component: Login
      }
    ]
  },

  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
