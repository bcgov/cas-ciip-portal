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
      className="form-control"
      allowNegative={false}
      decimalScale={4}
      value={formData}
      onValueChange={({value}) => onChange(Number(value))}
    />
  );
};

export default NumberFields;
