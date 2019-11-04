import React from 'react';
import {shallow} from 'enzyme';
import {IncentiveCalculator} from '../../../containers/Incentives/IncentiveCalculatorContainer';

describe('IncentiveCalculator', () => {
  it('should render the page', async () => {
    const r = shallow(
      <IncentiveCalculator
        query={{
          allProducts: {edges: []},
          bcghgidProducts: {edges: []},
          carbonTax: []
        }}
      />
    );
    expect(r).toMatchSnapshot();
  });

  it('should pass reported products as props to IncentiveSegmentContainer component', async () => {
    const query = {
      allProducts: {edges: []},
      bcghgidProducts: {
        edges: [{node: {id: 'product-id-1', product: 'dylan'}}]
      },
      carbonTax: []
    };
    const r = shallow(<IncentiveCalculator query={query} />);
    expect(
      r
        .find('Relay(IncentiveSegmentContainer)')
        .first()
        .prop('reported')
    ).toBe(query.bcghgidProducts.edges[0].node);
  });

  it.todo('renders the table with products and calculation');
  it.todo('should calculate the correct incentive');
  it.todo('calculates the proper incentive if props exist');
  it.todo("fails gracefully if benchmark and et don't exist");
  it.todo('generates the chart if data exists');
  it.todo('calculates the correct values for BM < Q < ET');
  it.todo('calculates the correct values for BM > Q (i.e. I = 0)');
  it.todo('calculates the correct values for Q > ET (i.e. I = 0)');
  it.todo('calculates the correct total');
});
