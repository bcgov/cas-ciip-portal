import React, {Component} from 'react';
import {graphql, fetchQuery} from 'react-relay';
import {Table, Jumbotron, Card} from 'react-bootstrap';
import initEnvironment from '../../lib/createRelayEnvironment';
import IncentiveSegment from '../../components/Incentives/IncentiveSegment';
import IncentiveSegmentFormula from '../../components/Incentives/IncentiveSegmentFormula';

const environment = initEnvironment();

const allProductsQuery = graphql`
  query IncentiveCalculatorQuery {
    allProducts {
      nodes {
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
`;

const productsByBcghgidQuery = graphql`
  query IncentiveCalculatorProductsByBcghgidQuery($bcghgidInput: String) {
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
  query IncentiveCalculatorCarbonTaxByBcghgidQuery(
    $bcghgidInput: String
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
    const allProducts = await fetchQuery(environment, allProductsQuery);

    const reportedProducts = await fetchQuery(
      environment,
      productsByBcghgidQuery,
      {bcghgidInput: this.props.bcghgid}
    );
    const carbonTaxByBcghgid = await fetchQuery(
      environment,
      carbonTaxByBcghgidQuery,
      {
        bcghgidInput: this.props.bcghgid,
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
    const data = await this.getData();
    console.log('IncentiveCalculatorContainer, getdata():', data);
    const productsReported = data.reportedProducts.getProductsByBcghgid.nodes;
    const allProducts = data.allProducts.allProducts.nodes;
    let totalCarbonIncentive = 0;
    const incentiveSegments = [];

    productsReported.forEach(product => {
      // Get bm/et details for the product from the Products table
      const productDetails = allProducts.filter(
        p => p.name === product.product
      );
      if (productDetails.length > 0) {
        const productQuantity = parseFloat(product.quantity);
        const attributableFuelPercentage = parseFloat(
          product.attributableFuelPercentage
        );
        // Const eligibilityThreshold = productDetails[0] ? productDetails[0].benchmarksByProductId.nodes[0].eligibilityThreshold : 0;
        const bm_et =
          productDetails[0].benchmarksByProductId.nodes[
            productDetails[0].benchmarksByProductId.nodes.length - 1
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
}

export default IncentiveCalculatorContainer;
