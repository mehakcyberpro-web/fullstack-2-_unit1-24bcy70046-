import { useEffect , useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { selectDrafts } from "../features/drafts/draftSelectors";

import Navbar from "../components/Navbar";
import DraftList from "../components/DraftList";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  deleteDraft,
  setDrafts,
} from "../features/drafts/draftSlice";

import {
  loadDrafts,
  saveDrafts,
} from "../utils/localStorage";
import type { Draft } from "../features/drafts/draftTypes";

const Drafts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const drafts = useAppSelector(selectDrafts);

  useEffect(() => {
    dispatch(setDrafts(loadDrafts()));
  }, [dispatch]);

  useEffect(() => {
    saveDrafts(drafts);
  }, [drafts]);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteDraft(id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (draft: Draft) => {
      navigate(`/create?id=${draft.id}`);
    },
    [navigate]
  );

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
        onEdit={handleEdit}
      />
    </>
  );
};

export default Drafts;