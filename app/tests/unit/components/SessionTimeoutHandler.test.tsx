import SessionTimeoutHandler from "components/SessionTimeoutHandler";
import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";

const existingFetch = global.fetch;

afterEach(() => {
  global.fetch = existingFetch;
  jest.useRealTimers();
  jest.clearAllMocks();
});

const setupFetchMock = (timeoutValue, response_override = {}) => {
  const fetchMock = jest.fn();
  fetchMock.mockImplementation(() => ({
    ok: true,
    json: async () => timeoutValue,
    ...response_override,
  }));

  global.fetch = fetchMock;
  return fetchMock;
};

describe("The Session Timeout Handler", () => {
  it("Shows the modal if there is less time left in the session than the delay", async () => {
    const secondsLeftInSession = 15;
    const displayDelayBeforeLogout = 30;

    jest.useFakeTimers();
    setupFetchMock(secondsLeftInSession);

    let componentUnderTest;
    await act(async () => {
      componentUnderTest = mount(
        <div>
          <SessionTimeoutHandler
            modalDisplaySecondsBeforeLogout={displayDelayBeforeLogout}
          />
        </div>
      );
    });

    await componentUnderTest.update();

    expect(componentUnderTest.find(".modal").length).toBe(1);
    expect(componentUnderTest).toMatchSnapshot();
  });

  it("Hides the modal if there is more time left in the session than the delay", async () => {
    const secondsLeftInSession = 45;
    const displayDelayBeforeLogout = 30;

    jest.useFakeTimers();
    setupFetchMock(secondsLeftInSession);

    let componentUnderTest;
    await act(async () => {
      componentUnderTest = mount(
        <div>
          <SessionTimeoutHandler
            modalDisplaySecondsBeforeLogout={displayDelayBeforeLogout}
          />
        </div>
      );
    });

    await componentUnderTest.update();

    expect(componentUnderTest.find(".modal").length).toBe(0);
  });

  it("Routes to login-redirect if the session is expired", async () => {
    const mockRouter = { push: jest.fn(), asPath: "mock-redirect-to" };
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementation(() => {
      return mockRouter;
    });

    const secondsLeftInSession = 0;
    const displayDelayBeforeLogout = 30;

    jest.useFakeTimers();
    setupFetchMock(secondsLeftInSession);

    let componentUnderTest;
    await act(async () => {
      componentUnderTest = mount(
        <div>
          <SessionTimeoutHandler
            modalDisplaySecondsBeforeLogout={displayDelayBeforeLogout}
          />
        </div>
      );
    });

    await componentUnderTest.update();

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/login-redirect",
      query: {
        redirectTo: "mock-redirect-to",
        sessionIdled: true,
      },
    });
  });

  it("Routes to login-redirect if the server replies with not ok", async () => {
    const mockRouter = { push: jest.fn(), asPath: "mock-redirect-to" };
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementation(() => {
      return mockRouter;
    });

    const secondsLeftInSession = 0;
    const displayDelayBeforeLogout = 30;

    setupFetchMock(secondsLeftInSession, { ok: false });

    let componentUnderTest;
    await act(async () => {
      componentUnderTest = mount(
        <div>
          <SessionTimeoutHandler
            modalDisplaySecondsBeforeLogout={displayDelayBeforeLogout}
          />
        </div>
      );
    });

    await componentUnderTest.update();

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/login-redirect",
      query: {
        redirectTo: "mock-redirect-to",
        sessionIdled: true,
      },
    });
  });

  it("Calls the /session-idle-remaining-time endpoint and hides the modal when the user clicks the extend button", async () => {
    const secondsLeftInSession = 15;
    const displayDelayBeforeLogout = 30;

    jest.useFakeTimers();
    setupFetchMock(secondsLeftInSession);

    let componentUnderTest;
    await act(async () => {
      componentUnderTest = mount(
        <div>
          <SessionTimeoutHandler
            modalDisplaySecondsBeforeLogout={displayDelayBeforeLogout}
          />
        </div>
      );
    });

    await componentUnderTest.update();

    expect(componentUnderTest.find(".modal").length).toBe(1);

    const fetchMock = setupFetchMock(999);

    const clickRefeshHandler = componentUnderTest
      .find(".btn-primary")
      .prop("onClick");

    await act(async () => {
      await clickRefeshHandler();
    });

    await componentUnderTest.update();

    expect(componentUnderTest.find(".modal").length).toBe(0);
    expect(fetchMock).toHaveBeenCalledWith("/session-idle-remaining-time");
  });

  it("Shows the modal again after the user extends the session and time passes", async () => {
    const secondsLeftInSession = 45;
    const displayDelayBeforeLogout = 30;

    jest.useFakeTimers();
    setupFetchMock(secondsLeftInSession);

    let componentUnderTest;
    await act(async () => {
      componentUnderTest = mount(
        <div>
          <SessionTimeoutHandler
            modalDisplaySecondsBeforeLogout={displayDelayBeforeLogout}
          />
        </div>
      );
    });

    await componentUnderTest.update();
    expect(componentUnderTest.find(".modal").length).toBe(0);

    await act(async () => {
      // Advance the clock by 30 seconds
      jest.advanceTimersByTime(30000);
    });

    await componentUnderTest.update();
    expect(componentUnderTest.find(".modal").length).toBe(1);

    const fetchMock = setupFetchMock(60); // One minute left in session

    const clickRefeshHandler = componentUnderTest
      .find(".btn-primary")
      .prop("onClick");

    await act(async () => {
      await clickRefeshHandler();
    });

    await componentUnderTest.update();

    expect(componentUnderTest.find(".modal").length).toBe(0);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/session-idle-remaining-time");

    await act(async () => {
      // Advance 31 seconds - modal should show again
      jest.advanceTimersByTime(31000);
    });

    await componentUnderTest.update();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(componentUnderTest.find(".modal").length).toBe(1);
  });
});
