/**
 * @jest-environment node
 */

import {
  attachmentDeleteRouter,
  handleDelete,
} from "server/middleware/deleteFileMiddleware";

describe("The attachment delete router", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("is configured with the right route and handler", () => {
    const routerUnderTest = attachmentDeleteRouter;

    expect(routerUnderTest.stack).toHaveLength(1);
    expect(routerUnderTest.stack[0].route.path).toBe("/delete/:attachmentId");
    expect(attachmentDeleteRouter.stack[0].route.stack[0].handle).toBe(
      handleDelete
    );
  });

  it("calls next() with the error if an exception is thrown", async () => {
    const error = new TypeError(
      "Cannot read properties of undefined (reading 'attachmentId')"
    );
    const next = jest.fn();
    const handlerUnderTest = handleDelete;

    handlerUnderTest({ garbage: "i will cause an error" }, {}, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
