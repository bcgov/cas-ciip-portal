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

const LoadinOnClickButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Button {...props}>
      {props.loadingText !== undefined && props[IN_FLIGHT_PROPERTY]
        ? props.loadingText
        : props.children}
    </Button>
  );
};

export default withPromiseLoading(
  LoadinOnClickButton,
  ASYNC_HANDLER,
  IN_FLIGHT_PROPERTY
);
