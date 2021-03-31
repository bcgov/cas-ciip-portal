import React from 'react';
import {AllowableProductsTableComponent} from 'containers/Admin/ProductNaicsCode/AllowableProductsTable';
import {shallow} from 'enzyme';

describe('The allowable products table for a NAICS code', () => {
  it('should render table rows when there are  allowable products', () => {
    const componentUnderTest = shallow(
      <AllowableProductsTableComponent
        relay={{environment: 'test-env'} as any}
        naicsCode={{
          ' $refType': 'AllowableProductsTable_naicsCode',
          id: 'test_ID',
          productNaicsCodesByNaicsCodeId: {
            edges: [
              {
                node: {
                  id: 'test-id-1',
                  ' $fragmentRefs': {
                    AllowableProductsTableRow_productNaicsCode: true
                  }
                }
              },
              {
                node: {
                  id: 'test-id-2',
                  ' $fragmentRefs': {
                    AllowableProductsTableRow_productNaicsCode: true
                  }
                }
              },
              {
                node: {
                  id: 'test-id-3',
                  ' $fragmentRefs': {
                    AllowableProductsTableRow_productNaicsCode: true
                  }
                }
              }
            ]
          }
        }}
      />
    );
    expect(componentUnderTest).toMatchSnapshot();
  });
  it('should render an alert box when there are no allowable products', () => {
    const componentUnderTest = shallow(
      <AllowableProductsTableComponent
        relay={{environment: 'test-env'} as any}
        naicsCode={{
          ' $refType': 'AllowableProductsTable_naicsCode',
          id: 'test_ID',
          productNaicsCodesByNaicsCodeId: {edges: []}
        }}
      />
    );
    expect(componentUnderTest).toMatchSnapshot();
  });
});
