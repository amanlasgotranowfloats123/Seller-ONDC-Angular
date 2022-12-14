import { Injectable } from '@angular/core';
import {
  Action,
  ActionCreator,
  ActionReducer,
  ActionType,
  createReducer,
  ReducerTypes,
} from '@ngrx/store';
import { setLocalItem } from 'src/utils/localstorage';

export function createRehydrateReducer<S, A extends Action = Action>(
  key: string,
  initialState: S,
  ...ons: ReducerTypes<S, ActionCreator[]>[]
): ActionReducer<S, A> {
  const item = localStorage.getItem(key);
  const newInitialState = (item && JSON.parse(item)) ?? initialState;

  const newOns: ReducerTypes<S, ActionCreator[]>[] = [];
  ons.forEach((oldOn: ReducerTypes<S, ActionCreator[]>) => {
    const newReducer: ActionReducer<S, object & { type: string }> = (
      state: any,
      action: ActionType<ActionCreator[][number]>
    ) => {
      const newState = oldOn.reducer(state, action);
      setLocalItem(key, newState);
      return newState;
    };
    newOns.push({ ...oldOn, reducer: newReducer });
  });
  return createReducer(newInitialState, ...newOns);
}

// export const someReducer = createRehydrateReducer(
//   SOME_STORAGE_KEY,
//   initialState,
//   on(SomeAction.someSuccess, (state: S | undefined) => {
//     return {
//       ...state,
//       busy: false,
//     };
//   })
// );
