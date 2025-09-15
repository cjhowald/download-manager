import { formatStatus } from "./status";
import { expect, test } from "vitest";

test("format scheduled", () => {
  expect(formatStatus("scheduled")).toEqual("Scheduled");
});
test("format available", () => {
  expect(formatStatus("available")).toEqual("Available");
});
test("format empty", () => {
  //@ts-expect-error protect against input from outside this project not matching the type
  expect(formatStatus("")).toEqual("");
});
test("format null", () => {
  //@ts-expect-error protect against input from outside this project not matching the type
  expect(formatStatus(null)).toEqual("");
});
test("format undefined", () => {
  //@ts-expect-error protect against input from outside this project not matching the type
  expect(formatStatus(undefined)).toEqual("");
});
test("format whitespace", () => {
  //@ts-expect-error protect against input from outside this project not matching the type
  expect(formatStatus(" ")).toEqual(" ");
});
