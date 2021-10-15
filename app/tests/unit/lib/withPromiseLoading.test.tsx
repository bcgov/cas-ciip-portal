import { mount } from "enzyme";
import withPromiseLoading from "lib/withPromiseLoading";
import React from "react";
import { act } from "react-dom/test-utils";

interface TestProps {
  asyncFunction: (value: unknown) => Promise<void>;
  toggledProp: boolean;
}

describe("the withPromiseLoading higher order component", () => {
  it("toggles the passed property back and forth with the async call", async () => {
    let spyedOnProps: TestProps;

    const SpyableComponent: React.FunctionComponent<TestProps> = (props) => {
      spyedOnProps = props;
      return <span>something</span>;
    };

    let unblockPromise;
    const manualAsyncHandler = async () => {
      await new Promise((resolve) => {
        unblockPromise = () => {
          resolve(true);
        };
      });
    };

    const HocUnderTest = withPromiseLoading(
      SpyableComponent,
      "asyncFunction",
      "toggledProp"
    );

    act(() => {
      const componentInstance = (
        <HocUnderTest
          asyncFunction={async () => manualAsyncHandler()}
          toggledProp={false}
        />
      );
      mount(componentInstance);
    });

    expect(spyedOnProps.toggledProp).toBeFalse();

    let blockingPromise;
    act(() => {
      blockingPromise = spyedOnProps.asyncFunction(true);
    });

    expect(spyedOnProps.toggledProp).toBeTrue();

    await act(async () => {
      await unblockPromise();
      await blockingPromise.finally();
    });

    expect(spyedOnProps.toggledProp).toBeFalse();
  });
});
