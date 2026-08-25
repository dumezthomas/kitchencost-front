import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthStore} from '../../features/auth/stores/auth.store';
import {catchError, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authStore = inject(AuthStore);
  const router = inject(Router);

  const token = authStore.token();

  const request = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(request).pipe(
    catchError(error => {

      if (error.status === 401 && authStore.isAuthenticated()) {

        authStore.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
