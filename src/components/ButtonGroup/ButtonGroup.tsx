import React from "react";
import classNames from "classnames";
import {
  ActionType,
  Choice,
  Question,
  useStepper,
} from "../../lib/contexts/Stepper";
import { ReactFCC } from "../../types";
import { RadioButton } from "../RadioButton";
import "./ButtonGroup.css";

type ButtonGroupProps = {
  question: Question;
  index: number;
};

export const ButtonGroup: ReactFCC<ButtonGroupProps> = ({
  question,
  index,
}) => {
  const { state, dispatch } = useStepper();

  const currentGroup = state?.checked?.[question.id];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const answer = e.target.name.split("-")[0];
    const answerIsDirty = state.checked[question.id][answer];
    const payload = { id: question.id, choice: answer, index };

    dispatch({
      type: ActionType.SET_PREVIOUSLY_SELECTED,
      payload: { previouslySelected: e.target.name, choice: answer },
    });

    // prevent previously selected answers from being re-selected
    if (answerIsDirty || state.previouslySelected === e.target.name) return;

    dispatch({
      type: ActionType.SET_CHECKED,
      payload,
    });
  };

  const buttonGroupClassNames = classNames({
    "button-group": true,
    active: index === state.activeStep,
  });

  const isCurrentQuestionDisabled =
    state?.questions?.[index]?.disabled ?? false;

  return (
    <div
      aria-disabled={isCurrentQuestionDisabled}
      className={buttonGroupClassNames}
    >
      <fieldset tabIndex={question.disabled === false ? 0 : undefined}>
        <legend>{question.description}</legend>
        <RadioButton
          position="left"
          name={`yes-${question.id}`}
          onChange={handleChange}
          checked={currentGroup?.yes ?? false}
          variant="primary"
          value={Choice.YES}
          disabled={question.disabled}
        />
        <RadioButton
          position="right"
          name={`no-${question.id}`}
          onChange={handleChange}
          checked={currentGroup?.no ?? false}
          variant="primary"
          value={Choice.NO}
          disabled={question.disabled}
        />
      </fieldset>
    </div>
  );
};
