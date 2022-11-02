import { useEffect } from "react";
import { ActionType, Choice, State, useStepper } from "../contexts/Stepper";
import { selectAnswer } from "../utils/selectAnswer";
import { useKeyPress } from "./useKeypress";

export const useNavigateKeys = (
  state: State,
  isSubmitDisabled: boolean
): void => {
  const { dispatch } = useStepper();
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowUpPressed = useKeyPress("ArrowUp");
  const oneKeyPressed = useKeyPress("1");
  const twoKeyPressed = useKeyPress("2");

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({
        type: ActionType.UP,
        payload: {},
      });
    }
  }, [arrowUpPressed, dispatch]);

  useEffect(() => {
    if (arrowDownPressed) {
      const isNextStepEnabled =
        state?.questions?.[state?.activeStep + 1]?.disabled === false;
      isNextStepEnabled &&
        dispatch({
          type: ActionType.DOWN,
          payload: {},
        });
    }
  }, [
    arrowDownPressed,
    dispatch,
    isSubmitDisabled,
    state?.activeStep,
    state?.questions,
  ]);

  useEffect(() => {
    // we don't need this to run on a non-existent step
    if (state.activeStep === -1) return;
    if (oneKeyPressed) {
      selectAnswer(state, Choice.YES, dispatch);
    }
    if (twoKeyPressed) {
      selectAnswer(state, Choice.NO, dispatch);
    }
  }, [oneKeyPressed, twoKeyPressed, dispatch, state]);
};
