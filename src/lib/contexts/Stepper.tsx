import * as React from "react";
import { ReactFCC } from "../../types";
import { updateClientModel } from "../utils/updateClientModel";
import { constructCheckedStateObject } from "../utils/constructCheckedStateObject/index";
import { updateQuestionsStatus } from "../utils/updateQuestionsStatus";

type Payload = {
  questions?: Question[];
  id?: string;
  index?: number;
  choice?: string;
  previouslySelected?: string;
  formReady?: boolean;
  activeStep?: number;
  lastActiveStep?: number;
};

export type SetQuestionsAction = {
  type: ActionType;
  payload: Payload;
};

type Action = SetQuestionsAction;

type Dispatch = (action: Action) => void;

export type Question = {
  id: string;
  priority: number;
  description: string;
  disabled: boolean;
};

export enum Choice {
  YES = "yes",
  NO = "no",
}

export type Choices = Record<string, boolean>;

export type Checked = {
  [questionId: string]: Choices;
};

export type State = {
  questions: Question[] | [];
  checked: Checked;
  totalNumberOfQuestions: number;
  activeStep: number;
  lastActiveStep: number;
  nextItemId: string;
  previouslySelected: string | undefined;
};

export enum ActionType {
  UP = "arrowUp",
  DOWN = "arrowDown",
  ONE = "onePressed",
  SET_DEFAULTS = "setDefaults",
  SET_CHECKED = "setChecked",
  SET_PREVIOUSLY_SELECTED = "setPreviouslySelected",
  UPDATE_DISABLED = "updateDisabled",
}

const initialState = {
  questions: [],
  checked: undefined,
  activeStep: -1,
  lastActiveStep: 0,
  nextItemId: "",
  totalNumberOfQuestions: 0,
  previouslySelected: undefined,
};

const OPPOSITE_ANSWERS = {
  yes: "no",
  no: "yes",
};

function stepperReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SET_DEFAULTS: {
      const questions = action?.payload?.questions as Question[];
      const addedProperty = updateClientModel(questions);
      return {
        ...state,
        questions: addedProperty,
        checked: constructCheckedStateObject(addedProperty),
        nextItemId: questions?.[state?.activeStep + 1]?.id,
        totalNumberOfQuestions: addedProperty.length,
      };
    }
    case ActionType.SET_CHECKED: {
      const { choice } = action.payload;
      const usersChoice = choice as string
      const id = action?.payload?.id as keyof typeof state.checked;
      const oppositeAnswer =
        OPPOSITE_ANSWERS[choice as keyof typeof OPPOSITE_ANSWERS];
      const { questionsWithStatusUpdates } = updateQuestionsStatus(
        state,
        action,
        choice
      );

      return {
        ...state,
        questions: questionsWithStatusUpdates,
        activeStep: action.payload.index,
        checked: {
          ...state.checked,
          [id]: {
            [usersChoice]: !state.checked?.[id][usersChoice],
            [oppositeAnswer]: state.checked?.[id][usersChoice],
          },
        },
      };
    }

    case ActionType.SET_PREVIOUSLY_SELECTED: {
      return {
        ...state,
        choice: action.payload.choice,
        previouslySelected: action.payload.previouslySelected,
      };
    }

    case ActionType.DOWN: {
      const activeStep =
        state.activeStep !== state.questions?.length - 1
          ? state.activeStep + 1
          : state.questions?.length - 1;

      const nextItemId =
        state?.questions?.[activeStep + 1]?.id ?? state.previouslySelected;

      return {
        ...state,
        activeStep: activeStep,
        lastActiveStep: state.activeStep + 1,
        nextItemId,
      };
    }

    case ActionType.UP: {
      const getActiveStep = () => {
        if (state.activeStep === -1) return -1;
        if (state.activeStep > 0) return state.activeStep - 1;
        if (state.activeStep === 0) return 0;
      };

      const activeStep = getActiveStep() as number;
      const nextItemId = state?.questions?.[activeStep + 1]?.id;
      return {
        ...state,
        activeStep,
        nextItemId,
      };
    }

    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

const StepperStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const StepperProvider: ReactFCC = ({ children }) => {
  //@ts-ignore
  const [state, dispatch] = React.useReducer(stepperReducer, initialState);

  const value = { state, dispatch };
  return (
    <StepperStateContext.Provider value={value}>
      {children}
    </StepperStateContext.Provider>
  );
};

function useStepper() {
  const context = React.useContext(StepperStateContext);

  if (context === undefined) {
    throw new Error("useStepper must be used within a StepperProvider");
  }

  return context;
}

export { StepperProvider, useStepper };
