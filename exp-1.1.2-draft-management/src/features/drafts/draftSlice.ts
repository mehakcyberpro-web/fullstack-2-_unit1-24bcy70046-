import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Draft, DraftState } from "./draftTypes";

const initialState: DraftState = {
  drafts: [],
};

const draftSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    addDraft: (state, action: PayloadAction<Draft>) => {
      state.drafts.push(action.payload);
    },

    updateDraft: (state, action: PayloadAction<Draft>) => {
      const index = state.drafts.findIndex(
        (draft) => draft.id === action.payload.id
      );

      if (index !== -1) {
        state.drafts[index] = action.payload;
      }
    },

    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter(
        (draft) => draft.id !== action.payload
      );
    },

    setDrafts: (state, action: PayloadAction<Draft[]>) => {
      state.drafts = action.payload;
    },
  },
});

export const {
  addDraft,
  updateDraft,
  deleteDraft,
  setDrafts,
} = draftSlice.actions;

export default draftSlice.reducer;