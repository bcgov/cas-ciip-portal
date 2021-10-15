import React from "react";
import withPromiseLoading from "lib/withPromiseLoading";
import { Button as BootstrapButton, ButtonProps } from "react-bootstrap";

const IN_FLIGHT_PROPERTY = "disabled";
const ASYNC_HANDLER = "onClick";

interface Props extends ButtonProps {
  loadingText?: string;
}

// Wraps a bootstrap Button with the `withPromiseLoading` higher order component.
// This will make the button enter a disabled state until the
// onClick handler completes.
const Button: React.FunctionComponent<Props> = ({
  loadingText,
  ...buttonProps
}) => {
  return (
    <BootstrapButton {...buttonProps}>
      {loadingText !== undefined && buttonProps[IN_FLIGHT_PROPERTY]
        ? loadingText
        : buttonProps.children}
    </BootstrapButton>
  );
};

export default withPromiseLoading(Button, ASYNC_HANDLER, IN_FLIGHT_PROPERTY);
