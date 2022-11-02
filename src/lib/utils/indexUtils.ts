import { Question } from "../contexts/Stepper";

export const findLastItem = (
  selectedQuestionIndex: number,
  totalNumberOfQuestions: number
) => {
  return selectedQuestionIndex + 1 === totalNumberOfQuestions;
};

export const checkIfIsLastItem = (
  selectedQuestionIndex: number,
  totalNumberOfQuestions: number
) => {
  return selectedQuestionIndex + 1 < totalNumberOfQuestions;
};

export const setNextItem = (
  isNotLastItemInArray: boolean,
  selectedQuestionIndex: number
) => {
  return isNotLastItemInArray
    ? selectedQuestionIndex + 1
    : selectedQuestionIndex;
};

export const findSelectedQuestionIndex = (
  questions: Question[],
  id: string | undefined
): number => {
  return questions.findIndex((item) => item.id === id);
};
