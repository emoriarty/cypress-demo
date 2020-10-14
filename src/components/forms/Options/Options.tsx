import React from "react";
import { Switch } from "../../inputs";
import { SwitchChangeEvent } from "../../inputs/Switch/Switch";
import "./Options.css";

export type Option = {
  label: string;
} & Required<SwitchChangeEvent>;

export type OptionsProps = {
  options: Option[];
  onSubmit?: (options: Option[]) => void;
};

function Options({ options: initialOptions, onSubmit }: OptionsProps) {
  const [options, setOptions] = React.useState<Option[]>(initialOptions);

  function handleChange(ev: SwitchChangeEvent) {
    const changedOption = ev as Required<SwitchChangeEvent>;
    setOptions(
      options.map((option) =>
        option.id === changedOption.id
          ? {
              ...option,
              checked: changedOption.checked,
            }
          : option
      )
    );
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    onSubmit && onSubmit(options);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="form">
      {options.map(({ label, ...switchProps }) => (
        <Switch key={switchProps.id} onChange={handleChange} {...switchProps}>
          {label}
        </Switch>
      ))}
      <div className="actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Options;
