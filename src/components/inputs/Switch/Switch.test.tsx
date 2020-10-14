import React from "react";
import { render, RenderResult, fireEvent, screen } from "@testing-library/react";
import Switch, { SwitchChangeEvent } from "./Switch";

const id = "test-id";
const name = "test-name";
const value = "test-value";
const label = "test children";
const spyOnChange = jest.fn();
let renderResult: RenderResult;

// To clarify the test scope it is a good practice to declare the setup at the beginning.
beforeAll(() => {
  renderResult = render(
    <Switch id={id} name={name} value={value} onChange={spyOnChange}>
      {label}
    </Switch>
  );
});

// Write succint clear descriptions.
// Most of the time, avoid tests descriptions like 'renders properly' or 'the label node wrapps the checkbox input'.
// It's not required describing the DOM output specifically because the DOM structure is tested implicitly.
// Stick to descriptions closer to the UX.
test("changes state when clicked", () => {
  const { rerender } = renderResult;
  let checked;

  // Test can be located within callbacks
  // In this way expectations are executed like the expected function
  spyOnChange.mockImplementation((ev: SwitchChangeEvent) => {
    // Snapshot tests can be also used for objects
    // It helps to check if the object have changed regarding modifications
    expect(ev).toMatchSnapshot();
    checked = ev.checked;
  });

  // Queries like getByRole throws an error when a node is not found,
  // so there's no need to write a expect
  const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  // Use rerenderer when a prop must be updated
  rerender(
    <Switch
      id={id}
      name={name}
      value={value}
      onChange={spyOnChange}
      checked={checked}
    >
      {label}
    </Switch>
  );
  expect(checkbox.checked).toBe(true);

  fireEvent.click(screen.getByText(label));
  rerender(
    <Switch
      id={id}
      name={name}
      value={value}
      onChange={spyOnChange}
      checked={checked}
    >
      {label}
    </Switch>
  );
  expect(checkbox.checked).toBe(false);

  expect(spyOnChange).toHaveBeenCalledTimes(2);
});
