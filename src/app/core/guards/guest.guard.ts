import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthStore} from '../../features/auth/stores/auth.store';

export const guestGuard: CanActivateFn = (route, state) => {

  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.isAuthenticated()
    ? authStore.isChef() ?
      router.createUrlTree(['/dashboard'])
      : router.createUrlTree(['/dashboard'])
    : true;
};
