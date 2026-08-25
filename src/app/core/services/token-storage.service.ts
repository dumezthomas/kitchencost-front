import {Service} from '@angular/core'
import {STORAGE} from '../constants/storage.constants';
import {User} from '../models/user';

@Service()
export class TokenStorageService {

  getToken(): string | null {

    return localStorage.getItem(STORAGE.TOKEN);
  }

  setToken(token: string): void {

    localStorage.setItem(STORAGE.TOKEN, token);
  }

  getUser(): User | null {

    const user = localStorage.getItem(STORAGE.USER);

    return user ? JSON.parse(user) as User : null;
  }

  setUser(user: User): void {

    localStorage.setItem(STORAGE.USER, JSON.stringify(user));
  }

  clear(): void {

    localStorage.removeItem(STORAGE.TOKEN);
    localStorage.removeItem(STORAGE.USER);
  }

}
