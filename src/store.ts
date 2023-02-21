import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import dataReducer from './data/state';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  data: dataReducer,
});

export function configureAppStore(preloadedState?: PreloadedState<RootState>) {
  const store = configureStore({
    reducer: {
      data: dataReducer,
    },
    preloadedState,
  });

  return store;
}

export const store = configureAppStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureAppStore>;
export type AppDispatch = AppStore['dispatch'];
