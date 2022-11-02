import classNames from "classnames";
import * as React from "react";
import "./Message.css";

type MessageProps = {
  heading?: string;
  message: string;
  variant?: "success" | "error";
};

export const Message: React.FC<MessageProps> = ({
  heading,
  message,
  variant = "success",
}) => {
  const messageClassNames = classNames({
    "fade-in": true,
    message: true,
    [variant]: true,
  });

  return (
    <article className={messageClassNames}>
      {heading && <h2>{heading}</h2>}
      <div>{message}</div>
    </article>
  );
};
