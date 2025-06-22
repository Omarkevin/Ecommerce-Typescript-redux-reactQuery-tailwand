import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./SearchSlice";
import cartReducer from "./AddtoCard";
export const store = configureStore({
  reducer: {
    search: searchSlice,
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
