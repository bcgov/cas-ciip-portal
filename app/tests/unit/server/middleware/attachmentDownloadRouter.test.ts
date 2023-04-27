/**
 * @jest-environment node
 */
import { Storage } from "@google-cloud/storage";
import {
  attachmentDownloadRouter,
  handleDownload,
} from "server/middleware/attachmentDownloadRouter";

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
});
