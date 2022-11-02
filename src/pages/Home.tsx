import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import classNames from "classnames";
import { fetchChecks, submitCheckResults } from "../api";
import { useStepper } from "../lib/contexts/Stepper";
import { useIsSubmitDisabled } from "../lib/hooks/useIsSubmitDisabled";
import { useNavigateKeys } from "../lib/hooks/useNavigateKeys";
import { useUpdateClientModel } from "../lib/hooks/useUpdateClientModel";
import { getFormData } from "../lib/utils/getFormData";
import { OriginalQuestionModel } from "../lib/utils/updateClientModel";
import { APP_ROUTES } from "../components/AppRouter/AppRouter";
import { ButtonGroup } from "../components/ButtonGroup";
import { Message } from "../components/Message";
import { Loading } from "../components/Loading";
import { Button } from "../components/Button";

const Home = () => {
  const [status, setStatus] = useState("loading");
  const [questions, setQuestions] = useState<OriginalQuestionModel[]>();
  const [formSubmit, setFormSubmit] = useState(false);
  const [submitError, setSubmitError] = useState({ success: true });
  const { state } = useStepper();
  const isSubmitDisabled = useIsSubmitDisabled(state);

  const handleSubmit = (e: React.FormEvent) => {
    setStatus("loading");
    e.preventDefault();
    const results = getFormData(e.target as HTMLFormElement);
    const submitResults = async (results: Record<string, string>[]) => {
      try {
        const res = await submitCheckResults(results);
        setFormSubmit(true);
        return res;
      } catch (error) {
        console.error(error);
        setSubmitError(error as React.SetStateAction<{ success: boolean }>);
        setStatus("form-error");
        return;
      }
    };

    submitResults(results);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = (await fetchChecks()) as OriginalQuestionModel[];
        setQuestions(res);
        setStatus("fulfilled");
        return res;
      } catch (error) {
        setStatus("error");
        console.error("There was a problem with the network request");
        return error;
      }
    };

    fetchQuestions();
  }, []);

  useNavigateKeys(state, isSubmitDisabled);
  useUpdateClientModel(questions);

  if (status === "error")
    return (
      <Message
        variant="error"
        heading="Something went wrong..."
        message="Please refresh the page"
      />
    );

  if (formSubmit) {
    return <Navigate to="/success" replace={false} />;
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (submitError.success === false) {
    return (
      <Message
        variant="error"
        heading="⚠️ Form was not submitted"
        message="Please try to refresh the page and answer the questions again."
      />
    );
  }

  const buttonClassNames = classNames({
    "button-group": true,
  });

  return (
    <div className="fade-in">
      <div className="App">
        {/* <h1>Veriff</h1> */}
        <form
          className="form-container"
          onSubmit={handleSubmit}
          action={APP_ROUTES.SUCCESS}
        >
          {state.questions.map((question, index) => (
            <ButtonGroup index={index} key={question.id} question={question} />
          ))}
          <div className={buttonClassNames}>
            <Button
              tabIndex={isSubmitDisabled === false ? 0 : undefined}
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
