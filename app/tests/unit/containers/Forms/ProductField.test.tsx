import React from 'react';
import {shallow} from 'enzyme';
import {ProductFieldComponent} from 'containers/Forms/ProductField';
import {ProductField_query} from '__generated__/ProductField_query.graphql';
import {ProductField_naicsCode} from '__generated__/ProductField_naicsCode.graphql';
import {createDefaultJsonSchemaFormProps} from 'tests/json-schema-utils';

describe('The ProductionFields Component with published product matched to a naics code', () => {
  const query: ProductField_query = {
    ' $refType': 'ProductField_query',
    allProducts: {
      edges: [
        {
          node: {
            rowId: 1,
            units: 'bar',
            productState: 'PUBLISHED',
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
    allProductsByNaicsCode: {
      edges: [
        {
          node: {
            rowId: 1,
            productState: 'PUBLISHED'
          }
        }
      ]
    }
  };

  const props = {
    ...createDefaultJsonSchemaFormProps(),
    formData: {
      productRowId: 1,
      productUnits: 'bar',
      productEmissions: 123,
      productAmount: 456,
      requiresEmissionAllocation: true
    },
    query,
    naicsCode
  };

  it('should match the snapshot when rendering a product', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render any warnings', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper.exists('Alert')).toBe(false);
  });
});

describe('The ProductionFields Component with published product not matched to a naics code', () => {
  const query: ProductField_query = {
    ' $refType': 'ProductField_query',
    allProducts: {
      edges: [
        {
          node: {
            rowId: 1,
            units: 'bar',
            productState: 'PUBLISHED',
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
    allProductsByNaicsCode: {
      edges: [
        {
          node: {
            rowId: 2,
            productState: 'PUBLISHED'
          }
        }
      ]
    }
  };

  const props = {
    ...createDefaultJsonSchemaFormProps(),
    formData: {
      productRowId: 1,
      productUnits: 'bar',
      productEmissions: 123,
      productAmount: 456,
      requiresEmissionAllocation: true
    },
    query,
    naicsCode
  };

  it('should match the snapshot when rendering a product not matched to a naics code', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the not in naics code warning', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper.find('Alert').text()).toContain(
      'Product or Service is not associated with the NAICS code'
    );
  });
});

describe('The ProductionFields Component with archived product matched to a naics code', () => {
  const query: ProductField_query = {
    ' $refType': 'ProductField_query',
    allProducts: {
      edges: [
        {
          node: {
            rowId: 1,
            units: 'bar',
            productState: 'ARCHIVED',
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
    allProductsByNaicsCode: {
      edges: [
        {
          node: {
            rowId: 1,
            productState: 'ARCHIVED'
          }
        }
      ]
    }
  };

  const props = {
    ...createDefaultJsonSchemaFormProps(),
    formData: {
      productRowId: 1,
      productUnits: 'bar',
      productEmissions: 123,
      productAmount: 456,
      requiresEmissionAllocation: true
    },
    query,
    naicsCode
  };

  it('should match the snapshot when rendering an archived product', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render the archived warning', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper.find('Alert').text()).toContain(
      'Product or Service has been archived'
    );
  });
});

describe('The ProductionFields Component with archived product not matched to a naics code', () => {
  const query: ProductField_query = {
    ' $refType': 'ProductField_query',
    allProducts: {
      edges: [
        {
          node: {
            rowId: 1,
            units: 'bar',
            productState: 'ARCHIVED',
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
    allProductsByNaicsCode: {
      edges: [
        {
          node: {
            rowId: 2,
            productState: 'ARCHIVED'
          }
        }
      ]
    }
  };

  const props = {
    ...createDefaultJsonSchemaFormProps(),
    formData: {
      productRowId: 1,
      productUnits: 'bar',
      productEmissions: 123,
      productAmount: 456,
      requiresEmissionAllocation: true
    },
    query,
    naicsCode
  };

  it('should match the snapshot when rendering an archived product not matched to a naics code', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the archived warning and the not in naics warning', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper.find('Alert').at(0).text()).toContain(
      'Product or Service has been archived'
    );
    expect(wrapper.find('Alert').at(1).text()).toContain(
      'Product or Service is not associated with the NAICS code'
    );
  });
});

describe('The ProductionFields Component with no naics code', () => {
  const query: ProductField_query = {
    ' $refType': 'ProductField_query',
    allProducts: {
      edges: []
    }
  };

  const props = {
    ...createDefaultJsonSchemaFormProps(),
    formData: {},
    query
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the no products found warning', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper.find('Alert').at(0).text()).toContain(
      'No products were found'
    );
  });
});
