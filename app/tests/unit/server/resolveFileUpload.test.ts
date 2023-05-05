import { resolveFileUpload } from "server/postgraphile/resolveFileUpload";
const saveRemoteFile = require("server/postgraphile/saveRemoteFile");
jest.mock("server/postgraphile/saveRemoteFile");
const mockedCreateReadStream = jest.fn();
const upload = {
  filename: "1dummy.jpg",
  mimetype: "application/pdf",
  encoding: "7bit",
  createReadStream: mockedCreateReadStream.mockReturnValue({
    _writeStream: {
      _writableState: {
        length: 49000000,
      },
    },
  }),
};

describe("The resolveFileUpload function", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it("should call saveRemoteFile", async () => {
    const mockedSaveRemoteFile = jest.spyOn(saveRemoteFile, "saveRemoteFile");

    mockedSaveRemoteFile.mockResolvedValue(() => {
      // eslint-disable-next-line
      uuid: "lala";
    });

    await resolveFileUpload(upload);
    expect(mockedSaveRemoteFile).toHaveBeenCalled();
  });

  it("throw an error if filetype is not PDF", async () => {
    const upload = {
      filename: "1dummy.jpg",
      mimetype: "not a pdf",
      encoding: "7bit",
      createReadStream: mockedCreateReadStream.mockReturnValue({
        _writeStream: {
          _writableState: {
            length: 45000000,
          },
        },
      }),
    };

    await resolveFileUpload(upload).catch((e) => {
      expect(e.message).toEqual("Only PDF format is accepted");
    });
  });

  it("should throw an error if the file is too large", async () => {
    const upload = {
      filename: "1dummy.jpg",
      mimetype: "application/pdf",
      encoding: "7bit",
      createReadStream: mockedCreateReadStream.mockReturnValue({
        _writeStream: {
          _writableState: {
            length: 60000000,
          },
        },
      }),
    };

    await resolveFileUpload(upload).catch((e) => {
      expect(e.message).toEqual("Files must be smaller than 50MB");
    });
  });
});
