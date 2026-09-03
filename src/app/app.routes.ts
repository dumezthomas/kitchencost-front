import {Routes} from '@angular/router';

import {authGuard} from './core/guards/auth.guard';

import {GuestLayout} from './core/layout/guest-layout/guest-layout';
import {MainLayout} from './core/layout/main-layout/main-layout';

import {Login} from './features/auth/pages/login/login';
import {Dashboard} from './features/dashboard/pages/dashboard/dashboard';
import {Home} from './features/home/pages/home/home';
import {Restaurants} from './features/restaurants/pages/restaurants/restaurants';
import {Restaurant} from './features/restaurant/pages/restaurant/restaurant';
import {guestGuard} from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: GuestLayout,
    children: [
      {
        path: '',
        component: Home,
        canActivate: [guestGuard],
      },

      {
        path: 'restaurants',
        component: Restaurants
      },

      {
        path: 'login',
        component: Login,
        canActivate: [guestGuard],
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
      },

      {
        path: 'settings',
        component: Restaurant
      }
    ]
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];
