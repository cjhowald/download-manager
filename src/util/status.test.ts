import { formatStatus } from "./status";
import { expect, test } from "vitest";

test("format scheduled", () => {
  expect(formatStatus("scheduled")).toEqual("Scheduled");
});
test("format available", () => {
  expect(formatStatus("available")).toEqual("Available");
});
test("format empty", () => {
  //@ts-ignore
  expect(formatStatus("")).toEqual("");
});
test("format null", () => {
  //@ts-ignore
  expect(formatStatus(null)).toEqual("");
});
test("format undefined", () => {
  //@ts-ignore
  expect(formatStatus(undefined)).toEqual("");
});
test("format whitespace", () => {
  //@ts-ignore
  expect(formatStatus(" ")).toEqual(" ");
});
