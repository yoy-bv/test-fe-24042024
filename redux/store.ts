import { Action, configureStore, ThunkAction, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import authReducer from './reducers/auth.reducer';
import postsReducer from './reducers/posts.reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../types/root-state';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      posts: postsReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: customizedMiddleware,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<AppStore>(makeStore);
