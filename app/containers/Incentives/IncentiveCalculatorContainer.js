import React, {Component} from 'react';
import {graphql, fetchQuery, createRefetchContainer} from 'react-relay';
import propTypes from 'prop-types';
import {Table, Jumbotron, Card} from 'react-bootstrap';
import IncentiveSegment from '../../components/Incentives/IncentiveSegment';
import IncentiveSegmentFormula from '../../components/Incentives/IncentiveSegmentFormula';

const productsByBcghgidQuery = graphql`
  query IncentiveCalculatorContainerProductsByBcghgidQuery(
    $bcghgidInput: BigFloat
  ) {
    getProductsByBcghgid(bcghgidInput: $bcghgidInput) {
      nodes {
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
`;

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

class IncentiveCalculatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCarbonIncentive: 0,
      incentiveSegments: []
    };
  }

  getData = async () => {
    const {environment} = this.props.relay;

    const {allProducts} = this.props.query;

    const reportedProducts = await fetchQuery(
      environment,
      productsByBcghgidQuery,
      {bcghgidInput: Number(this.props.bcghgid)}
    );
    const carbonTaxByBcghgid = await fetchQuery(
      environment,
      carbonTaxByBcghgidQuery,
      {
        bcghgidInput: Number(this.props.bcghgid),
        reportingYear: this.props.reportingYear
      }
    );

    const totalCarbonTax = carbonTaxByBcghgid.getCarbonTaxByBcghgid.nodes.reduce(
      (total, curr) => {
        return parseFloat(total) + parseFloat(curr.calculatedCarbonTax);
      },
      0
    );
    return {
      allProducts,
      reportedProducts,
      carbonTaxPaid: totalCarbonTax
    };
  };

  generateIncentiveCalculationData = async () => {
    console.log(this.props);
    const data = await this.getData();
    console.log('IncentiveCalculatorContainer, getdata():', data);
    const productsReported = data.reportedProducts.getProductsByBcghgid.nodes;
    const allProducts = data.allProducts.edges;
    let totalCarbonIncentive = 0;
    const incentiveSegments = [];

    productsReported.forEach(product => {
      // Get bm/et details for the product from the Products table
      const productDetails = allProducts.filter(
        ({node: p}) => p.name === product.product
      );
      if (productDetails.length > 0) {
        const productQuantity = parseFloat(product.quantity);
        const attributableFuelPercentage = parseFloat(
          product.attributableFuelPercentage
        );
        console.log(productDetails[0]);
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
        totalCarbonIncentive += eligibleFuelValue * data.carbonTaxPaid;

        incentiveSegments.push(
          <IncentiveSegment
            name={product.product}
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

    this.setState({
      totalCarbonIncentive,
      incentiveSegments
    });
  };

  componentDidMount() {
    this.generateIncentiveCalculationData();
  }

  render() {
    console.log(this.props);
    const {incentiveSegments} = this.state;
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
              {incentiveSegments.map((segment, index) => (
                <React.Fragment key={index}>{segment}</React.Fragment>
              ))}
              <tr>
                <td colSpan="2">
                  <strong>Total Incentive</strong>
                </td>
                <td>
                  <strong>
                    CAD {this.state.totalCarbonIncentive.toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  }

  static propTypes = {
    bcghgid: propTypes.string.isRequired,
    reportingYear: propTypes.string.isRequired
  };
}

export default createRefetchContainer(IncentiveCalculatorContainer, {
  query: graphql`
    fragment IncentiveCalculatorContainer_query on Query {
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
    }
  `
});

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
