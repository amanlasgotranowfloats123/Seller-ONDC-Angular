import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { Router } from '@angular/router';
import { ENUMS } from 'src/utils/enums';
import { setLocalItem } from 'src/utils/localstorage';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar-service/snackbar.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private api: ApiServiceService,
    private router: Router,
    private authService: AuthService,
    private snackBar: SnackbarService
  ) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_REQUEST),
      exhaustMap((action) =>
        this.api
          .AggregatorLogin({
            email: action.credentials.email,
            password: action.credentials.password,
          })
          .pipe(
            map((loginSuccessResponse: any) =>
              AuthActions.LOGIN_SUCCESS({ loginSuccessResponse })
            ),
            catchError((error) => of(AuthActions.LOGIN_FAILED({ error })))
          )
      )
    )
  );

  sellerLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SELLER_LOGIN_REQUEST),
      exhaustMap((action) =>
        this.api
          .verifyLogin({
            phone: action.credentials.phone,
            otp: action.credentials.otp,
          })
          .pipe(
            map((loginSuccessResponse: any) =>
              AuthActions.LOGIN_SUCCESS({ loginSuccessResponse })
            ),
            catchError((error) => of(AuthActions.LOGIN_FAILED({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        tap(({ loginSuccessResponse }) => {
          console.log('auth resp sucess', loginSuccessResponse);
          if (loginSuccessResponse.status === 'failure') {
            return this.snackBar.openSnackBar(
              loginSuccessResponse.message,
              'close'
            );
          }
          if (
            loginSuccessResponse &&
            loginSuccessResponse?.code &&
            (loginSuccessResponse.code == 500 ||
              loginSuccessResponse.code == 401)
          ) {
            return;
          } else {
            setLocalItem(ENUMS.USERDATA, {
              ...loginSuccessResponse,
              timestamp: new Date().toString(),
            });
            if (loginSuccessResponse.data?.sellerId) {
              // seller
              this.router.navigateByUrl('/seller-form');
              setLocalItem(ENUMS.USERTYPE, 'SELLER');
              setLocalItem('sellerId', loginSuccessResponse.data?.sellerId);
            } else {
              // agg
              setLocalItem(ENUMS.USERTYPE, 'ADMIN');
              let onboardedStatus =
                loginSuccessResponse?.userData?.aggregator?.onboardingStatus;
              let type = loginSuccessResponse?.userData?.aggregator?.type;
              console.log(onboardedStatus, type);
              if (type === 'ACTIVE') {
                if (onboardedStatus === 'NEW') {
                  this.router.navigateByUrl('/aggregator-form');
                } else this.router.navigateByUrl('/aggregator-dashboard/home');
              }
            }
          }
        })
      ),
    //   disabling next action call
    { dispatch: false }
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        this.authService.logout();
      })
    )
  );
}
