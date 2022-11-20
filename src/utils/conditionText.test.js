import { expect, it } from "vitest";
import conditionText from "./conditionText.js";

const fieldRef1 = "77bab1aa-8e9d-4d51-824f-bc7339004771";
const fieldRef2 = "77bab1aa-8e9d-4d51-824f-bc7339004772";
const choiceRef1 = "01GJ54VYG89NJ2K05X1YQ10DX1";
const choiceRef2 = "30bf5a9f-e834-4269-961f-b0bcac807426";
const fieldsByRef = {
  [fieldRef1]: {
    shortName: "1",
    properties: {
      choices: [
        {
          ref: choiceRef1,
          shortName: "A",
        },
      ],
    },
  },
  [fieldRef2]: {
    shortName: "2b",
    properties: {
      choices: [
        {
          ref: choiceRef2,
          shortName: "B",
        },
      ],
    },
  },
};

it("Generates text for is condition in current field", () => {
  const expectedPerOp = {
    is: "If this = A",
    is_not: "If this ≠ A",
    equal: "If this = A",
    not_equal: "If this ≠ A",
    lower_than: "If this < A",
    greater_than: "If this > A",
    greater_equal_than: "If this >= A",
    lower_equal_than: "If this <= A",
  };
  Object.entries(expectedPerOp).map(([op, expected]) => {
    const condition = {
      op,
      vars: [
        {
          type: "field",
          value: fieldRef1,
        },
        {
          type: "choice",
          value: choiceRef1,
        },
      ],
    };
    expect(conditionText(condition, fieldRef1, fieldsByRef)).eq(expected);
  });
});

it("Generates text for is condition with other field", () => {
  const condition = {
    op: "is",
    vars: [
      {
        type: "field",
        value: fieldRef1,
      },
      {
        type: "choice",
        value: choiceRef1,
      },
    ],
  };
  expect(conditionText(condition, fieldRef2, fieldsByRef)).eq("If 1 = A");
});

it("Generates text for and condition", () => {
  const condition = {
    op: "and",
    vars: [
      {
        op: "is",
        vars: [
          {
            type: "field",
            value: fieldRef1,
          },
          {
            type: "choice",
            value: choiceRef1,
          },
        ],
      },
      {
        op: "is",
        vars: [
          {
            type: "field",
            value: fieldRef2,
          },
          {
            type: "choice",
            value: choiceRef2,
          },
        ],
      },
    ],
  };
  expect(conditionText(condition, fieldRef1, fieldsByRef)).eq(
    "If this = A and 2b = B"
  );
});

it("Generates text for equal to @score condition", () => {
  const condition = {
    op: "equal",
    vars: [
      {
        type: "variable",
        value: "score",
      },
      {
        type: "constant",
        value: 2,
      },
    ],
  };
  expect(conditionText(condition, fieldRef1, fieldsByRef)).eq("If @score = 2");
});

it("Generates text for always condition", () => {
  const condition = {
    op: "always",
    vars: [],
  };
  expect(conditionText(condition, fieldRef1, fieldsByRef)).eq("Always");
});
