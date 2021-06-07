import React, {useEffect, useState} from 'react';

const withPromiseLoading = function higherOrderComponent<TProps>(
  Component: React.ComponentClass<TProps> | React.FunctionComponent<TProps>,
  asyncEventHandler: string,
  isInFlightProp: string
) {
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

      await props[asyncEventHandler](...args);

      if (!isSubscribed) return;
      setIsLoading(false);
    };

    const childProps = {
      ...props,
      [isInFlightProp]: isLoading,
      [asyncEventHandler]: handleAsyncEvent
    };

    return <Component {...childProps} />;
  };
};

export default withPromiseLoading;
