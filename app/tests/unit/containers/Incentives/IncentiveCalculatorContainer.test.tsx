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
            rowId: 1,
            incentiveProduct: '0',
            incentiveProductMax: '0'
          }
        }
      ]
    }
  };

  const applicationRevisionMultiProduct: IncentiveCalculatorContainer_applicationRevision = {
    ' $refType': 'IncentiveCalculatorContainer_applicationRevision',
    ciipIncentive: {
      edges: [
        {
          node: {
            ' $fragmentRefs': {
              IncentiveSegmentContainer_ciipIncentiveByProduct: true
            },
            rowId: 1,
            incentiveProduct: '0',
            incentiveProductMax: '0'
          }
        },
        {
          node: {
            ' $fragmentRefs': {
              IncentiveSegmentContainer_ciipIncentiveByProduct: true
            },
            rowId: 2,
            incentiveProduct: '13.722',
            incentiveProductMax: '15.354'
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

  it('includes an aggregate row with multiple products', async () => {
    const r = shallow(
      <IncentiveCalculator
        applicationRevision={applicationRevisionMultiProduct}
      />
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

  it('correctly aggregates product incentives', async () => {
    const appRev: IncentiveCalculatorContainer_applicationRevision = {
      ' $refType': 'IncentiveCalculatorContainer_applicationRevision',
      ciipIncentive: {
        edges: [
          {
            node: {
              ' $fragmentRefs': {
                IncentiveSegmentContainer_ciipIncentiveByProduct: true
              },
              rowId: 1,
              incentiveProduct: '0',
              incentiveProductMax: '25.1234'
            }
          },
          {
            node: {
              ' $fragmentRefs': {
                IncentiveSegmentContainer_ciipIncentiveByProduct: true
              },
              rowId: 2,
              incentiveProduct: '13.722',
              incentiveProductMax: '15.354'
            }
          },
          {
            node: {
              ' $fragmentRefs': {
                IncentiveSegmentContainer_ciipIncentiveByProduct: true
              },
              rowId: 3,
              incentiveProduct: '23.5432',
              incentiveProductMax: '23.5432'
            }
          }
        ]
      }
    };

    const r = shallow(<IncentiveCalculator applicationRevision={appRev} />);
    const incentiveProductAgg = 0 + 13.722 + 23.5432;
    const incentiveProductMaxAgg = 25.1234 + 15.354 + 23.5432;
    const incentiveRatioAgg = incentiveProductAgg / incentiveProductMaxAgg;

    const aggRow = r.find('tbody tr:last-child');

    expect(aggRow.children('td').length).toEqual(9);
    expect(aggRow.children('td').at(6).text()).toEqual(
      `${Number.parseFloat(incentiveRatioAgg.toFixed(4))}`
    );
    expect(
      aggRow.children('td').at(7).find('Money').first().prop('amount')
    ).toEqual(incentiveProductAgg.toFixed(2));
    expect(
      aggRow.children('td').at(8).find('Money').first().prop('amount')
    ).toEqual(incentiveProductMaxAgg.toFixed(2));
  });
});
