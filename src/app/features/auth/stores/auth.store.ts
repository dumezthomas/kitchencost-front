import {computed, inject} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withProps, withState} from '@ngrx/signals';

import {AuthService} from '../services/auth.service';

import {User} from '../../../core/models/user';
import {LoginRequest} from '../../../core/models/login-request';
import {Role} from '../../../shared/enums/role.enum';
import {TokenStorageService} from '../../../core/services/token-storage.service';

type AuthState = {

  user: User | null;
  token: string | null;

  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {

  user: null,
  token: null,

  loading: false,
  error: null
};

export const AuthStore = signalStore(
  {providedIn: 'root'},

  withState(initialState),

  withProps(() => ({

    authService: inject(AuthService),
    tokenStorage: inject(TokenStorageService)

  })),

  withMethods((store) => ({

    login(credentials: LoginRequest): void {

      patchState(store, {
        loading: true,
        error: null
      });

      store.authService.login(credentials).subscribe({

        next: response => {

          store.tokenStorage.setToken(response.token);
          store.tokenStorage.setUser(response.user);

          patchState(store, {
            user: response.user,
            token: response.token,
            loading: false
          });
        },

        error: () => {

          patchState(store, {
            loading: false,
            error: 'Invalid username or password.'
          });
        }
      });
    },

    logout(): void {

      store.tokenStorage.clear();
      patchState(store, initialState);
    },

    initialize(): void {

      const token = store.tokenStorage.getToken();
      const user = store.tokenStorage.getUser();

      if (!token || !user) {
        return;
      }

      patchState(store, {
        token,
        user
      });
    }
  })),

  withComputed((store) => ({

    isAuthenticated: computed(() => !!store.token()),

    isChef: computed(() => store.user()?.role === Role.CHEF),

    isCook: computed(() => store.user()?.role === Role.COOK)
  }))
);
