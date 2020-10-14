import React from "react";
import { screen, render, RenderResult, fireEvent } from "@testing-library/react";
import Options, { Option } from "./Options";

const items: Option[] = [
  {
    id: "0",
    name: "test-1",
    checked: false,
    value: "test 1",
    label: "alpha test",
  },
  {
    id: "1",
    name: "test-2",
    checked: false,
    value: "test 2",
    label: "beta test",
  },
  {
    id: "2",
    name: "test-3",
    checked: false,
    value: "test 3",
    label: "gamma test",
  },
  {
    id: "3",
    name: "test-4",
    checked: false,
    value: "test 4",
    label: "delta test",
  },
];
const spyOnSubmit = jest.fn();
let renderResult: RenderResult;

// The imported components must be tested in relation to the current context.
// Avoid testing imported components internals.
// The test makes sure the selected components have actually been returned after submitting.
beforeAll(() => {
  renderResult = render(<Options options={items} onSubmit={spyOnSubmit} />);
});

test("submits selected options", () => {
  const checkboxes = screen.getAllByRole("checkbox");

  spyOnSubmit.mockImplementationOnce((updatedItems) => {
    // Snapshot test are good to write less verbose tests.
    // It creates automatically the tests output more legibly (see snapshot the test)
    // In this case, it makes sure updated items differs from items.
    expect(items).toMatchDiffSnapshot(updatedItems);
  });

  expect(checkboxes.length).toBe(items.length)

  fireEvent.click(checkboxes[0]);
  fireEvent.click(checkboxes[checkboxes.length - 1]);
  fireEvent.submit(screen.getByRole("form"));

  expect(spyOnSubmit).toHaveBeenCalledTimes(1);
});
