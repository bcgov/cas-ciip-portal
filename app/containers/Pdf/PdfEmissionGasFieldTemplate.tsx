import React from 'react';
import {Text} from '@react-pdf/renderer';
import {FieldProps} from 'react-jsonschema-form';

const PdfEmissionGasFieldTemplate: React.FunctionComponent<FieldProps> = ({
  formData
}) => {
  return (
    <Text>
      {'\n'}
      {formData.gasType} - Tonnes: {formData.annualEmission} - Tonnes (CO2e):{' '}
      {formData.annualCO2e}
    </Text>
  );
};

export default PdfEmissionGasFieldTemplate;
