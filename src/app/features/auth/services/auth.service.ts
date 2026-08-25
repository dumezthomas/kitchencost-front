import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';

import {LoginRequest} from '../../../core/models/login-request';
import {LoginResponse} from '../../../core/models/login-response';
import {User} from '../../../core/models/user';

@Service()
export class AuthService {

  private readonly http = inject(HttpClient);

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`,
      request
    );
  }

  me(): Observable<User> {

    return this.http.get<User>(
      `${environment.apiUrl}/auth/me`
    );
  }
}
