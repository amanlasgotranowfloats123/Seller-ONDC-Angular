import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from 'src/app/ngrx/states/auth/auth.reducer';
import { AuthService } from '../shared/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    public store: Store<fromAuth.State>,
    private route: Router,
    private auth: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: import('@angular/router').RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isLoggedIn = this.auth.isUserLoggedIn();
    if (!isLoggedIn) {
      this.route.navigate(['/admin'], {
        queryParams: { returnUrl: _state.url },
      });
    }
    return isLoggedIn;
  }

  canActivateChild() {
    return true;
  }
}
