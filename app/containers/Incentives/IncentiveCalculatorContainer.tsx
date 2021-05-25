import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Table, Jumbotron} from 'react-bootstrap';
import Money from 'components/helpers/Money';
import {IncentiveCalculatorContainer_applicationRevision} from 'IncentiveCalculatorContainer_applicationRevision.graphql';
import IncentiveSegmentContainer from './IncentiveSegmentContainer';

interface Props {
  applicationRevision: IncentiveCalculatorContainer_applicationRevision;
}

export const IncentiveCalculator: React.FunctionComponent<Props> = ({
  applicationRevision
}) => {
  const {edges = []} = applicationRevision.ciipIncentive;

  const aggTotals = edges.reduce(
    function calcAggs(
      accumulator,
      {node: {incentiveProduct, incentiveProductMax}}
    ) {
      return {
        incentiveProduct:
          accumulator.incentiveProduct + Number(incentiveProduct),
        incentiveProductMax:
          accumulator.incentiveProductMax + Number(incentiveProductMax)
      };
    },
    {incentiveProduct: 0, incentiveProductMax: 0}
  );

  // incentive ratio = calculated incentive / maximum incentive
  // set the default to 1 to avoid division by zero.
  let aggIncentiveRatio = 1;
  if (aggTotals.incentiveProductMax > 0) {
    aggIncentiveRatio =
      aggTotals.incentiveProduct / aggTotals.incentiveProductMax;
  }

  return (
    <>
      <Jumbotron>
        <h2>Incentive by Product:</h2>
        <p>
          This formula gives the partial incentive for each product reported in
          the CIIP application.
          <br />
          The total Incentive is the sum of these partial incentives.
        </p>
        <img src="/static/ciip-formula.svg" alt="CIIP Incentive Formula" />
      </Jumbotron>

      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Emission Intensity</th>
            <th>Benchmark</th>
            <th>Eligibility Threshold</th>
            <th>Incentive Multiplier</th>
            <th>Payment Allocation</th>
            <th>Incentive Ratio</th>
            <th>Calculated Incentive (CAD)</th>
            <th>Maximum Incentive (CAD)</th>
          </tr>
        </thead>
        <tbody>
          {edges.map(({node}) => (
            <IncentiveSegmentContainer
              key={node.rowId}
              ciipIncentiveByProduct={node}
            />
          ))}
          {edges.length > 1 && (
            <tr>
              <td /> <td /> <td /> <td /> <td /> <td />
              <td className="text-right">
                {Number.parseFloat(aggIncentiveRatio.toFixed(4))}
              </td>
              <td className="text-right">
                <Money amount={aggTotals.incentiveProduct.toFixed(2)} />
              </td>
              <td className="text-right">
                <Money amount={aggTotals.incentiveProductMax.toFixed(2)} />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <style jsx>{`
        h2 {
          font-size: 1.25rem;
          margin-botton: 0.5rem;
        }

        img {
          width: 100%;
          max-width: 500px;
        }
      `}</style>
    </>
  );
};

export default createFragmentContainer(IncentiveCalculator, {
  applicationRevision: graphql`
    fragment IncentiveCalculatorContainer_applicationRevision on ApplicationRevision {
      ciipIncentive {
        edges {
          node {
            rowId
            incentiveProduct
            incentiveProductMax
            ...IncentiveSegmentContainer_ciipIncentiveByProduct
          }
        }
      }
    }
  `
});
