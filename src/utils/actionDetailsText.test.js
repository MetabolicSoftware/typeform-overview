import { expect, it } from "vitest";
import actionDetailsText from "./actionDetailsText.js";

it("Generates action details text for calculations using constant", () => {
  const details = {
    target: {
      type: "variable",
      value: "score",
    },
    value: {
      type: "constant",
      value: 5,
    },
  };
  const fieldsByRef = {};
  expect(actionDetailsText("add", details, fieldsByRef)).eq("@score + 5");
  expect(actionDetailsText("divide", details, fieldsByRef)).eq("@score / 5");
});

it("Generates action details text for calculations using variable", () => {
  const details = {
    target: {
      type: "variable",
      value: "score",
    },
    value: {
      type: "variable",
      value: "score",
    },
  };
  const fieldsByRef = {};
  expect(actionDetailsText("add", details, fieldsByRef)).eq("@score + @score");
});

it("Generates action details text for jump", () => {
  const action = "jump";
  const details = {
    to: {
      type: "field",
      value: "a",
    },
  };
  const fieldsByRef = {
    a: {
      shortName: "1",
    },
  };
  expect(actionDetailsText(action, details, fieldsByRef)).eq("Jump to 1");
});

it("Generates action details text for jump to thank you screen", () => {
  const action = "jump";
  const details = {
    to: {
      type: "thankyou",
      value: "default_tys",
    },
  };
  const fieldsByRef = {
    a: {
      shortName: "1",
    },
  };
  expect(actionDetailsText(action, details, fieldsByRef)).eq(
    "Jump to Thank you"
  );
});
