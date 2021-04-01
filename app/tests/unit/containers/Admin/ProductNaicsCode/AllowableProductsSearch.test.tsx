import React from 'react';
import {AllowableProductsSearchContainer} from 'containers/Admin/ProductNaicsCode/AllowableProductsSearch';
import {mount} from 'enzyme';

describe('The allowable products search component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('populates the search with all the products when there are no allowable products', () => {
    const componentUnderTest = mount(
      <AllowableProductsSearchContainer
        relay={{environment: 'test'} as any}
        query={{
          naicsCode: {
            id: 'a',
            rowId: 1,
            productNaicsCodesByNaicsCodeId: {
              edges: []
            }
          },
          allProducts: {
            edges: [
              {node: {productName: 'product_1', rowId: 123}},
              {node: {productName: 'product_2', rowId: 456}}
            ]
          },
          ' $refType': 'AllowableProductsSearch_query'
        }}
      />
    );

    expect(componentUnderTest).toMatchSnapshot();
  });

  it('populates the search with all the products except the allowable ones', () => {
    const componentUnderTest = mount(
      <AllowableProductsSearchContainer
        relay={{environment: 'test'} as any}
        query={{
          naicsCode: {
            id: 'a',
            rowId: 1,
            productNaicsCodesByNaicsCodeId: {
              edges: [
                {
                  node: {
                    id: 'testproductnaicscodeid1',
                    productId: 8998
                  }
                }
              ]
            }
          },
          allProducts: {
            edges: [
              {node: {productName: 'product_1', rowId: 8998}},
              {node: {productName: 'product_2', rowId: 2}}
            ]
          },
          ' $refType': 'AllowableProductsSearch_query'
        }}
      />
    );

    expect(componentUnderTest).toMatchSnapshot();
  });

  it('calls the create_product_naics_code mutation without the mandatory flag when clicking optional', () => {
    const spy = jest
      .spyOn(
        require('mutations/product_naics_code/createProductNaicsCodeMutation'),
        'default'
      )
      .mockImplementation(() => {});

    const componentUnderTest = mount(
      <AllowableProductsSearchContainer
        relay={{environment: 'test-relay-env'} as any}
        query={{
          naicsCode: {
            id: 'naicsCode_id',
            rowId: 1,
            productNaicsCodesByNaicsCodeId: {
              edges: []
            }
          },
          allProducts: {
            edges: [
              {node: {productName: 'product_1', rowId: 123}},
              {node: {productName: 'product_2', rowId: 456}}
            ]
          },
          ' $refType': 'AllowableProductsSearch_query'
        }}
      />
    );

    // Using the typeahead just like a human would
    componentUnderTest.find('.rbt-input-main').simulate('click');

    const options = componentUnderTest.find('.dropdown-item');
    expect(options.length).toBe(2);
    options.at(0).simulate('click');

    // Clicking the 'Add Optional' button
    componentUnderTest.find('.btn-secondary').simulate('click');

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      'test-relay-env',
      {
        input: {
          isMandatoryInput: false,
          naicsCodeIdInput: 1,
          productIdInput: 123
        }
      },
      'naicsCode_id',
      'AllowableProducts_productNaicsCodesByNaicsCodeId'
    );
  });

  it('calls the create_product_naics_code mutation with the mandatory flag when clicking mandatory', () => {
    const spy = jest
      .spyOn(
        require('mutations/product_naics_code/createProductNaicsCodeMutation'),
        'default'
      )
      .mockImplementation(() => {});

    const componentUnderTest = mount(
      <AllowableProductsSearchContainer
        relay={{environment: 'test-relay-env'} as any}
        query={{
          naicsCode: {
            id: 'naicsCode_id',
            rowId: 5,
            productNaicsCodesByNaicsCodeId: {
              edges: []
            }
          },
          allProducts: {
            edges: [
              {node: {productName: 'product_1', rowId: 111}},
              {node: {productName: 'product_2', rowId: 2222}}
            ]
          },
          ' $refType': 'AllowableProductsSearch_query'
        }}
      />
    );

    // Using the typeahead just like a human would
    componentUnderTest.find('.rbt-input-main').simulate('click');

    const options = componentUnderTest.find('.dropdown-item');
    expect(options.length).toBe(2);
    options.at(1).simulate('click');

    // Clicking the 'Add Optional' button
    componentUnderTest.find('.btn-primary').simulate('click');

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      'test-relay-env',
      {
        input: {
          isMandatoryInput: true,
          naicsCodeIdInput: 5,
          productIdInput: 2222
        }
      },
      'naicsCode_id',
      'AllowableProducts_productNaicsCodesByNaicsCodeId'
    );
  });
});
