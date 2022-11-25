import { expect, it } from "vitest";
import choiceShortName from "./choiceShortName.js";

it("Generates shortname for choices", () => {
  expect(choiceShortName(0)).eq("A");
  expect(choiceShortName(1)).eq("B");
});
