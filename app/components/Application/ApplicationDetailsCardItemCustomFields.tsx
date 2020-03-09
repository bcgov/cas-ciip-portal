import React from 'react';
import SummaryEmissionGasFields from 'containers/Forms/SummaryEmissionGasFields';
import SummaryEmissionSourceFields from 'containers/Forms/SummaryEmissionSourceFields';
import ProductionFields from 'containers/Forms/ProductionFields';
import {FieldProps} from 'react-jsonschema-form';
import NumberFormat from 'react-number-format';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

const customFields = (
  showDiff,
  diffPathArray,
  diffArray,
  handleEnums,
  previousIsEmpty,
  setHasErrors
) => {
  let hasErrors;
  const CUSTOM_FIELDS: Record<string, React.FunctionComponent<FieldProps>> = {
    TitleField: props => <h3>{props.title}</h3>,
    StringField: props => {
      if (props.errorSchema.__errors || props.rawErrors) {
        setHasErrors(true);
        hasErrors = (
          <FontAwesomeIcon color="red" icon={faExclamationTriangle} />
        );
      }

      const {idSchema, formData} = props;
      const id = idSchema?.$id;
      let prevValue;
      let hasDiff = false;
      if (showDiff) {
        hasDiff = diffPathArray.includes(id.replace(/^root_/g, ''));
        prevValue = diffArray[diffPathArray.indexOf(id.replace(/^root_/g, ''))];

        if ((hasDiff || previousIsEmpty) && prevValue !== formData) {
          prevValue = handleEnums(props, false, prevValue);
          const currentValue = handleEnums(props, true, prevValue);

          return (
            <>
              <span id={id && `${id}-diffFrom`} className="diffFrom">
                {prevValue ? prevValue : <i>[No Data Entered]</i>}
              </span>
              &nbsp;---&gt;&nbsp;
              <span id={id && `${id}-diffTo`} className="diffTo">
                {currentValue ? currentValue : <i>[No Data Entered]</i>}
              </span>
            </>
          );
        }
      }

      if (formData === null || formData === undefined || formData === '')
        return (
          <>
            <i id={id}>[No Data Entered]</i>
            {hasErrors}
          </>
        );

      const value = handleEnums(props, true, prevValue);
      return (
        <>
          <span id={id}>{value}</span>
          {hasErrors}
        </>
      );
    },
    BooleanField: props => {
      if (props.errorSchema.__errors || props.rawErrors)
        hasErrors = (
          <FontAwesomeIcon color="red" icon={faExclamationTriangle} />
        );
      const {idSchema, formData} = props;
      const id = idSchema?.$id;
      const hasDiff = diffPathArray.includes(
        idSchema.$id.replace(/^root_/g, '')
      );

      if (showDiff && hasDiff) {
        const prevValue =
          diffArray[diffPathArray.indexOf(idSchema.$id.replace(/^root_/g, ''))];
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
          {formData ? <>Yes {hasErrors}</> : <>No {hasErrors}</>}{' '}
        </span>
      );
    },
    emissionSource: SummaryEmissionSourceFields,
    emissionGas: SummaryEmissionGasFields,
    production: props => (
      <ProductionFields query={props.formContext.query} {...props} />
    ),
    NumberField: props => {
      if (props?.errorSchema?.__errors || props.rawErrors)
        hasErrors = (
          <FontAwesomeIcon color="red" icon={faExclamationTriangle} />
        );
      const {idSchema, formData} = props;
      const id = idSchema?.$id;
      if (formData === null || formData === undefined || formData === '')
        return (
          <>
            <i id={id}>[No Data Entered]</i>
            {hasErrors}
          </>
        );

      let prevValue;
      let hasDiff = false;
      if (showDiff) {
        hasDiff = diffPathArray.includes(id.replace(/^root_/g, ''));
        prevValue = diffArray[diffPathArray.indexOf(id.replace(/^root_/g, ''))];
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
          {hasErrors}
        </>
      );
    }
  };
  return CUSTOM_FIELDS;
};

export default customFields;
