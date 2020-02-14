import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Table, Jumbotron} from 'react-bootstrap';
import IncentiveSegmentFormula from 'components/Incentives/IncentiveSegmentFormula';
import {IncentiveCalculatorContainer_query} from 'IncentiveCalculatorContainer_query.graphql';
import IncentiveSegmentContainer from './IncentiveSegmentContainer';

interface Props {
  query: IncentiveCalculatorContainer_query;
}

export const IncentiveCalculator: React.FunctionComponent<Props> = ({
  query
}) => {
  const {edges = []} = query.ciipIncentive;
  return (
    <>
      <Jumbotron>
        <div style={{marginBottom: '30px'}}>
          <h5>Incentive by Product:</h5>
          <p>
            This formula gives the partial incentive for each product reported
            in <br />
            the CIIP application. The total Incentive is the sum of these
            partial incentives.
            <br />
          </p>
        </div>
        <IncentiveSegmentFormula />
      </Jumbotron>

      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Product</th>
            <th>Calculation Breakdown</th>
            <th>Incentive for product</th>
            <th>Chart</th>
          </tr>
        </thead>
        <tbody>
          {edges.map(({node}) => (
            <IncentiveSegmentContainer
              key={node.rowId}
              ciipIncentiveByProduct={node}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default createFragmentContainer(IncentiveCalculator, {
  query: graphql`
    fragment IncentiveCalculatorContainer_query on Query
      @argumentDefinitions(
        appId: {type: "String"}
        versionNo: {type: "String"}
      ) {
      ciipIncentive(appId: $appId, versionNo: $versionNo) {
        edges {
          node {
            rowId
            ...IncentiveSegmentContainer_ciipIncentiveByProduct
          }
        }
      }
    }
  `
});
