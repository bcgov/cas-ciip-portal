import fs from "fs";
import path from "path";
import EasyGraphQLTester from "easygraphql-tester";
import { mutation } from "mutations/application/deleteAttachment";

const schemaCode = fs.readFileSync(
  path.join(__dirname, "../../../../server", "schema.graphql"),
  "utf8"
);

const mutationString = (mutation as any).default.params.text;

describe("deleteAttachment", () => {
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
      'Variable "$input" of required type "DeleteAttachmentInput!" was not provided.'
    );
  });
  it("Should throw an error if a variable is missing", () => {
    let error;
    try {
      tester.mock(mutationString, {
        input: {},
      });
    } catch (error_) {
      error = error_;
    }

    expect(error.message).toEqual(
      'Variable "$input" got invalid value {}; Field "id" of required type "ID!" was not provided.'
    );
  });
  it("Should return id(string) if valid", () => {
    const test = tester.mock(mutationString, {
      input: {
        id: "1",
      },
    });
    expect(test).toBeDefined();
    expect(typeof test.data.deleteAttachment.attachment.id).toBe("string");
  });
});
