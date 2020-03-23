import React from 'react';
import {View, Text} from '@react-pdf/renderer';
import {FieldProps} from 'react-jsonschema-form';
import {ApplicationDetailsPdf_query} from 'ApplicationDetailsPdf_query.graphql';

interface Props extends FieldProps {
  query: ApplicationDetailsPdf_query;
}

export const PdfProductionFieldsTemplate: React.FunctionComponent<Props> = ({
  formData,
  query
}) => {
  return (
    <View>
      <Text style={{fontSize: 15, letterSpacing: 2}}>
        {'\n'}Production:{'\n'}
      </Text>
      <Text>
        Product or Service:{' '}
        {formData.productRowId
          ? query.allProducts.edges.find(
              ({node}) => node.rowId === formData.productRowId
            ).node.name
          : '[Not entered]'}
        {'\n'}
      </Text>
      <Text>
        Product allocation factor (%):{' '}
        {formData.productEmissions ?? '[Not entered]'}
        {'\n'}
      </Text>
      <Text>
        Annual Production Amount: {formData.quantity ?? '[Not entered]'}
        {'\n'}
      </Text>
      <Text>
        Units: {formData.productUnits ?? '[Not entered]'}
        {'\n'}
      </Text>
    </View>
  );
};

export default PdfProductionFieldsTemplate;
