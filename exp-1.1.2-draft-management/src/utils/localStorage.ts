import { Draft } from "../features/drafts/draftTypes";

const STORAGE_KEY = "drafts";

export const loadDrafts = (): Draft[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
};

export const saveDrafts = (drafts: Draft[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(drafts)
  );
};