import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Results } from "./components/Results";

test("renders Results Github button", () => {
  render(<Results />);
  const inputElement = screen.getByTestId(/input-results/i);

  expect(inputElement).toBeInTheDocument();
});

test("displays the logout pane", () => {
  render(<Results />);
  const chevronElement = screen.getByTestId(/user-chevron/i);
  act(() => {
    /* fire events that update state */
    fireEvent.click(chevronElement);
  });
  const logoutPaneElement = screen.getByTestId(/logout-pane/i);

  expect(logoutPaneElement).toBeInTheDocument();
});
