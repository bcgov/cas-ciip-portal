import React from 'react';
import MissingProductsComponent from 'components/product/MissingProductsComponent';
import {mount} from 'enzyme';

describe('The missing products component', () => {
  it('should not render alerts when there are no missing products', () => {
    const query = {
      products: {
        edges: []
      }
    };
    const formResult = [{requiresEmissionAllocation: false}];

    const mountedComponent = mount(
      <MissingProductsComponent query={query} formResult={formResult} />
    );
    expect(mountedComponent).toMatchSnapshot();
    expect(mountedComponent.find('Alert')).toHaveLength(0);
  });

  it('should render an alert reminder to report any missing linked products', () => {
    const query = {
      products: {
        edges: [
          {
            node: {
              rowId: 1,
              productName: 'foo',
              linkedProduct: {
                edges: [
                  {
                    node: {
                      rowId: 2,
                      productName: 'bar',
                      linkedProductId: 3
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    };
    const formResult = [{productRowId: 1}, {requiresEmissionAllocation: false}];

    const mountedComponent = mount(
      <MissingProductsComponent query={query} formResult={formResult} />
    );

    expect(mountedComponent).toMatchSnapshot();
    expect(mountedComponent.find('Alert').at(1).text()).toContain(
      'foo requires reporting of: bar'
    );
  });
});
