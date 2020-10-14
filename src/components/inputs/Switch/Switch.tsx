import React from "react";
import "./Switch.css";

export type SwitchChangeEvent = {
  id?: string;
  name?: string;
  checked?: boolean;
  value?: string;
};

export type SwitchProps = React.PropsWithChildren<
  {
    onChange: (ev: SwitchChangeEvent) => void;
    labeled?: boolean;
  } & SwitchChangeEvent
>;

function Switch({
  children,
  labeled = false,
  onChange,
  checked = false,
  ...props
}: SwitchProps) {
  function handleChange() {
    onChange({ ...props, checked: !checked });
  }

  return (
    <label className="labelSwitch">
      {children}
      <span className="switch">
        <input
          key="input"
          type="checkbox"
          onChange={handleChange}
          checked={!!checked}
          {...props}
        />
        <span key="switch" className="slider round" />,
      </span>
    </label>
  );
}

export default Switch;
