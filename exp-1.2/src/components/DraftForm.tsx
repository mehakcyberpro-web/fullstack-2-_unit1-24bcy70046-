import { useState } from "react";

interface DraftFormProps {
  onSubmit: (title: string, content: string) => void;

  initialTitle?: string;

  initialContent?: string;
}

const DraftForm = ({
  onSubmit,
  initialTitle = "",
  initialContent = "",
}: DraftFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields.");
      return;
    }

    onSubmit(title, content);

    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "600px",
        margin: "30px auto",
      }}
    >
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "12px",
          fontSize: "16px",
        }}
      />

      <textarea
        placeholder="Write your draft..."
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          padding: "12px",
          fontSize: "16px",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Draft
      </button>
    </form>
  );
};

export default DraftForm;