import * as React from "react";
import "./RadioButton.css";

interface RadioButtonProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  variant: "primary" | "secondary";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  position: "left" | "right";
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  value,
  checked,
  onChange,
  variant,
  disabled,
  position,
  ...rest
}) => {
  const id = `choice-${name}`;

  const dataAttribute = {
    [`data-${position}-button`]: true,
  };

  return (
    <>
      <input
        tabIndex={0}
        onChange={onChange}
        className={`radio-button radio-button-${variant}`}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
      <label {...dataAttribute} htmlFor={id}>
        {value}
      </label>
    </>
  );
};
