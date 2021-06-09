import React, {useEffect, useState} from 'react';

const withPromiseLoading = function higherOrderComponent<
  TProps,
  HandlerKey extends keyof TProps,
  InFlightKey extends keyof TProps
>(
  Wrapped: React.ComponentClass<TProps> | React.FunctionComponent<TProps>,
  asyncEventHandler: HandlerKey,
  isInFlightProp: InFlightKey
): (props: TProps) => JSX.Element {
  return (props: TProps) => {
    const [isLoading, setIsLoading] = useState(false);

    let isSubscribed = true;

    // This is to avoid making changes to the state after the component has been unmounted
    // In case the asyncEventHandler has side-effects on the DOM
    useEffect(() => {
      return function cleanUp() {
        isSubscribed = false;
      };
    }, []);

    const handleAsyncEvent = async (...args) => {
      if (!isSubscribed) return;
      setIsLoading(true);

      // We can only verify that the key exists on TProps,
      // not the type of the property for that key
      await (props[asyncEventHandler] as any)(...args);

      if (!isSubscribed) return;
      setIsLoading(false);
    };

    const childProps = {
      ...props,
      [isInFlightProp]: isLoading,
      [asyncEventHandler]: handleAsyncEvent
    };

    return <Wrapped {...childProps} />;
  };
};

export default withPromiseLoading;
