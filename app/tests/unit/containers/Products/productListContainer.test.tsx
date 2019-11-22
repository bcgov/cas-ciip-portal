import React from 'react';
import {shallow} from 'enzyme';
import {ProductList} from 'containers/Products/ProductListContainer';

describe('ProductList', () => {
  it('should render the product list', async () => {
    const query = {
      ' $refType': 'ProductListContainer_query',
      searchProducts: {
        edges: [
          {
            node: {
              id: 'abc'
            }
          }
        ]
      }
    };
    // @ts-ignore
    const r = shallow(<ProductList query={query} />);
    expect(r).toMatchSnapshot();
    expect(
      r
        .find('Relay(ProductRowItemComponent)')
        .first()
        .prop('product')
    ).toBe(query.searchProducts.edges[0].node);
  });
});
