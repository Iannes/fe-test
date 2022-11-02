import { useEffect } from "react";
import { ActionType, useStepper } from "../contexts/Stepper";
import {
  OriginalQuestionModel,
  updateClientModel,
} from "../utils/updateClientModel";

export const useUpdateClientModel = (
  questions: OriginalQuestionModel[] | undefined
): void => {
  const { dispatch } = useStepper();

  useEffect(() => {
    const getQuestions = async () => {
      const sorted = questions?.sort((a, b) => a.priority - b.priority);
      const updatedModel = updateClientModel(sorted);
      dispatch({
        type: ActionType.SET_DEFAULTS,
        payload: { questions: updatedModel },
      });
    };
    getQuestions();
  }, [dispatch, questions]);
};
