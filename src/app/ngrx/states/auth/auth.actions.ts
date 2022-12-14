import { createAction, props } from '@ngrx/store';

export const LOGIN_REQUEST = createAction(
  '[Auth] LOGIN_REQUEST',
  props<{ credentials: { email: string; password: string } }>()
);

export const SELLER_LOGIN_REQUEST = createAction(
  '[Auth] SELLER_LOGIN_REQUEST',
  props<{ credentials: { phone: string; otp: string } }>()
);

export const LOGIN_SUCCESS = createAction(
  '[Auth] LOGIN_SUCCESS',
  props<{ loginSuccessResponse: any }>()
);
export const LOGIN_FAILED = createAction(
  '[Auth] LOGIN_FAILED',
  props<{ error: string }>()
);
export const LOGOUT = createAction('[Auth] LOGOUT', props<{ error: string }>());
