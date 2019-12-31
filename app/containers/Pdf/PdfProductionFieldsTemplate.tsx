import React from 'react';
import {Text} from '@react-pdf/renderer';
import {FieldProps} from 'react-jsonschema-form';

const PdfProductionFieldsTemplate: React.FunctionComponent<FieldProps> = ({
  formData
}) => {
  return (
    <>
      <Text style={{fontSize: 15, letterSpacing: 2}}>
        {'\n'}Production:{'\n'}
      </Text>
      <Text>
        Product allocation factor (%): {formData.productionAllocationFactor}
        {'\n'}
      </Text>
      <Text>
        Annual Production Amount: {formData.productUnits}
        {'\n'}
      </Text>
      <Text>
        Units: {formData.quantity}
        {'\n'}
      </Text>
      <Text>{formData.productRowId}</Text>
    </>
  );
};

export default PdfProductionFieldsTemplate;
