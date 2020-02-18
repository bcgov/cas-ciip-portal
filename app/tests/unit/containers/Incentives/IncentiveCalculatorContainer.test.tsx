import React from 'react';
import {shallow} from 'enzyme';
import {IncentiveCalculator} from 'containers/Incentives/IncentiveCalculatorContainer';
import {IncentiveCalculatorContainer_applicationRevision} from '__generated__/IncentiveCalculatorContainer_applicationRevision.graphql';

describe('IncentiveCalculator', () => {
  const applicationRevision: IncentiveCalculatorContainer_applicationRevision = {
    ' $refType': 'IncentiveCalculatorContainer_applicationRevision',
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
    const r = shallow(
      <IncentiveCalculator applicationRevision={applicationRevision} />
    );
    expect(r).toMatchSnapshot();
  });

  it('should pass reported products as props to IncentiveSegmentContainer component', async () => {
    const r = shallow(
      <IncentiveCalculator applicationRevision={applicationRevision} />
    );
    expect(
      r
        .find('Relay(IncentiveSegmentContainer)')
        .first()
        .prop('ciipIncentiveByProduct')
    ).toBe(applicationRevision.ciipIncentive.edges[0].node);
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
