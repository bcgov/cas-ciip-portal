// Wraps a bootstrap Button with the `withPromiseLoading` HOC
// This will make the button enter a disabled state until the
// onClick handler completes
import React from 'react';
import withPromiseLoading from 'lib/withPromiseLoading';
import {Button, ButtonProps} from 'react-bootstrap';

const IN_FLIGHT_PROPERTY = 'disabled';
const ASYNC_HANDLER = 'onClick';

interface Props extends ButtonProps {
  loadingText?: string;
}

const LoadingOnClickButton: React.FunctionComponent<Props> = ({
  loadingText,
  ...buttonProps
}) => {
  return (
    <Button {...buttonProps}>
      {loadingText !== undefined && buttonProps[IN_FLIGHT_PROPERTY]
        ? loadingText
        : buttonProps.children}
    </Button>
  );
};

export default withPromiseLoading(
  LoadingOnClickButton,
  ASYNC_HANDLER,
  IN_FLIGHT_PROPERTY
);
