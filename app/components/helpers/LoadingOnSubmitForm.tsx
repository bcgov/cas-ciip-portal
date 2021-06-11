import React from 'react';
import JsonSchemaForm, {FormProps} from '@rjsf/core';
import withPromiseLoading from 'lib/withPromiseLoading';

const IN_FLIGHT_PROPERTY = 'disabled';
const ASYNC_HANDLER = 'onSubmit';

interface Props<T> extends FormProps<T> {}

function FormWithFieldset<T>(props: Props<T>) {
  return (
    <JsonSchemaForm {...props}>
      <fieldset disabled={props.disabled}>{props.children}</fieldset>
    </JsonSchemaForm>
  );
}

// Typescript needs a little help to link the exposed props with the wrapped props
const LoadingOnSubmitForm: <T>(
  props: Props<T>
) => JSX.Element = withPromiseLoading(
  FormWithFieldset,
  ASYNC_HANDLER,
  IN_FLIGHT_PROPERTY
);

export default LoadingOnSubmitForm;
