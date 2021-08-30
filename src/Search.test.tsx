import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Search } from "./components/Search";

test("renders Search Github button", () => {
  render(<Search />);
  const buttonElement = screen.getByText(/search github/i);
  const inputElement = screen.getByTestId(/input-search/i);

  expect(buttonElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
});

test("displays the logout pane", () => {
  render(<Search />);
  const chevronElement = screen.getByTestId(/user-chevron/i);
  act(() => {
    /* fire events that update state */
    fireEvent.click(chevronElement);
  });
  const logoutPaneElement = screen.getByTestId(/logout-pane/i);

  expect(logoutPaneElement).toBeInTheDocument();
});
