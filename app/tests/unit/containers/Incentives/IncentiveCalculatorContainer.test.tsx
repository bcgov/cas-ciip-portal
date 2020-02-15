import React from 'react';
import {shallow} from 'enzyme';
import {IncentiveCalculator} from 'containers/Incentives/IncentiveCalculatorContainer';
import {IncentiveCalculatorContainer_query} from '__generated__/IncentiveCalculatorContainer_query.graphql';

describe('IncentiveCalculator', () => {
  const query: IncentiveCalculatorContainer_query = {
    ' $refType': 'IncentiveCalculatorContainer_query',
    ciipIncentive: {
      edges: [
        {
          node: {
            ' $fragmentRefs': {
              IncentiveSegmentContainer_ciipIncentiveByProduct: true
            },
            rowId: 1
          }
        }
      ]
    }
  };

  it('should render the page', async () => {
    const r = shallow(<IncentiveCalculator query={query} />);
    expect(r).toMatchSnapshot();
  });

  it('should pass reported products as props to IncentiveSegmentContainer component', async () => {
    const r = shallow(<IncentiveCalculator query={query} />);
    expect(
      r
        .find('Relay(IncentiveSegmentContainer)')
        .first()
        .prop('ciipIncentiveByProduct')
    ).toBe(query.ciipIncentive.edges[0].node);
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
