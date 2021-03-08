import React from 'react';
import {shallow} from 'enzyme';
import {ProductList} from 'containers/Products/ProductListContainer';

describe('ProductList', () => {
  it('should render the product list', async () => {
    const query = {
      allProducts: {
        edges: [
          {
            node: {
              id: 'abc',
              ' $fragmentRefs': {
                ProductRowItemContainer_product: true as true
              }
            }
          }
        ],
        totalCount: 1
      },
      ' $fragmentRefs': {
        ProductRowItemContainer_query: true as true
      },
      ' $refType': null
    };

    const r = shallow(<ProductList query={query} />);
    expect(r).toMatchSnapshot();
    expect(r.exists('FilterableTableLayoutComponent')).toBe(true);
  });

  it('should render the pagination component with the totalCount prop', async () => {
    const query = {
      allProducts: {
        edges: [
          {
            node: {
              id: 'abc',
              ' $fragmentRefs': {
                ProductRowItemContainer_product: true as true
              }
            }
          }
        ],
        totalCount: 1
      },
      ' $fragmentRefs': {
        ProductRowItemContainer_query: true as true
      },
      ' $refType': null
    };
    const r = shallow(<ProductList query={query} />);
    expect(
      r.find('FilterableTablePaginationComponent').prop('totalCount')
    ).toEqual(1);
  });
});
