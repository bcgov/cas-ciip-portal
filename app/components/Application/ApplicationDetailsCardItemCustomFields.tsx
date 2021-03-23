import React from 'react';
import EmissionGasFields from 'containers/Forms/EmissionGasFields';
import EmissionSourceFields from 'containers/Forms/EmissionSourceFields';
import ProductField from 'containers/Forms/ProductField';
import ProductRowIdField from 'containers/Forms/ProductRowIdField';
import {FieldProps} from '@rjsf/core';
import NumberFormat from 'react-number-format';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import FuelRowIdField from 'containers/Forms/FuelRowIdField';
import FuelField from 'containers/Forms/FuelField';
import EmissionCategoryRowIdField from 'containers/Forms/EmissionCategoryRowIdField';
import NaicsField from 'containers/Forms/NaicsField';

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

      if (diff && diff.lhs !== formData) {
        const prevValue = getDisplayValue(schema, diff.lhs);
        return (
          <>
            <span id={id && `${id}-diffFrom`} className="diffFrom">
              {prevValue ?? <i>[No Data Entered]</i>}
            </span>
            &nbsp;---&gt;&nbsp;
            <span id={id && `${id}-diffTo`} className="diffTo">
              {displayValue ?? <i>[No Data Entered]</i>}
            </span>
          </>
        );
      }
    }

    if (formData === null || formData === undefined || formData === '')
      return (
        <>
          <i id={id}>[No Data Entered]</i>
          {ErrorIcon}
        </>
      );

    return (
      <>
        <span id={id}>{displayValue}</span>
        {ErrorIcon}
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
            {formData ? 'Yes' : 'No'}
          </span>
        </>
      );
    }

    return (
      <span id={id}>
        {formData ? <>Yes {ErrorIcon}</> : <>No {ErrorIcon}</>}{' '}
      </span>
    );
  },
  naics: (props) => <NaicsField query={props.formContext.query} {...props} />,
  emissionSource: EmissionSourceFields,
  emissionGas: (props) => <EmissionGasFields {...props} />,
  product: (props) => (
    <ProductField query={props.formContext.query} {...props} />
  ),
  productRowId: (props) => (
    <ProductRowIdField query={props.formContext.query} {...props} />
  ),
  fuel: (props) => <FuelField query={props.formContext.query} {...props} />,
  fuelRowId: (props) => (
    <FuelRowIdField query={props.formContext.query} {...props} />
  ),
  emissionCategoryRowId: (props) => (
    <EmissionCategoryRowIdField query={props.formContext.query} {...props} />
  ),
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
          {ErrorIcon}
        </>
      );
    const displayValue = getDisplayValue(schema, formData);

    const diff = idDiffMap?.[id];

    if (showDiff && diff) {
      const prevValue = getDisplayValue(schema, diff.lhs);

      return (
        <>
          <span className="diffFrom">
            {prevValue !== null && prevValue !== undefined ? (
              <NumberFormat
                thousandSeparator
                id={id && `${id}-diffFrom`}
                displayType="text"
                value={prevValue}
              />
            ) : (
              <i id={id && `${id}-diffFrom`}>[No Data Entered]</i>
            )}
          </span>
          &nbsp;---&gt;&nbsp;
          <span className="diffTo">
            {displayValue !== null && displayValue !== undefined ? (
              <NumberFormat
                thousandSeparator
                id={id && `${id}-diffTo`}
                displayType="text"
                value={displayValue}
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
        {ErrorIcon}
      </>
    );
  }
};

export default CUSTOM_FIELDS;
