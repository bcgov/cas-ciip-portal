import React from 'react';
import {shallow} from 'enzyme';
import {ProductList} from '../../../containers/Products/ProductListContainer';

describe('ProductList', () => {
  it('should render the product list', async () => {
    const query = {
      active: {
        edges: [{node: {id: 'product-1'}}]
      },
      archived: {
        edges: [{node: {id: 'product-2'}}]
      }
    };
    const r = shallow(<ProductList query={query} />);
    expect(r).toMatchSnapshot();
    expect(
      r
        .find('Relay(ProductRowItemComponent)')
        .first()
        .prop('product')
    ).toBe(query.active.edges[0].node);
    expect(
      r
        .find('Relay(ProductRowItemComponent)')
        .last()
        .prop('product')
    ).toBe(query.archived.edges[0].node);
  });
});
