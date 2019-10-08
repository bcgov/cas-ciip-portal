import React, {useEffect} from 'react';
import {graphql, fetchQuery, createRefetchContainer} from 'react-relay';
import {Table, Jumbotron, Card} from 'react-bootstrap';
import IncentiveSegment from '../../components/Incentives/IncentiveSegment';
import IncentiveSegmentFormula from '../../components/Incentives/IncentiveSegmentFormula';

const carbonTaxByBcghgidQuery = graphql`
  query IncentiveCalculatorContainerCarbonTaxByBcghgidQuery(
    $bcghgidInput: BigFloat
    $reportingYear: String
  ) {
    getCarbonTaxByBcghgid(
      bcghgidInput: $bcghgidInput
      reportingYear: $reportingYear
    ) {
      nodes {
        reportId
        organisationId
        fuelType
        calculatedCarbonTax
      }
    }
  }
`;

const IncentiveCalculatorContainer = props => {
  // Constructor(props) {
  //   super(props);
  //   state = {
  //     totalCarbonIncentive: 0,
  //     incentiveSegments: []
  //   };
  // }

  const fakeState = {totalCarbonIncentive: 0, incentiveSegments: []};
  props.setBcghgidInState(props.bcghgid);
  useEffect(() => {
    const refetchVariables = {
      bcghgidInput: Number(props.bcghgid)
    };
    props.relay.refetch(refetchVariables);
  });

  const getData = () => {
    const {allProducts} = props.query;

    const reportedProducts = props.query.bcghgidProducts;

    // Const totalCarbonTax = carbonTaxByBcghgid.getCarbonTaxByBcghgid.nodes.reduce(
    //   (total, curr) => {
    //     return parseFloat(total) + parseFloat(curr.calculatedCarbonTax);
    //   },
    //   0
    // );
    return {
      allProducts,
      reportedProducts,
      carbonTaxPaid: 0 // TotalCarbonTax
    };
  };

  const generateIncentiveCalculationData = () => {
    const data = getData();
    const productsReported = data.reportedProducts.edges;
    const allProducts = data.allProducts.edges;

    productsReported.forEach(product => {
      // Get bm/et details for the product from the Products table
      const productDetails = allProducts.filter(
        ({node: p}) => p.name === product.node.product
      );

      if (productDetails.length > 0) {
        const productQuantity = parseFloat(product.node.quantity);
        const attributableFuelPercentage = parseFloat(
          product.node.attributableFuelPercentage
        );
        // Const eligibilityThreshold = productDetails[0] ? productDetails[0].benchmarksByProductId.nodes[0].eligibilityThreshold : 0;
        const bm_et =
          productDetails[0].node.benchmarksByProductId.nodes[
            productDetails[0].node.benchmarksByProductId.nodes.length - 1
          ];
        const benchmark = bm_et ? bm_et.benchmark : 0;
        const eligibilityThreshold = bm_et ? bm_et.eligibilityThreshold : 0;

        // Todo: How do we deal with benchmarks and products not set in db.
        let eligibilityValue = 0;

        if (
          productQuantity > benchmark &&
          productQuantity < eligibilityThreshold
        ) {
          eligibilityValue =
            (productQuantity - benchmark) / (eligibilityThreshold - benchmark);
        }

        const eligibleFuelValue =
          (attributableFuelPercentage / 100) * eligibilityValue;
        fakeState.totalCarbonIncentive +=
          eligibleFuelValue * data.carbonTaxPaid;

        fakeState.incentiveSegments.push(
          <IncentiveSegment
            name={product.node.product}
            quantity={productQuantity}
            benchmark={benchmark}
            eligibilityThreshold={eligibilityThreshold}
            fuelPercentage={attributableFuelPercentage}
            carbonTaxPaid={data.carbonTaxPaid}
            incentiveSegment={eligibleFuelValue * data.carbonTaxPaid}
          />
        );
      }
    });
    return fakeState;
  };

  const realFakeState = generateIncentiveCalculationData();

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
            {realFakeState.incentiveSegments.map((segment, index) => (
              <React.Fragment key={index}>{segment}</React.Fragment>
            ))}
            <tr>
              <td colSpan="2">
                <strong>Total Incentive</strong>
              </td>
              <td>
                {/* <strong>CAD {state.totalCarbonIncentive.toFixed(2)}</strong> */}
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
        @argumentDefinitions(bcghgidInput: {type: "BigFloat"}) {
        allProducts: allProducts {
          edges {
            node {
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
              rowId
              quantity
              product
              applicationId
              fuelUnits
              associatedEmissions
              attributableFuelPercentage
            }
          }
        }
      }
    `
  },
  graphql`
    query IncentiveCalculatorContainerRefetchQuery($bcghgidInput: BigFloat) {
      query {
        ...IncentiveCalculatorContainer_query
          @arguments(bcghgidInput: $bcghgidInput)
      }
    }
  `
);

// Export default createRefetchContainer(
//   ApplicationStatusContainer,
//   {
//     query: graphql`
//       fragment ApplicationStatusContainer_query on Query
//         @argumentDefinitions(condition: {type: "ApplicationStatusCondition"}) {
//         allApplicationStatuses(condition: $condition) {
//           edges {
//             node {
//               rowId
//               applicationStatus
//             }
//           }
//         }
//       }
//     `
//   },
//   graphql`
//     query ApplicationStatusContainerRefetchQuery(
//       $condition: ApplicationStatusCondition
//     ) {
//       query {
//         ...ApplicationStatusContainer_query @arguments(condition: $condition)
//       }
//     }
//   `
// );
