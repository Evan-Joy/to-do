import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../example-redux/counter/counterSlice';
import { SessionUserReducer } from "../app-reducers";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sessionUser: SessionUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
