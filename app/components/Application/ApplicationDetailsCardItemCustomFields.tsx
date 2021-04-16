import React from 'react';
import EmissionGasFields from 'containers/Forms/EmissionGasFields';
import EmissionSourceFields from 'containers/Forms/EmissionSourceFields';
import {FieldProps} from '@rjsf/core';
import NumberFormat from 'react-number-format';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

// Some formData values are numbers that map to enums, this function uses the number values to return the enum names stored in the schema
const getDisplayValue = (schema, value) => {
  if (schema.enum && schema.enumNames) {
    // TODO: needs a fix on jsonschema types (missing enumNames)
    const enumIndex = schema.enum.indexOf(value);
    if (enumIndex === -1) return null;
    return schema.enumNames[enumIndex];
  }

  return value;
};

const ErrorIcon: React.FunctionComponent<FieldProps> = (props) => {
  if (props?.errorSchema?.__errors || props.rawErrors) {
    return <FontAwesomeIcon color="red" icon={faExclamationTriangle} />;
  }

  return null;
};

const CUSTOM_FIELDS: Record<string, React.FunctionComponent<FieldProps>> = {
  TitleField: (props) => <h3>{props.title}</h3>,
  StringField: (props) => {
    const {
      idSchema,
      schema,
      formData,
      formContext: {showDiff, idDiffMap}
    } = props;
    const displayValue = getDisplayValue(schema, formData);
    const id = idSchema?.$id;
    if (showDiff) {
      const diff = idDiffMap?.[id];

      if (diff) {
        return (
          <>
            <span id={id && `${id}-diffFrom`} className="diffFrom">
              {getDisplayValue(schema, diff.lhs) ?? <i>[No Data Entered]</i>}
            </span>
            &nbsp;---&gt;&nbsp;
            <span id={id && `${id}-diffTo`} className="diffTo">
              {getDisplayValue(schema, diff.rhs) ?? <i>[No Data Entered]</i>}
            </span>
          </>
        );
      }
    }

    if (formData === null || formData === undefined || formData === '')
      return (
        <>
          <i id={id}>[No Data Entered]</i>
          <ErrorIcon {...props} />
        </>
      );

    return (
      <>
        <span id={id}>{displayValue}</span>
        <ErrorIcon {...props} />
      </>
    );
  },
  BooleanField: (props) => {
    const {
      idSchema,
      formData,
      formContext: {showDiff, idDiffMap}
    } = props;
    const id = idSchema?.$id;
    const diff = idDiffMap?.[id];

    if (showDiff && diff) {
      return (
        <>
          <span id={`${id}-diffFrom`} className="diffFrom">
            {diff.lhs ? 'Yes' : 'No'}
          </span>
          &nbsp;---&gt;&nbsp;
          <span id={`${id}-diffTo`} className="diffTo">
            {diff.rhs ? 'Yes' : 'No'}
          </span>
        </>
      );
    }

    return (
      <span id={id}>
        {formData ? (
          <>
            Yes <ErrorIcon {...props} />
          </>
        ) : (
          <>
            No <ErrorIcon {...props} />
          </>
        )}{' '}
      </span>
    );
  },
  emissionSource: EmissionSourceFields,
  emissionGas: (props) => <EmissionGasFields {...props} />,
  NumberField: (props) => {
    const {
      idSchema,
      formData,
      schema,
      formContext: {showDiff, idDiffMap}
    } = props;
    const id = idSchema?.$id;
    if (formData === null || formData === undefined || formData === '')
      return (
        <>
          <i id={id}>[No Data Entered]</i>
          <ErrorIcon {...props} />
        </>
      );
    const displayValue = getDisplayValue(schema, formData);

    const diff = idDiffMap?.[id];

    if (showDiff && diff) {
      const lhs = getDisplayValue(schema, diff.lhs);
      const rhs = getDisplayValue(schema, diff.rhs);

      return (
        <>
          <span className="diffFrom">
            {lhs !== null && lhs !== undefined ? (
              <NumberFormat
                thousandSeparator
                id={id && `${id}-diffFrom`}
                displayType="text"
                value={lhs}
              />
            ) : (
              <i id={id && `${id}-diffFrom`}>[No Data Entered]</i>
            )}
          </span>
          &nbsp;---&gt;&nbsp;
          <span className="diffTo">
            {rhs !== null && rhs !== undefined ? (
              <NumberFormat
                thousandSeparator
                id={id && `${id}-diffTo`}
                displayType="text"
                value={rhs}
              />
            ) : (
              <i id={id && `${id}-diffTo`}>[No Data Entered]</i>
            )}
          </span>
        </>
      );
    }

    return (
      <>
        <NumberFormat
          thousandSeparator
          id={id}
          displayType="text"
          value={displayValue}
        />
        <ErrorIcon {...props} />
      </>
    );
  }
};

export default CUSTOM_FIELDS;
