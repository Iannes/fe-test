import { constructCheckedStateObject } from "./index";

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
    disabled: true,
  },
];

describe("constructCheckedStateObject", () => {
  const newObject = constructCheckedStateObject(questions);
  it("construct object with ids as properties", () => {
    expect(newObject).toHaveProperty("ddd");
    expect(newObject).toHaveProperty("bbb");
  });
});
