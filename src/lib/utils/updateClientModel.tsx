import { Question } from "../contexts/Stepper";

export type OriginalQuestionModel = Omit<Question, "disabled">;

// Adds a disabled property to each object

export const updateClientModel = (
  questions: OriginalQuestionModel[] | undefined
): Question[] => {
  if (typeof questions === "undefined") return [];
  return questions.map((question, index) => {
    return (question = {
      ...question,
      disabled: index > 0,
    } as Question);
  });
};
