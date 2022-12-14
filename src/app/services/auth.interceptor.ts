import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ENUMS } from 'src/utils/enums';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../shared/services/snackbar-service/snackbar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private router: Router,
    private snb: SnackbarService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    const authService = this.injector.get(AuthService);
    const tmp = localStorage.getItem(ENUMS.USERDATA);
    let token = '';
    let authReq = req;
    authReq = this.addTokenHeader(req, authService.getToken());
    if (tmp) {
      token = JSON.parse(tmp).data.accessToken;
      console.log('token', token);
    }
    const copiedReq = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + token),
    });
    if (!token) {
      // this.router.navigateByUrl('/admin');
    }

    return next.handle(copiedReq).pipe(
      catchError((errordata) => {
        console.log('errordata', errordata);
        if (errordata.error) {
          this.snb.openSnackBar(
            errordata.error.message || errordata.error,
            'close'
          );
          authService.silentNavigate();
          // authService.silentNavigate();
        }
        // if (errordata.status === 403 || errordata.status === 401) {
        //   this.snb.openSnackBar(errordata.error.message, 'close');
        // }
        return throwError(errordata);
      })
    );
  }

  addTokenHeader(req: HttpRequest<any>, token: any) {
    return req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + token),
    });
  }
}
