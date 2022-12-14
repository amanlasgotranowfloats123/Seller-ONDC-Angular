import { Injectable } from '@angular/core';
import { ENUMS } from 'src/utils/enums';

@Injectable()
export class AuthService {
  public isAuthenticated: boolean = false;
  constructor() {}

  isUserLoggedIn(): boolean {
    let data = localStorage.getItem(ENUMS.USERDATA);
    if (data) return true;
    return false;
  }
}
