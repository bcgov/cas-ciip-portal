import React from 'react';
import {View, Text} from '@react-pdf/renderer';
import {FieldProps} from 'react-jsonschema-form';
import {ApplicationDetailsPdf_query} from 'ApplicationDetailsPdf_query.graphql';
import {PdfCommentsField} from './PdfCommentsField';

interface Props extends FieldProps {
  query: ApplicationDetailsPdf_query;
}

export const PdfProductionFieldsTemplate: React.FunctionComponent<Props> = (
  props
) => {
  const {formData, query} = props;

  return (
    <View>
      <Text style={{fontSize: 15, letterSpacing: 2}}>
        {'\n'}Production:{'\n'}
      </Text>

      <PdfCommentsField comments={formData.comments} />

      <Text>
        Product or Service:{' '}
        {formData.productRowId
          ? query.allProducts.edges.find(
              ({node}) => node.rowId === formData.productRowId
            ).node.productName
          : '[Not entered]'}
        {'\n'}
      </Text>
      <Text>
        Product Emissions: {formData.productEmissions ?? '[Not entered]'}
        {'\n'}
      </Text>
      <Text>
        Annual Production Amount: {formData.productAmount ?? '[Not entered]'}
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
