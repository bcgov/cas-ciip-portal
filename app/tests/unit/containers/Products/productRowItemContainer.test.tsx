import React from 'react';
import {shallow} from 'enzyme';
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
  it('should match the previous snaphshot', async () => {
    const r = shallow(
      <ProductRowItemComponent product={product} query={query} />
    );
    expect(r).toMatchSnapshot();
  });

  it('should allow benchmark editing when the product is PUBLISHED', async () => {
    const r = shallow(
      <ProductRowItemComponent product={product} query={query} />
    );
    expect(
      r.find('OverlayTrigger').at(1).prop('overlay').props.children.join('')
    ).toEqual('Edit Benchmark');
    expect(r.find('FontAwesomeIcon').at(1).prop('className')).toBe('editIcon');
  });

  it('should not allow product editing when the product is PUBLISHED', async () => {
    const r = shallow(
      <ProductRowItemComponent product={product} query={query} />
    );
    expect(
      r.find('OverlayTrigger').last().prop('overlay').props.children.join('')
    ).toEqual('View Product');
    expect(r.find('FontAwesomeIcon').at(2).prop('className')).toBe(
      'editIcon-disabled'
    );
  });

  it('should allow benchmark and product editing when the product is DRAFT', async () => {
    product.productState = 'DRAFT';
    const r = shallow(
      <ProductRowItemComponent product={product} query={query} />
    );
    expect(
      r.find('OverlayTrigger').last().prop('overlay').props.children.join('')
    ).toEqual('Edit Product');
    expect(r.find('FontAwesomeIcon').at(1).prop('className')).toBe('editIcon');
    expect(
      r.find('OverlayTrigger').at(1).prop('overlay').props.children.join('')
    ).toEqual('Edit Benchmark');
    expect(r.find('FontAwesomeIcon').at(1).prop('className')).toBe('editIcon');
  });

  it('should not allow product editing when the product is read-only', async () => {
    product.productState = 'DRAFT';
    product.isReadOnly = true;
    const r = shallow(
      <ProductRowItemComponent product={product} query={query} />
    );
    expect(
      r.find('OverlayTrigger').at(2).prop('overlay').props.children.join('')
    ).toEqual('View Product');
    expect(r.find('FontAwesomeIcon').at(2).prop('className')).toEqual(
      'editIcon-disabled'
    );
  });
});
