export interface Draft {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface DraftState {
  drafts: Draft[];
}