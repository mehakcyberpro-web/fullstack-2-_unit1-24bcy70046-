import { useState } from "react";

interface DraftFormProps {
  onSubmit: (
    title: string,
    content: string,
    scheduledDate: string,
    scheduledTime: string
  ) => void;

  initialTitle?: string;
  initialContent?: string;
  initialScheduledDate?: string;
  initialScheduledTime?: string;
}

const DraftForm = ({
  onSubmit,
  initialTitle = "",
  initialContent = "",
  initialScheduledDate = "",
  initialScheduledTime = "",
}: DraftFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [scheduledDate, setScheduledDate] = useState(initialScheduledDate);
  const [scheduledTime, setScheduledTime] = useState(initialScheduledTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !content.trim() ||
      !scheduledDate ||
      !scheduledTime
    ) {
      alert("Please fill all fields.");
      return;
    }

    onSubmit(title, content, scheduledDate, scheduledTime);

    setTitle("");
    setContent("");
    setScheduledDate("");
    setScheduledTime("");
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

      <label htmlFor="scheduledDate">Schedule Date</label>
<input
  id="scheduledDate"
  type="date"
  value={scheduledDate}
  onChange={(e) => setScheduledDate(e.target.value)}
  style={{
    padding: "12px",
    fontSize: "16px",
  }}
/>

      <label htmlFor="scheduledTime">Schedule Time</label>
<input
  id="scheduledTime"
  type="time"
  value={scheduledTime}
  onChange={(e) => setScheduledTime(e.target.value)}
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