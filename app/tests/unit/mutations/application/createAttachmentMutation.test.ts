import fs from "fs";
import path from "path";
import EasyGraphQLTester from "easygraphql-tester";
import { mutation } from "mutations/application/createAttachmentMutation";

const schemaCode = fs.readFileSync(
  path.join(__dirname, "../../../../server", "schema.graphql"),
  "utf8"
);

const mutationString = (mutation as any).default.params.text;

describe("createAttachmentMutation", () => {
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
      'Variable "$input" of required type "CreateAttachmentInput!" was not provided.'
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
      'Variable "$input" got invalid value { id: 1 }; Field "attachment" of required type "AttachmentInput!" was not provided.'
    );
  });

  it("Should return id(string) if valid", () => {
    const test = tester.mock(mutationString, {
      input: {
        attachment: {
          file: "e6d927b7-0a8c-43f6-a037-fb22cf57be7a",
          fileName: "name",
          fileSize: "2523",
          fileType: "pdf",
          applicationId: 1,
        },
      },
    });

    expect(test).toBeDefined();
    expect(typeof test.data.createAttachment.attachment.id).toBe("string");
  });
});
