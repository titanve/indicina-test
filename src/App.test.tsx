import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import "@testing-library/jest-dom";

import { App } from "./App";

test("renders Login to Github button", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  const buttonElement = screen.getByText(/login to github/i);
  expect(buttonElement).toBeInTheDocument();
});

test("landing on a bad page", () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  history.push("/some/bad/route");
  expect(history.length).toBe(2);
  expect(history.location.pathname).toBe("/some/bad/route");
  expect(screen.getByText(/no route match/i)).toBeInTheDocument();
});
