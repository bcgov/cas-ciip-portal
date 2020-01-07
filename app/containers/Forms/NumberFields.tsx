import React from 'react';
import NumberFormat from 'react-number-format';
import {FieldProps} from 'react-jsonschema-form';

const NumberFields: React.FunctionComponent<FieldProps> = ({
  formData,
  onChange
}) => {
  return (
    <NumberFormat
      thousandSeparator
      isNumericString
      className="form-control"
      allowNegative={false}
      decimalScale={4}
      value={formData}
      onValueChange={({value}) => onChange(value)}
    />
  );
};

// Const NumberTextFields: React.FunctionComponent<TextProps> = ({value}) => {
//   return <NumberFormat thousandSeparator displayType="text" value={value} />;
// };

export default NumberFields;
