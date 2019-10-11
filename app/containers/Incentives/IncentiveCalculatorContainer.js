import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {Table, Jumbotron} from 'react-bootstrap';
import IncentiveSegmentFormula from '../../components/Incentives/IncentiveSegmentFormula';
import IncentiveSegmentContainer from './IncentiveSegmentContainer';

const IncentiveCalculatorContainer = props => {
  useEffect(() => {
    const refetchVariables = {
      bcghgidInput: Number(props.bcghgid),
      reportingYear: props.reportingYear
    };
    props.relay.refetch(refetchVariables);
  });

  const {allProducts, bcghgidProducts, carbonTax} = props.query;
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

      <div className="incentive-breakdown">
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
            {props
              ? bcghgidProducts.edges.map(edge => (
                  <IncentiveSegmentContainer
                    key={edge.node.id}
                    reported={edge.node}
                    allProducts={allProducts}
                    carbonTax={carbonTax}
                  />
                ))
              : '...Loading'}
            <tr>
              <td colSpan="2">
                <strong>Total Incentive</strong>
              </td>
              <td>
                {/* <strong>CAD {props.totalCarbonIncentive.toFixed(2)}</strong> */}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default createRefetchContainer(
  IncentiveCalculatorContainer,
  {
    query: graphql`
      fragment IncentiveCalculatorContainer_query on Query
        @argumentDefinitions(
          bcghgidInput: {type: "BigFloat"}
          reportingYear: {type: "String"}
        ) {
        allProducts: allProducts {
          edges {
            node {
              id
              rowId
              name
              description
              benchmarksByProductId {
                nodes {
                  benchmark
                  eligibilityThreshold
                }
              }
            }
          }
        }
        bcghgidProducts: getProductsByBcghgid(bcghgidInput: $bcghgidInput) {
          edges {
            node {
              id
              ...IncentiveSegmentContainer_reported
            }
          }
        }
        carbonTax: getCarbonTaxByBcghgid(
          bcghgidInput: $bcghgidInput
          reportingYear: $reportingYear
        ) {
          edges {
            node {
              reportId
              organisationId
              fuelType
              calculatedCarbonTax
            }
          }
        }
      }
    `
  },
  graphql`
    query IncentiveCalculatorContainerRefetchQuery(
      $bcghgidInput: BigFloat
      $reportingYear: String
    ) {
      query {
        ...IncentiveCalculatorContainer_query
          @arguments(bcghgidInput: $bcghgidInput, reportingYear: $reportingYear)
      }
    }
  `
);
