import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { StepperProvider } from "./lib/contexts/Stepper";
import { ReactFCC } from "./types";

const AllProviders: ReactFCC = ({ children }) => {
  return <StepperProvider>{children}</StepperProvider>;
};

const Wrapper: ReactFCC = ({ children }) => {
  return <AllProviders>{children}</AllProviders>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
