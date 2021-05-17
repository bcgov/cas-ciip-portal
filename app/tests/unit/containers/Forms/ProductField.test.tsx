import React from 'react';
import {shallow} from 'enzyme';
import {ProductFieldComponent} from 'containers/Forms/ProductField';
import {
  ProductField_query,
  CiipProductState
} from '__generated__/ProductField_query.graphql';
import {ProductField_naicsCode} from '__generated__/ProductField_naicsCode.graphql';
import {createDefaultJsonSchemaFormProps} from 'tests/json-schema-utils';

const getTestQuery = ({
  noNaicsCode,
  productState,
  reportedProductIsAllowable
}) => {
  const query: ProductField_query = {
    ' $refType': 'ProductField_query',
    allProducts: {
      edges: [
        {
          node: {
            rowId: 1,
            units: 'bar',
            productState: productState as CiipProductState,
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
      ]
    }
  };
  const naicsCode: ProductField_naicsCode = {
    ' $refType': 'ProductField_naicsCode',
    allowableProducts: {
      edges: [
        {
          node: {
            productId: reportedProductIsAllowable ? 1 : 2,
            isMandatory: false
          }
        }
      ]
    }
  };
  const withoutNaicsCode = {
    ...createDefaultJsonSchemaFormProps(),
    query
  };
  return noNaicsCode
    ? withoutNaicsCode
    : {
        ...withoutNaicsCode,
        naicsCode
      };
};

const getTestElement = ({
  noNaicsCode = false,
  includeFormData = true,
  productState = 'PUBLISHED',
  reportedProductIsAllowable = true
}) => {
  const data = getTestQuery({
    noNaicsCode,
    productState,
    reportedProductIsAllowable
  });
  const formData = {
    productRowId: 1,
    productUnits: 'bar',
    productEmissions: 123,
    productAmount: 456,
    requiresEmissionAllocation: true
  };
  return (
    <ProductFieldComponent
      {...data}
      formData={includeFormData ? formData : {}}
    />
  );
};

describe('The ProductField with published product matched to a naics code', () => {
  it('should match the snapshot when rendering a product', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render any warnings', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper.exists('Alert')).toBe(false);
  });
});

describe('The ProductField with published product not matched to a naics code', () => {
  it('should match the snapshot when rendering a product not matched to a naics code', () => {
    const wrapper = shallow(
      getTestElement({reportedProductIsAllowable: false})
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the not in naics code warning', () => {
    const wrapper = shallow(
      getTestElement({reportedProductIsAllowable: false})
    );
    expect(wrapper.find('Alert').text()).toContain(
      'Product or Service is not associated with the NAICS code'
    );
  });
});

describe('The ProductField with archived product matched to a naics code', () => {
  it('should match the snapshot when rendering an archived product', () => {
    const wrapper = shallow(getTestElement({productState: 'ARCHIVED'}));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the archived warning', () => {
    const wrapper = shallow(getTestElement({productState: 'ARCHIVED'}));
    expect(wrapper.find('Alert').text()).toContain(
      'Product or Service has been archived'
    );
  });
});

describe('The ProductField with archived product not matched to a naics code', () => {
  it('should match the snapshot when rendering an archived product not matched to a naics code', () => {
    const wrapper = shallow(
      getTestElement({
        productState: 'ARCHIVED',
        reportedProductIsAllowable: false
      })
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the archived warning and the not in naics warning', () => {
    const wrapper = shallow(
      getTestElement({
        productState: 'ARCHIVED',
        reportedProductIsAllowable: false
      })
    );
    expect(wrapper.find('Alert').at(0).text()).toContain(
      'Product or Service has been archived'
    );
    expect(wrapper.find('Alert').at(1).text()).toContain(
      'Product or Service is not associated with the NAICS code'
    );
  });
});

describe('The ProductField with no naics code', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      getTestElement({noNaicsCode: true, includeFormData: false})
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the no products found warning', () => {
    const wrapper = shallow(
      getTestElement({noNaicsCode: true, includeFormData: false})
    );
    expect(wrapper.find('Alert').at(0).text()).toContain(
      'No products were found'
    );
  });
});
