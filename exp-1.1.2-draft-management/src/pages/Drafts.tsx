import { useEffect } from "react";

import Navbar from "../components/Navbar";
import DraftList from "../components/DraftList";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  deleteDraft,
  setDrafts,
} from "../features/drafts/draftSlice";

import { selectDrafts } from "../features/drafts/draftSelectors";

import {
  loadDrafts,
  saveDrafts,
} from "../utils/localStorage";

const Drafts = () => {
  const dispatch = useAppDispatch();

  const drafts = useAppSelector(selectDrafts);

  useEffect(() => {
    dispatch(setDrafts(loadDrafts()));
  }, [dispatch]);

  useEffect(() => {
    saveDrafts(drafts);
  }, [drafts]);

  const handleDelete = (id: string) => {
    dispatch(deleteDraft(id));
  };

  return (
    <>
      <Navbar />

      <h1
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        My Drafts
      </h1>

      <DraftList
        drafts={drafts}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Drafts;