import { useState, useEffect } from "react";
import { State } from "../contexts/Stepper";

export const useIsSubmitDisabled = (state: State) => {
  const [isSubmitDisabled, setisSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (state.checked) {
      const noExists = Object.values(state.checked).some((answer) => answer.no);
      const allYes = Object.values(state.checked).every((answer) => answer.yes);

      if (allYes || noExists) {
        setisSubmitDisabled(false);
        return;
      }
      setisSubmitDisabled(true);
    }
  }, [state]);

  return isSubmitDisabled;
};
