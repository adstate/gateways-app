import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gatewayReducer from "../features/gateways/gatewaySlice";

export const store = configureStore({
  reducer: {
    gateways: gatewayReducer,
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
