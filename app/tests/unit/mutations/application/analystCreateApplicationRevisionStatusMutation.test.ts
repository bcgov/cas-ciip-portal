import fs from "fs";
import path from "path";
import EasyGraphQLTester from "easygraphql-tester";
import { mutation } from "mutations/application/analystCreateApplicationRevisionStatusMutation";

const schemaCode = fs.readFileSync(
  path.join(__dirname, "../../../../server", "schema.graphql"),
  "utf8"
);

const mutationString = (mutation as any).default.params.text;

describe("analystCreateApplicationRevisionStatusMutation", () => {
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
      'Variable "$input" of required type "CreateApplicationRevisionStatusInput!" was not provided.'
    );
  });
  it("Should throw an error if a variable is missing", () => {
    let error;
    try {
      tester.mock(mutationString, {
        input: {
          id: 1,
        },
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value { id: 1 }; Field "applicationRevisionStatus" of required type "ApplicationRevisionStatusInput!" was not provided.'
    );
  });
  it("Should return id(string) if valid", () => {
    const test = tester.mock(mutationString, {
      input: {
        applicationRevisionStatus: {
          applicationId: 1,
          applicationRevisionStatus: "APPROVED",
          versionNumber: 1,
        },
      },
    });

    expect(test).toBeDefined();
    expect(
      typeof test.data.createApplicationRevisionStatus.applicationRevisionStatus
        .id
    ).toBe("string");
  });
});
