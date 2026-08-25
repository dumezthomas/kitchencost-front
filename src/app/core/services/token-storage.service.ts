import {Service} from '@angular/core';

import {STORAGE} from '../constants/storage.constants';

@Service()
export class TokenStorageService {

  get(): string | null {

    return localStorage.getItem(STORAGE.TOKEN);
  }

  set(token: string): void {

    localStorage.setItem(STORAGE.TOKEN, token);
  }

  clear(): void {

    localStorage.removeItem(STORAGE.TOKEN);
  }
}
