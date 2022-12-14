import { createAction, props } from '@ngrx/store';

export const GET_ORDERS_REQUEST = createAction(
  '[orders] GET_ORDERS_REQUEST'
  //   props<{}>()
);

export const GET_ORDERS_SUCCESS = createAction(
  '[orders] GET_ORDERS_SUCCESS',
  props<{ response: any }>()
);
export const GET_ORDERS_FAILED = createAction(
  '[orders] GET_ORDERS_FAILED',
  props<{ error: string }>()
);
