import React from 'react';
import EmissionGasFields from 'containers/Forms/EmissionGasFields';
import EmissionSourceFields from 'containers/Forms/EmissionSourceFields';
import ProductField from 'containers/Forms/ProductField';
import ProductRowIdField from 'containers/Forms/ProductRowIdField';
import {FieldProps} from 'react-jsonschema-form';
import NumberFormat from 'react-number-format';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import FuelRowIdField from 'containers/Forms/FuelRowIdField';
import FuelField from 'containers/Forms/FuelField';
import EmissionCategoryRowIdField from 'containers/Forms/EmissionCategoryRowIdField';

const customFields = (
  showDiff: boolean,
  diffPathArray: any[],
  diffArray: any[],
  handleEnums: (...args: any[]) => any,
  previousIsEmpty: boolean,
  setHasErrors: (...args: any[]) => any
) => {
  const setErrorIcon: (...args: any[]) => object = (props) => {
    if (props?.errorSchema?.__errors || props.rawErrors) {
      setHasErrors(true);
      return <FontAwesomeIcon color="red" icon={faExclamationTriangle} />;
    }

    return undefined;
  };

  const CUSTOM_FIELDS: Record<string, React.FunctionComponent<FieldProps>> = {
    ProblemReportField: (props) => (
      <span id={props.idSchema?.$id}>{props.formData ?? null}</span>
    ),
    TitleField: (props) => <h3>{props.title}</h3>,
    StringField: (props) => {
      const errorIcon: object = setErrorIcon(props);

      const {idSchema, formData} = props;
      const id = idSchema?.$id;
      let prevValue;
      let hasDiff = false;
      if (showDiff) {
        hasDiff = diffPathArray.includes(id.replace(/^[^_]*_/g, ''));
        prevValue =
          diffArray[diffPathArray.indexOf(id.replace(/^[^_]*_/g, ''))];

        if ((hasDiff || previousIsEmpty) && prevValue !== formData) {
          prevValue = handleEnums(props, false, prevValue);
          const currentValue = handleEnums(props, true, prevValue);

          return (
            <>
              <span id={id && `${id}-diffFrom`} className="diffFrom">
                {prevValue ?? <i>[No Data Entered]</i>}
              </span>
              &nbsp;---&gt;&nbsp;
              <span id={id && `${id}-diffTo`} className="diffTo">
                {currentValue ?? <i>[No Data Entered]</i>}
              </span>
            </>
          );
        }
      }

      if (formData === null || formData === undefined || formData === '')
        return (
          <>
            <i id={id}>[No Data Entered]</i>
            {errorIcon}
          </>
        );

      const value = handleEnums(props, true, prevValue);
      return (
        <>
          <span id={id}>{value}</span>
          {errorIcon}
        </>
      );
    },
    BooleanField: (props) => {
      const errorIcon = setErrorIcon(props);

      const {idSchema, formData} = props;
      const id = idSchema?.$id;
      const hasDiff = diffPathArray.includes(
        idSchema.$id.replace(/^[^_]*_/g, '')
      );

      if (showDiff && hasDiff) {
        const prevValue =
          diffArray[
            diffPathArray.indexOf(idSchema.$id.replace(/^[^_]*_/g, ''))
          ];
        return (
          <>
            <span id={`${id}-diffFrom`} className="diffFrom">
              {prevValue ? 'Yes' : 'No'}
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
          {formData ? <>Yes {errorIcon}</> : <>No {errorIcon}</>}{' '}
        </span>
      );
    },
    emissionSource: EmissionSourceFields,
    emissionGas: (props) => (
      <EmissionGasFields setHasErrors={setHasErrors} {...props} />
    ),
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
      const errorIcon = setErrorIcon(props);

      const {idSchema, formData} = props;
      const id = idSchema?.$id;
      if (formData === null || formData === undefined || formData === '')
        return (
          <>
            <i id={id}>[No Data Entered]</i>
            {errorIcon}
          </>
        );

      let prevValue;
      let hasDiff = false;
      if (showDiff) {
        hasDiff = diffPathArray.includes(id.replace(/^[^_]*_/g, ''));
        prevValue =
          diffArray[diffPathArray.indexOf(id.replace(/^[^_]*_/g, ''))];
        if (hasDiff || previousIsEmpty) {
          prevValue = handleEnums(props, false, prevValue);
          const currentValue = handleEnums(props, true, prevValue);

          return (
            <>
              <span className="diffFrom">
                {prevValue ? (
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
                {currentValue ? (
                  <NumberFormat
                    thousandSeparator
                    id={id && `${id}-diffTo`}
                    displayType="text"
                    value={currentValue}
                  />
                ) : (
                  <i id={id && `${id}-diffTo`}>[No Data Entered]</i>
                )}
              </span>
            </>
          );
        }
      }

      const value = handleEnums(props, true, prevValue);
      return (
        <>
          <NumberFormat
            thousandSeparator
            id={id}
            displayType="text"
            value={value}
          />
          {errorIcon}
        </>
      );
    }
  };
  return CUSTOM_FIELDS;
};

export default customFields;
