import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import DraftCard from "../components/DraftCard";

const draft = {
  id: "1",
  title: "My Draft",
  content: "This is a test draft.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  scheduledDate: "2026-07-27",
  scheduledTime: "10:30",
};

describe("DraftCard Component", () => {
  it("renders draft information", () => {
    render(
      <DraftCard
        draft={draft}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("My Draft")).toBeInTheDocument();
    expect(screen.getByText("This is a test draft.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls edit and delete handlers", async () => {
    const user = userEvent.setup();

    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <DraftCard
        draft={draft}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    await user.click(screen.getByRole("button", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(draft);

    await user.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});