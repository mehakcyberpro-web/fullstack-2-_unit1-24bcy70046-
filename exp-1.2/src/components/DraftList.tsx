import DraftCard from "./DraftCard";
import type { Draft } from "../features/drafts/draftTypes";

interface DraftListProps {
  drafts: Draft[];
  onDelete: (id: string) => void;
  onEdit: (draft: Draft) => void;
}

const DraftList = ({
  drafts,
  onDelete,
  onEdit,
}: DraftListProps) => {
  if (drafts.length === 0) {
    return (
      <h2 style={{ textAlign: "center" }}>
        No Drafts Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
      }}
    >
      {drafts.map((draft) => (
        <DraftCard
          key={draft.id}
          draft={draft}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default DraftList;