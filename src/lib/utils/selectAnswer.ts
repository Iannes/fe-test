import { State, Choice, ActionType } from "../contexts/Stepper";

export const selectAnswer = (
  state: State,
  selectedAnswer: Choice,
  dispatch: any
) => {
  if (state.activeStep === state.totalNumberOfQuestions) return;

  if (state?.questions?.[state?.activeStep]?.disabled) return;

  const id = state?.questions?.[state.activeStep]?.id;
  const payload = { id, choice: selectedAnswer, index: state.activeStep };
  const answerHasNotBeenSelected =
    state?.checked?.[id]?.[selectedAnswer] === false;

  answerHasNotBeenSelected &&
    dispatch({ type: ActionType.SET_CHECKED, payload });
};
