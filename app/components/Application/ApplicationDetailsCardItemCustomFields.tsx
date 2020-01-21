import React from 'react';
import SummaryEmissionGasFields from 'containers/Forms/SummaryEmissionGasFields';
import SummaryEmissionSourceFields from 'containers/Forms/SummaryEmissionSourceFields';
import ProductionFields from 'containers/Forms/ProductionFields';
import {FieldProps} from 'react-jsonschema-form';
import NumberFormat from 'react-number-format';

const customFields = (
  showDiff,
  diffPathArray,
  diffArray,
  handleEnums,
  previousIsEmpty
) => {
  const CUSTOM_FIELDS: Record<string, React.FunctionComponent<FieldProps>> = {
    TitleField: props => <h3>{props.title}</h3>,
    StringField: props => {
      let prevValue;
      let hasDiff = false;
      if (showDiff) {
        hasDiff = diffPathArray.includes(
          props.idSchema.$id.replace(/^root_/g, '')
        );
        prevValue =
          diffArray[
            diffPathArray.indexOf(props.idSchema.$id.replace(/^root_/g, ''))
          ];

        if ((hasDiff || previousIsEmpty) && prevValue !== props.formData) {
          prevValue = handleEnums(props, false, prevValue);
          const currentValue = handleEnums(props, true, prevValue);

          return (
            <>
              <span style={{backgroundColor: '#ffeef0'}}>
                {prevValue ? prevValue : <i>[No Data Entered]</i>}
              </span>
              &nbsp;---&gt;&nbsp;
              <span style={{backgroundColor: '#e6ffed'}}>
                {currentValue ? currentValue : <i>[No Data Entered]</i>}
              </span>
            </>
          );
        }
      }

      if (
        props.formData === null ||
        props.formData === undefined ||
        props.formData === ''
      )
        return <i>[No Data Entered]</i>;

      const value = handleEnums(props, true, prevValue);
      return value;
    },
    BooleanField: props => {
      const hasDiff = diffPathArray.includes(
        props.idSchema.$id.replace(/^root_/g, '')
      );

      if (showDiff && hasDiff) {
        const prevValue =
          diffArray[
            diffPathArray.indexOf(props.idSchema.$id.replace(/^root_/g, ''))
          ];
        return (
          <>
            <span style={{backgroundColor: '#ffeef0'}}>
              {prevValue ? 'Yes' : 'No'}
            </span>
            &nbsp;---&gt;&nbsp;
            <span style={{backgroundColor: '#e6ffed'}}>
              {props.formData ? 'Yes' : 'No'}
            </span>
          </>
        );
      }

      return <>{props.formData ? 'Yes' : 'No'} </>;
    },
    emissionSource: props => <SummaryEmissionSourceFields {...props} />,
    emissionGas: props => <SummaryEmissionGasFields {...props} />,
    production: props => (
      <ProductionFields query={props.formContext.query} {...props} />
    ),
    NumberField: props => {
      if (
        props.formData === null ||
        props.formData === undefined ||
        props.formData === ''
      )
        return <i>[No Data Entered]</i>;

      let prevValue;
      let hasDiff = false;
      if (showDiff) {
        hasDiff = diffPathArray.includes(
          props.idSchema.$id.replace(/^root_/g, '')
        );
        prevValue =
          diffArray[
            diffPathArray.indexOf(props.idSchema.$id.replace(/^root_/g, ''))
          ];
        if (hasDiff || previousIsEmpty) {
          prevValue = handleEnums(props, false, prevValue);
          const currentValue = handleEnums(props, true, prevValue);

          return (
            <>
              <span style={{backgroundColor: '#ffeef0'}}>
                {prevValue ? (
                  <NumberFormat
                    thousandSeparator
                    displayType="text"
                    value={prevValue}
                  />
                ) : (
                  <i>[No Data Entered]</i>
                )}
              </span>
              &nbsp;---&gt;&nbsp;
              <span style={{backgroundColor: '#e6ffed'}}>
                {currentValue ? (
                  <NumberFormat
                    thousandSeparator
                    displayType="text"
                    value={currentValue}
                  />
                ) : (
                  <i>[No Data Entered]</i>
                )}
              </span>
            </>
          );
        }
      }

      const value = handleEnums(props, true, prevValue);
      return (
        <NumberFormat thousandSeparator displayType="text" value={value} />
      );
    }
  };
  return CUSTOM_FIELDS;
};

export default customFields;
