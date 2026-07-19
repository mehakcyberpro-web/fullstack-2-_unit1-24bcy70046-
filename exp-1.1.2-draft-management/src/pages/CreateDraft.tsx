import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import DraftForm from "../components/DraftForm";

import { useAppDispatch } from "../app/hooks";
import { addDraft } from "../features/drafts/draftSlice";

import { generateId } from "../utils/generateID";
import { mockApi } from "../services/mockApi";

const CreateDraft = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    title: string,
    content: string
  ) => {
    setLoading(true);

    const draft = {
      id: generateId(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await mockApi(draft);

    dispatch(addDraft(draft));

    setLoading(false);

    navigate("/drafts");
  };

  return (
    <>
      <Navbar />

      <h1 style={{ textAlign: "center", marginTop: "30px" }}>
        Create Draft
      </h1>

      {loading ? (
        <h2 style={{ textAlign: "center" }}>Saving...</h2>
      ) : (
        <DraftForm onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default CreateDraft;