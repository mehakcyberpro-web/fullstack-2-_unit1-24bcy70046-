import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectDraftState = (state: RootState) => state.drafts;

export const selectDrafts = createSelector(
  [selectDraftState],
  (draftState) => draftState.drafts
);

export const selectDraftCount = createSelector(
  [selectDrafts],
  (drafts) => drafts.length
);

export const selectDraftById = (id: string) =>
  createSelector([selectDrafts], (drafts) =>
    drafts.find((draft) => draft.id === id)
  );

export const selectRecentDrafts = createSelector(
  [selectDrafts],
  (drafts) =>
    [...drafts].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )
);