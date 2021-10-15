import { capitalize, getUserFriendlyStatusLabel } from "lib/text-transforms";

describe("Text transforms: capitalize", () => {
  it("should return a string", () => {
    expect(capitalize("test case")).toEqual("Test case");
    expect(capitalize(9)).toEqual("9");
    expect(capitalize(0)).toEqual("0");
  });
  it("should return an empty string for falsy input", () => {
    expect(capitalize("")).toEqual("");
    expect(capitalize(undefined)).toEqual("");
    expect(capitalize(null)).toEqual("");
    expect(capitalize(NaN)).toEqual("");
  });
});

describe("Text transforms: getUserFriendlyStatusLabel", () => {
  it("should return a user-friendly grammatical alternative to REQUESTED_CHANGES", () => {
    expect(getUserFriendlyStatusLabel("REQUESTED_CHANGES")).toEqual(
      "Changes requested"
    );
  });
  it("should capitalize the first letter and lowercase the rest", () => {
    expect(getUserFriendlyStatusLabel("APPROVED")).toEqual("Approved");
    expect(getUserFriendlyStatusLabel("REJECTED")).toEqual("Rejected");
  });
  it("should replace underscores with a space character", () => {
    expect(getUserFriendlyStatusLabel("this_that_other")).toEqual(
      "This that other"
    );
  });
});
