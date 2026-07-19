import { configureStore } from "@reduxjs/toolkit";
import draftReducer from "../features/drafts/draftSlice";

export const store = configureStore({
  reducer: {
    drafts: draftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;