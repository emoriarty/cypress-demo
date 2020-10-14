import React from "react";
import { render, screen, RenderResult } from "@testing-library/react";
import App from "./App";

let renderResult: RenderResult;

// A broader component like App must ensure imported components are rendered properly.
// If it's not absolutely necessary, don't test imported components internals.
beforeEach(() => {
  render(<App />);
});

test("renders the header", () => {
  screen.getByText(/Sample/i);
});

test("renders the options form", () => {
  screen.getByText(/Options Form/i);
  screen.getByRole("form");
  expect(screen.getAllByRole("checkbox").length).toBe(5)
});
