import { render, screen } from "../../test-utils";
import { Message } from "./Message";

describe("Message", () => {
  describe("Error", () => {
    beforeEach(() => {
      setup("error");
    });
    it("renders correct heading", () => {
      const heading = screen.getByRole("heading", {
        name: "Something went wrong...",
      });
      expect(heading).toBeInTheDocument();
    });
    it("renders correct message", () => {
      const message = screen.getByText("Please reload the page.");
      expect(message).toBeInTheDocument();
    });
  });
});

const setup = (variant: "error" | "success") =>
  render(
    <Message
      variant={variant}
      heading="Something went wrong..."
      message="Please reload the page."
    />
  );
