import React, {useState} from 'react';

const withPromiseLoading = function a(
  Component: React.ComponentClass | React.FunctionComponent,
  asyncEventHandler: string,
  isInFlightProp: string
) {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleAsyncEvent = async (...args) => {
      setIsLoading(true);
      await props[asyncEventHandler](...args);
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
