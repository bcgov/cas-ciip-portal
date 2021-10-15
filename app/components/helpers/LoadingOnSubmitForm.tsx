import React from "react";
import RJSF, { FormProps } from "@rjsf/core";
import withPromiseLoading from "lib/withPromiseLoading";

const IN_FLIGHT_PROPERTY = "disabled";
const ASYNC_HANDLER = "onSubmit";

interface Props<T> extends FormProps<T> {}

function JsonSchemaForm<T>(props: Props<T>) {
  return (
    <RJSF {...props}>
      <fieldset disabled={props.disabled}>{props.children}</fieldset>
    </RJSF>
  );
}

// Typescript needs a little help to link the exposed props with the wrapped props
const LoadingOnSubmitForm: <T>(
  props: Props<T>
) => JSX.Element = withPromiseLoading(
  JsonSchemaForm,
  ASYNC_HANDLER,
  IN_FLIGHT_PROPERTY
);

export default LoadingOnSubmitForm;
