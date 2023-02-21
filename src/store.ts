import { configureStore } from '@reduxjs/toolkit';

import dataReducer from './data/state';

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      data: dataReducer,
    },
  });

  return store;
}

const store = configureAppStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
