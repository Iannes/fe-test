import { Question } from "../../contexts/Stepper";

export const updateDisabledProperty = (
  questions: Question[],
  index: number,
  disabled: boolean
) => (questions[index].disabled = disabled);
