import { Checked, Question } from "../../contexts/Stepper";

export const constructCheckedStateObject = (questions: Question[]): Checked => {
  return Object.fromEntries(
    questions.map(({ id }) => [id, { yes: false, no: false }])
  );
};
