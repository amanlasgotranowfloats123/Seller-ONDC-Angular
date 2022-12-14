import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { LOGIN_FAILED, LOGIN_SUCCESS } from './auth.actions';

export interface State {
  user: any;
  loginError: string;
  isLoggedIn: boolean;
}

export const initialeState: State = {
  user: null,
  loginError: '',
  isLoggedIn: false,
};

const _authReducer = createReducer(
  initialeState,
  on(LOGIN_SUCCESS, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      user: loginSuccessResponse,
      isLoggedIn: true,
    };
  }),
  on(LOGIN_FAILED, (state, { error }) => {
    console.log('LOGIN_FAILED', error);
    return {
      ...state,
      loginError: error,
      user: null,
      isLoggedIn: false,
    };
  })
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectUser = createSelector(selectAuthState, (state) => {
  state.user;
});

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn
);
