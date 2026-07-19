import type { RootState } from "../../app/store";

export const selectDrafts = (state: RootState) =>
  state.drafts.drafts;

export const selectDraftById =
  (id: string) => (state: RootState) =>
    state.drafts.drafts.find(
      (draft) => draft.id === id
    );