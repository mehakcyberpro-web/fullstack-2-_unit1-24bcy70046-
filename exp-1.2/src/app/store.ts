import { configureStore } from "@reduxjs/toolkit";
import draftReducer from "../features/drafts/draftSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    drafts: draftReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;