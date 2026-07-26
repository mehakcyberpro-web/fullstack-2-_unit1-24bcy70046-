import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import DraftForm from "../components/DraftForm";

import {
  addDraft,
  updateDraft,
} from "../features/drafts/draftSlice";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectDraftById } from "../features/drafts/draftSelectors";

import { generateId } from "../utils/generateID";
import { mockApi } from "../services/mockApi";

const CreateDraft = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const draftId = searchParams.get("id");

  const draftSelector = draftId
    ? selectDraftById(draftId)
    : () => undefined;

  const existingDraft =
    useAppSelector(draftSelector);

  const handleSubmit = async (
  title: string,
  content: string,
  scheduledDate: string,
  scheduledTime: string
) => {
  setLoading(true);

  const draft = {
  id: existingDraft
    ? existingDraft.id
    : generateId(),

  title,

  content,

  createdAt: existingDraft
    ? existingDraft.createdAt
    : new Date().toISOString(),

  updatedAt: new Date().toISOString(),

  scheduledDate,
  scheduledTime,
};
  await mockApi(draft);

  if (existingDraft) {
    dispatch(updateDraft(draft));
  } else {
    dispatch(addDraft(draft));
  }

  setLoading(false);

  navigate("/drafts");
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
        {existingDraft ? "Edit Draft" : "Create Draft"}
      </h1>

      {loading ? (
        <h2 style={{ textAlign: "center" }}>
          Saving...
        </h2>
      ) : (
        <DraftForm
          onSubmit={handleSubmit}
          initialTitle={existingDraft?.title}
          initialContent={existingDraft?.content}
          initialScheduledDate={existingDraft?.scheduledDate}
          initialScheduledTime={existingDraft?.scheduledTime}
        />
      )}
      </>
  )
};

export default CreateDraft;