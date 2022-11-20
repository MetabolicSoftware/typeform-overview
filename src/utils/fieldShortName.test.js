import { expect, it } from "vitest";
import fieldShortName from "./fieldShortName.js";

it("Generates numbered shortname for top level fields", () => {
  expect(fieldShortName(0)).eq("1");
  expect(fieldShortName(1)).eq("2");
});
it("Generates numbered + alphabetical shortname for fields in groups", () => {
  expect(fieldShortName(0, 1, "1")).eq("1a");
  expect(fieldShortName(1, 1, "2")).eq("2b");
  expect(fieldShortName(25, 1, "1")).eq("1z");
  expect(fieldShortName(26, 1, "1")).eq("1aa");
  expect(fieldShortName(27, 1, "1")).eq("1ab");
  expect(fieldShortName(28, 1, "1")).eq("1ac");
  expect(fieldShortName(51, 1, "1")).eq("1az");
  expect(fieldShortName(52, 1, "1")).eq("1ba");
  expect(fieldShortName(53, 1, "1")).eq("1bb");
});
