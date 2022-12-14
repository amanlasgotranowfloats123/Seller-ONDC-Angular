import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as OrdersActions from './orders.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AggregatorOrderEffects {
  constructor(private actions$: Actions, private api: ApiServiceService) {}

  getOrdersListRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.GET_ORDERS_REQUEST),
      exhaustMap((action) =>
        this.api.getOrdersListAggregator('1').pipe(
          map((response: any) =>
            OrdersActions.GET_ORDERS_SUCCESS({ response })
          ),
          catchError((error) => of(OrdersActions.GET_ORDERS_FAILED({ error })))
        )
      )
    )
  );

  getOrdersListSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.GET_ORDERS_SUCCESS),
        tap(({ response }) => {
          console.log('ser', response);
          if (response && response?.code && response.code == 500) {
            return;
          } else {
            console.log('order response', response);
          }
        })
      ),
    //   disabling next action call
    { dispatch: false }
  );
}
