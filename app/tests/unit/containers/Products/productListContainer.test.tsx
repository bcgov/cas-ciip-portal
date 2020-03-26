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
      },
      allProducts: {
        totalCount: 1
      },
      session: {
        ciipUserBySub: {
          rowId: 1
        }
      }
    };
    // @ts-ignore
    const r = shallow(<ProductList query={query} />);
    expect(r).toMatchSnapshot();
    expect(r.exists('SearchTableLayoutComponent')).toBe(true);
  });
});
