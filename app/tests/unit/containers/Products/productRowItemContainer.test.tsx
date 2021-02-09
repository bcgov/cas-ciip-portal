import React from 'react';
import {shallow, mount} from 'enzyme';
import {ProductRowItemComponent} from 'containers/Products/ProductRowItemContainer';

describe('ProductList', () => {
  const product = {
    id: 'abc',
    rowId: 1,
    productName: 'test product',
    productState: 'PUBLISHED',
    units: 'kl',
    requiresEmissionAllocation: true,
    isCiipProduct: true,
    addPurchasedElectricityEmissions: false,
    subtractExportedElectricityEmissions: false,
    addPurchasedHeatEmissions: false,
    subtractExportedHeatEmissions: false,
    subtractGeneratedElectricityEmissions: false,
    subtractGeneratedHeatEmissions: false,
    addEmissionsFromEios: false,
    requiresProductAmount: true,
    isReadOnly: false,
    updatedAt: '2020-05-06',
    benchmarksByProductId: {
      edges: [
        {
          node: {
            id: 'bench',
            rowId: 1,
            benchmark: 1,
            eligibilityThreshold: 10,
            incentiveMultiplier: 1,
            startReportingYear: 2019,
            endReportingYear: 2020,
            minimumIncentiveRatio: 0,
            maximumIncentiveRatio: 1,
            createdAt: '2020-05-06'
          }
        }
      ]
    },
    linkedProduct: {
      edges: []
    }
  };
  const query = {
    nextReportingYear: {
      reportingYear: 2020
    },
    allReportingYears: {
      edges: [
        {
          node: {
            reportingYear: 2019
          }
        },
        {
          node: {
            reportingYear: 2020
          }
        }
      ]
    }
  };
  it('should match the previous snapshot', async () => {
    const r = shallow(
      <ProductRowItemComponent product={product} query={query} />
    );
    expect(r).toMatchSnapshot();
  });

  it('should allow benchmark editing when the product is PUBLISHED', async () => {
    const r = mount(
      <ProductRowItemComponent product={product} query={query} />
    );
    r.find('DropdownToggle').simulate('click');
    r.find('DropdownMenu DropdownItem').at(1).simulate('click');
    const benchmarkModal = r
      .find('ProductBenchmarkInnerModal')
      .findWhere((n) => !n.prop('isProduct'));
    const input = benchmarkModal
      .find('BaseInput')
      .findWhere((n) => n.prop('id') === 'root_benchmark')
      .first();
    expect(input.prop('disabled')).toBe(false);
  });

  it('should not allow product editing when the product is PUBLISHED', async () => {
    const r = mount(
      <ProductRowItemComponent product={product} query={query} />
    );
    r.find('DropdownToggle').simulate('click');
    r.find('DropdownMenu DropdownItem').at(0).simulate('click');
    const productModal = r
      .find('ProductBenchmarkInnerModal')
      .findWhere((n) => n.prop('isProduct'));
    const input = productModal
      .find('BaseInput')
      .findWhere((n) => n.prop('id') === 'root_productName')
      .first();
    expect(input.prop('disabled')).toBe(true);
  });

  it('should allow benchmark editing when the product is DRAFT', async () => {
    const testProduct = {...product, productState: 'DRAFT'};
    const r = mount(
      <ProductRowItemComponent product={testProduct} query={query} />
    );
    r.find('DropdownToggle').simulate('click');
    r.find('DropdownMenu DropdownItem').at(1).simulate('click');
    const benchmarkModal = r
      .find('ProductBenchmarkInnerModal')
      .findWhere((n) => !n.prop('isProduct'));
    const benchmarkInput = benchmarkModal
      .find('BaseInput')
      .findWhere((n) => n.prop('id') === 'root_benchmark')
      .first();
    expect(benchmarkInput.prop('disabled')).toBe(false);
  });

  it('should allow product editing when the product is DRAFT', async () => {
    const testProduct = {...product, productState: 'DRAFT'};
    const r = mount(
      <ProductRowItemComponent product={testProduct} query={query} />
    );
    r.find('DropdownToggle').simulate('click');
    r.find('DropdownMenu DropdownItem').at(0).simulate('click');
    const productModal = r
      .find('ProductBenchmarkInnerModal')
      .findWhere((n) => n.prop('isProduct'));
    const input = productModal
      .find('BaseInput')
      .findWhere((n) => n.prop('id') === 'root_productName')
      .first();
    expect(input.prop('disabled')).toBe(false);
  });

  it('should not allow product editing when the product is read-only', async () => {
    const testProduct = {...product, productState: 'DRAFT', isReadOnly: true};
    const r = mount(
      <ProductRowItemComponent product={testProduct} query={query} />
    );
    r.find('DropdownToggle').simulate('click');
    r.find('DropdownMenu DropdownItem').at(0).simulate('click');
    const productModal = r
      .find('ProductBenchmarkInnerModal')
      .findWhere((n) => n.prop('isProduct'));
    const input = productModal
      .find('BaseInput')
      .findWhere((n) => n.prop('id') === 'root_productName')
      .first();
    expect(input.prop('disabled')).toBe(true);
  });
});
