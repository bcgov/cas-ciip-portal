import fs from "fs";
import path from "path";
import EasyGraphQLTester from "easygraphql-tester";
import { mutation } from "mutations/application_review_step/updateApplicationReviewStepMutation";

const schemaCode = fs.readFileSync(
  path.join(__dirname, "../../../../server", "schema.graphql"),
  "utf8"
);

const mutationString = (mutation as any).default.params.text;

describe("updateApplicationReviewStepMutation", () => {
  let tester;
  beforeEach(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
  it("Should throw an error if input is missing", () => {
    let error;
    try {
      tester.mock(mutationString);
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" of required type "UpdateApplicationReviewStepInput!" was not provided.'
    );
  });
  it("Should throw an error if a variable is missing", () => {
    let error;
    try {
      tester.mock(mutationString, {
        input: {
          id: "abc",
        },
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { id: "abc" }; Field "applicationReviewStepPatch" of required type "ApplicationReviewStepPatch!" was not provided.'
    );
  });
  it("Should return isComplete(boolean) if valid", () => {
    const test = tester.mock(mutationString, {
      input: {
        id: "abc",
        applicationReviewStepPatch: {
          isComplete: true,
        },
      },
    });
    expect(test).toBeDefined();
    expect(
      test.data.updateApplicationReviewStep.applicationReviewStep.isComplete
    ).toBeOneOf([true, false, null]);
  });
});
