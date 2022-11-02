import { ButtonHTMLAttributes } from "react";
import { ReactFCC } from "../../types";
import "./Button.css";

export const Button: ReactFCC<ButtonHTMLAttributes<unknown>> = ({
  children,
  ...rest
}) => {
  return (
    <button className="Button" {...rest}>
      {children}
    </button>
  );
};
