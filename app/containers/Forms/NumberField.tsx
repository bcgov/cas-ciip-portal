import React from 'react';
import NumberFormat from 'react-number-format';
import {FieldProps} from 'react-jsonschema-form';

const NumberField: React.FunctionComponent<FieldProps> = ({
  formData,
  onChange,
  schema,
  idSchema,
  disabled
}) => {
  const allowNegative =
    (schema.minimum === undefined && schema.exclusiveMinimum === undefined) ||
    schema.minimum < 0 ||
    schema.exclusiveMinimum < 0;

  return (
    <NumberFormat
      thousandSeparator
      id={idSchema.$id}
      disabled={disabled}
      className="form-control"
      allowNegative={allowNegative}
      decimalScale={4}
      value={formData}
      onValueChange={({floatValue}) => onChange(floatValue)}
    />
  );
};

export default NumberField;
