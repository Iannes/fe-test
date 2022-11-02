import {
  Choice,
  Question,
  SetQuestionsAction,
  State,
} from "../contexts/Stepper";
import { setNextItem, findSelectedQuestionIndex } from "./indexUtils";
import { updateDisabledProperty } from "./updateDisabledProperty";

const DESELECTED_ANSWERS = { yes: false, no: false };

export const updateQuestionsStatus = (
  state: State,
  action: SetQuestionsAction,
  choice: string | undefined
) => {
  const { questions } = state;

  const selectedQuestionIndex = findSelectedQuestionIndex(
    state.questions,
    action.payload.id
  );

  const isNotLastItem =
    selectedQuestionIndex + 1 < state.totalNumberOfQuestions;

  const nextItem = setNextItem(isNotLastItem, selectedQuestionIndex);
  const nextItemId = questions[nextItem].id;

  if (choice === Choice.YES) {
    updateDisabledProperty(questions, nextItem, false);
  }

  if (choice === Choice.NO) {
    state.questions.map((question: Question, index: number) => {
      if (selectedQuestionIndex < index) {
        updateDisabledProperty(questions, index, true);
        state.checked[question.id] = DESELECTED_ANSWERS;
      }

      return state.questions;
    });
  }

  return {
    questionsWithStatusUpdates: questions,
    nextItemId,
  };
};
