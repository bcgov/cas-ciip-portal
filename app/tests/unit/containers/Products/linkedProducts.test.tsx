import React from 'react';
import {shallow} from 'enzyme';
import {LinkedProducts} from 'containers/Products/LinkedProducts';

describe('Linked Prdocuts', () => {
  it('should match the last snapshot', async () => {
    const query = {
      nonEnergyProducts: {
        edges: [
          {
            node: {
              id: 'abc',
              rowId: 1,
              productName: 'test product 1'
            }
          }
        ],
        totalCount: 1
      },
      ' $refType': null
    };
    const product = {
      id: 'abc',
      rowId: 1,
      productName: 'test product 1',
      linkedProductsByProductId: {
        __id: 'connection',
        edges: [
          {
            node: {
              id: 'asdf',
              rowId: 2,
              linkedProductId: 2,
              productByLinkedProductId: {
                productName: 'linked product 1'
              }
            }
          }
        ]
      },
      ' $refType': null
    };

    const r = shallow(
      <LinkedProducts
        query={query}
        product={product}
        relay={null}
        setLinkProductModalShow={jest.fn()}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
