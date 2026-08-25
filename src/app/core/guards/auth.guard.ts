import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthStore} from '../../features/auth/stores/auth.store';

export const authGuard: CanActivateFn = (route, state) => {

  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.isAuthenticated()
    ? true
    : router.createUrlTree(['/']);
};
