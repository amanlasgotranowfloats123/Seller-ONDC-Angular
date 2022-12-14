import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVER } from './config';
import { ENUMS } from 'src/utils/enums';
import { getLocalItem } from 'src/utils/localstorage';

@Injectable()
export class AuthService {
  token!: string;

  constructor(private http: HttpClient, private router: Router) {}

  isAuthorized() {
    let data = localStorage.getItem(ENUMS.USERDATA);
    if (data) return true;
    return false;
  }
  getToken() {
    let data = localStorage.getItem(ENUMS.USERDATA);
    let token: string = '';
    if (data) {
      token = JSON.parse(data).data.accessToken;
    }
    return token;
  }

  sessionExpired() {
    let unprotectedRoutes = ['/', '/admin', '/login'];
    let check = unprotectedRoutes.filter((el) => el !== this.router.url);
    if (check.length > 0) {
      alert('Your session is expired');
      localStorage.clear();
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/admin');
    }
  }

  silentNavigate() {
    this.router.navigateByUrl('/admin');
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/admin');
  }

  silentLogin() {
    let userdata = getLocalItem(ENUMS.USERDATA);
  }
}
