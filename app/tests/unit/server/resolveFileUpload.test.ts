import { resolveFileUpload } from "server/postgraphile/resolveFileUpload";
// const {
//   saveRemoteFile,
// } = require("../../../server/postgraphile/saveRemoteFile");
import * as saveRemoteFile from "server/postgraphile/saveRemoteFile";
// if this is within the test it tries to run real function
jest.mock("server/postgraphile/saveRemoteFile");

describe("The resolveFileUpload function", () => {
  it.only("should call saveRemoteFile", async () => {
    const upload = {
      filename: "1dummy.pdf",
      mimetype: "application/pdf",
      encoding: "7bit",
      createReadStream: jest.fn(),
    };
    // const spy = jest.mock("server/postgraphile/saveRemoteFile", () => () =>
    //   Promise.resolve()
    // );

    // const myfuncspy = jest
    //   .spyOn(
    //     require("../../../server/postgraphile/saveRemoteFile"),
    //     "saveRemoteFile"
    //   )
    //   .mockImplementation(() => Promise.resolve());

    // const spy = jest
    //   .spyOn(require("./saveRemoteFile"), "saveRemoteFile")
    //   .mockImplementation(() => () => Promise.resolve());

    const mockSaveRemoteFile = (saveRemoteFile.saveRemoteFile = jest
      .fn()
      .mockReturnValue(() => Promise.resolve({ uuid: "dh" })));

    await resolveFileUpload(upload);
    expect(mockSaveRemoteFile).toHaveBeenCalled();
  });
  it("throw an error if filetype is not PDF", async () => {
    const upload = {
      filename: "1dummy.jpg",
      mimetype: "not a pdf",
      encoding: "7bit",
      createReadStream: jest.fn(),
    };
    // need to wrap assertion in a function or else the error will not be caught
    expect(() => {
      resolveFileUpload(upload);
    }).toThrow;
  });
  it("should throw an error if the file is too large", async () => {
    const upload = {
      filename: "1dummy.pdf",
      mimetype: "application/pdf",
      encoding: "7bit",
      createReadStream: jest.fn(),
    };
    // if this ends up being done elsewhere test there
  });
});

// check that it's called with the right things
// check error thrown on save function
