import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { GET_ORDERS_FAILED, GET_ORDERS_SUCCESS } from './orders.actions';

export interface State {
  orders: object[] | null | [];
  error: string;
}

export const initialeState: State = {
  orders: [],
  error: '',
};

const _getOrderListAggregator = createReducer(
  initialeState,
  on(GET_ORDERS_SUCCESS, (state, { response }) => {
    return {
      ...state,
      orders: response,
    };
  }),
  on(GET_ORDERS_FAILED, (state, { error }) => {
    console.log('LOGIN_FAILED', error);
    return {
      ...state,
      error: error,
    };
  })
);

export function getOrderListAggregator(
  state: State | undefined,
  action: Action
) {
  return _getOrderListAggregator(state, action);
}

export const selectOrderState = createFeatureSelector<State>('ordersAgg');

export const selectOrdersAgg = createSelector(selectOrderState, (state) => {
  state.orders;
});
