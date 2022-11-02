import { updateDisabledProperty } from "./index";

const questions = [
  {
    id: "ddd",
    priority: 3,
    description: "Document data is clearly visible",
    disabled: true,
  },
  {
    id: "bbb",
    priority: 3,
    description: "Some text",
    disabled: false,
  },
];

describe("updateDisabledProperty", () => {
  it("updates disabled property correctly", () => {
    const trueToFalse = updateDisabledProperty(questions, 0, false);
    const falseToTrue = updateDisabledProperty(questions, 1, true);
    expect(trueToFalse).toBeFalsy();
    expect(falseToTrue).toBeTruthy();
  });
});
