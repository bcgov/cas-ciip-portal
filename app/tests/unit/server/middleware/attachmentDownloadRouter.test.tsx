/**
 * @jest-environment node
 */
import {
  attachmentDownloadRouter,
  handleDownload,
} from "server/middleware/attachmentDownloadRouter";

const performQuery = require("../../../../server/postgraphile/graphql");
const Storage = require("@google-cloud/storage");

jest.mock("../../../../server/postgraphile/graphql");
jest.mock("@google-cloud/storage");

describe("The attachment download router", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("is configured with the correct route and handler", () => {
    const routerUnderTest = attachmentDownloadRouter;

    expect(routerUnderTest.stack).toHaveLength(1);
    expect(routerUnderTest.stack[0].route.path).toBe("/download/:attachmentId");
    expect(attachmentDownloadRouter.stack[0].route.stack[0].handle).toBe(
      handleDownload
    );
  });

  it("pipes the storage client's file", async () => {
    const mockGetMetadata = jest.fn();
    // pipe the file data from the bucket as a response
    const mockReadStream = { pipe: jest.fn() };
    const mockFile = jest.fn().mockImplementation(() => ({
      getMetadata: mockGetMetadata,
      createReadStream: jest.fn().mockReturnValue(mockReadStream),
    }));
    const mockBucket = jest.fn().mockImplementation(() => ({ file: mockFile }));

    // mock query to get file details from db
    const mockedPerformQuery = jest.spyOn(performQuery, "performQuery");

    mockedPerformQuery.mockImplementationOnce(() => {
      return {
        data: {
          attachment: {
            file: "fileUuid",
            fileName: "testFileName.extension",
            fileType: "mime/testfiletype",
          },
        },
      } as any;
    });

    // get the metadata for the file from the bucket
    mockGetMetadata.mockReturnValue([{ size: 123456 }]);

    const handlerUnderTest = handleDownload;

    // create google storage client
    const mockedStorage = jest.spyOn(Storage, "Storage");
    // bucket name
    mockedStorage.mockImplementation(() => ({ bucket: mockBucket }));

    // set response headers
    const testExpressRes = {
      setHeader: jest.fn(),
    };
    const testExpressReq = { params: { attachmentId: "123" } };

    // call the handle download function
    await handlerUnderTest(testExpressReq, testExpressRes, jest.fn());

    expect(mockedPerformQuery).toHaveBeenCalled();
    expect(mockedStorage).toHaveBeenCalled();

    // 1. The response has the right headers set

    expect(testExpressRes.setHeader).toHaveBeenCalledTimes(3);
    expect(testExpressRes.setHeader).toHaveBeenNthCalledWith(
      1,
      "Content-Length",
      123456
    );
    expect(testExpressRes.setHeader).toHaveBeenNthCalledWith(
      2,
      "Content-Disposition",
      "attachment; filename=testFileName.extension"
    );
    expect(testExpressRes.setHeader).toHaveBeenNthCalledWith(
      3,
      "Content-Type",
      "mime/testfiletype"
    );

    // 2. The storage client's file's pipe method has been called with the response object
    expect(mockReadStream.pipe).toHaveBeenCalledWith(testExpressRes);
  });

  it("calls next with the error if an exception is thrown", async () => {
    const error = new Error("test error!");
    const mockedPerformQuery = jest.spyOn(performQuery, "performQuery");
    mockedPerformQuery.mockImplementationOnce(() => {
      throw error;
    });

    const next = jest.fn();

    const handlerUnderTest = handleDownload;
    await handlerUnderTest({ params: { attachmentId: "123" } }, {}, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
