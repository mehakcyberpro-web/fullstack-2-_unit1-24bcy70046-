import type { Draft } from "../features/drafts/draftTypes";
import { memo } from "react";


interface DraftCardProps {
  draft: Draft;
  onDelete: (id: string) => void;
  onEdit: (draft: Draft) => void;
}

const DraftCard = ({ draft, onDelete, onEdit }: DraftCardProps) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "8px",
      }}
    >
      <h3>{draft.title}</h3>

      <p>{draft.content}</p>

      <small>
        Last Updated:{" "}
        {new Date(draft.updatedAt).toLocaleString()}
      </small>

      <br />
      <br />

      <button
        style={{ marginRight: "10px" }}
        onClick={() => onEdit(draft)}
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(draft.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default memo(DraftCard);