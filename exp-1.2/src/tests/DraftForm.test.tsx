import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import DraftForm from "../components/DraftForm";

describe("DraftForm Component", () => {
  it("renders all form fields", () => {
    render(<DraftForm onSubmit={vi.fn()} />);

    expect(
      screen.getByPlaceholderText(/enter title/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/write your draft/i)
    ).toBeInTheDocument();

    expect(
  screen.getByLabelText(/schedule date/i)
).toBeInTheDocument();

expect(
  screen.getByLabelText(/schedule time/i)
).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /save draft/i,
      })
    ).toBeInTheDocument();
  });

  it("submits the form with entered values", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn();

    render(<DraftForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText(/enter title/i),
      "My First Draft"
    );

    await user.type(
      screen.getByPlaceholderText(/write your draft/i),
      "Testing Draft Form"
    );

    await user.type(
      screen.getByLabelText(/date/i),
      "2026-08-01"
    );

    await user.type(
      screen.getByLabelText(/time/i),
      "10:30"
    );

    await user.click(
      screen.getByRole("button", {
        name: /save draft/i,
      })
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit).toHaveBeenCalledWith(
      "My First Draft",
      "Testing Draft Form",
      "2026-08-01",
      "10:30"
    );
  });
});