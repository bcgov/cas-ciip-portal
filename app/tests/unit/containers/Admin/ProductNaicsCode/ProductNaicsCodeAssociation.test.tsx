import * as nextRouter from 'next/router';
import {ProductNaicsCodeAssociationContainer} from 'containers/Admin/ProductNaicsCode/ProductNaicsCodeAssociation';
import {mount} from 'enzyme';
import React from 'react';

describe('The product naics code association component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of naics codes and a helper message when no naics is selected', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/',
      query: ''
    }));

    const componentUnderTest = mount(
      <ProductNaicsCodeAssociationContainer
        relay={{environment: 'test env'} as any}
        query={{
          naicsCode: undefined,
          allNaicsCodes: {
            edges: [
              {
                node: {
                  id: 'naicsId',
                  naicsCode: '123',
                  rowId: 1,
                  naicsDescription: 'test code'
                }
              }
            ]
          },
          ' $refType': 'ProductNaicsCodeAssociation_query',
          ' $fragmentRefs': {
            AllowableProductsSearch_query: true
          }
        }}
      />
    );

    expect(componentUnderTest).toMatchSnapshot();
    expect(componentUnderTest.text()).toContain(
      'Please select a NAICS code on the left to add allowable products'
    );
  });

  it('renders the associated components when a naics is selected', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/naics-products',
      query: {naicsCodeId: 'selectedNaics'}
    }));

    const componentUnderTest = mount(
      <ProductNaicsCodeAssociationContainer
        relay={{environment: 'test env'} as any}
        query={{
          naicsCode: undefined,
          allNaicsCodes: {
            edges: [
              {
                node: {
                  id: 'selectedNaics',
                  naicsCode: '1234',
                  rowId: 1,
                  naicsDescription: 'test code'
                }
              }
            ]
          },
          ' $refType': 'ProductNaicsCodeAssociation_query',
          ' $fragmentRefs': {
            AllowableProductsSearch_query: true
          }
        }}
      />
    );

    expect(componentUnderTest).toMatchSnapshot();
    expect(componentUnderTest.text()).not.toContain(
      'Please select a NAICS code on the left to add allowable products'
    );
  });
});
