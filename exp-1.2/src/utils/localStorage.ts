import type { Draft } from "../features/drafts/draftTypes";

const STORAGE_KEY = "drafts";

export const loadDrafts = (): Draft[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveDrafts = (drafts: Draft[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(drafts)
  );
};