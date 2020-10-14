import React from 'react';
import {View, Text} from '@react-pdf/renderer';
import {FieldProps} from 'react-jsonschema-form';
import {ApplicationDetailsPdf_query} from 'ApplicationDetailsPdf_query.graphql';

interface Props extends FieldProps {
  query: ApplicationDetailsPdf_query;
}

export const PdfFuelFieldsTemplate: React.FunctionComponent<Props> = ({
  formData,
  query
}) => {
  return (
    <View>
      <Text style={{fontSize: 15, letterSpacing: 2}}>
        {'\n'}Fuel:{'\n'}
      </Text>
      <Text>
        Fuel Name:{' '}
        {formData.fuelRowId
          ? query.allFuels.edges.find(
              ({node}) => node.rowId === formData.fuelRowId
            ).node.name
          : '[Not entered]'}
        {'\n'}
      </Text>
      <Text>
        Quantity: {formData.quantity ?? '[Not entered]'}
        {'\n'}
      </Text>
      <Text>
        Units: {formData.fuelUnits ?? '[Not entered]'}
        {'\n'}
      </Text>
      <Text>
        Emission Category:{' '}
        {formData.emissionCategoryRowId
          ? query.allEmissionCategories.edges.find(
              ({node}) => node.rowId === formData.emissionCategoryRowId
            ).node.displayName
          : '[Not entered]'}
        {'\n'}
      </Text>
    </View>
  );
};

export default PdfFuelFieldsTemplate;
