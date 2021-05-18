import React from 'react';
import {shallow} from 'enzyme';
import {ProductsArrayField} from 'containers/Forms/ProductsArrayField';
import {
  ProductsArrayField_naicsProducts,
  CiipProductState
} from 'ProductsArrayField_naicsProducts.graphql';
import {createDefaultJsonSchemaFormProps} from 'tests/json-schema-utils';

const getTestQuery = () => {
  return {
    ' $refType': 'ProductsArrayField_naicsProducts',
    mandatoryProducts: {
      edges: [
        {
          node: {
            id: 'abc',
            productByProductId: {
              rowId: 9,
              units: 'GWH',
              productState: 'PUBLISHED' as CiipProductState,
              requiresEmissionAllocation: true,
              requiresProductAmount: true,
              isEnergyProduct: false,
              addPurchasedElectricityEmissions: false,
              addPurchasedHeatEmissions: false,
              subtractExportedElectricityEmissions: false,
              subtractExportedHeatEmissions: false,
              subtractGeneratedElectricityEmissions: false,
              subtractGeneratedHeatEmissions: false,
              addEmissionsFromEios: false
            }
          }
        }
      ]
    }
  };
};

const getTestElement = ({noNaicsCode = false, relay = null}) => {
  const data = getTestQuery();
  return (
    <ProductsArrayField
      {...createDefaultJsonSchemaFormProps()}
      naicsProducts={
        noNaicsCode ? null : (data as ProductsArrayField_naicsProducts)
      }
      relay={relay}
    />
  );
};

describe('ProductsArrayField', () => {
  it('no NAICS code specified', () => {
    const wrapper = shallow(getTestElement({noNaicsCode: true}));
    expect(wrapper.find('Relay(ProductField)').exists()).toBeFalse();
    expect(wrapper).toMatchSnapshot();
  });
  it('NAICS code specified, with allowable products', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper).toMatchSnapshot();
  });
});
