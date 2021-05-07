import React from 'react';
import {FieldProps} from '@rjsf/core';

const ProductsArrayField: React.FunctionComponent<FieldProps> = (props) => {
  const {ArrayField} = props.registry.fields;
  return <ArrayField {...props} />;
};

export default ProductsArrayField;
