import React ,{ Component } from 'react'
import {graphql, QueryRenderer, fetchQuery} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
import IncentiveSegment from "../../components/Incentives/IncentiveSegment";
import IncentiveSegmentFormula from "../../components/Incentives/IncentiveSegmentFormula";
import {Table, Jumbotron, Card} from 'react-bootstrap';
const environment = initEnvironment();

const allProductsQuery = graphql`
        query IncentiveCalculatorQuery {
            allProducts{
                nodes{
                    rowId
                    name
                    description
                    benchmarksByProductId{
                        nodes{
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
            getProductsByBcghgid(bcghgidInput: $bcghgidInput){
                nodes{
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
    query IncentiveCalculatorCarbonTaxByBcghgidQuery($bcghgidInput: String, $reportingYear: String) {
        getCarbonTaxByBcghgid(bcghgidInput:$bcghgidInput, reportingYear:$reportingYear){
            nodes{
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
            totalCarbonIncentive:0,
            incentiveSegments:[]
        }
    }

    getData = async () => {
      const allProducts = await fetchQuery(environment, allProductsQuery);
      console.log('bcccc',this.props);
      const reportedProducts = await fetchQuery(environment, productsByBcghgidQuery, {bcghgidInput: this.props.bcghgid});
      const carbonTaxByBcghgid = await fetchQuery(environment, carbonTaxByBcghgidQuery ,
                                            {bcghgidInput: this.props.bcghgid, reportingYear: this.props.reportingYear});

      const totalCarbonTax = carbonTaxByBcghgid.getCarbonTaxByBcghgid.nodes.reduce((total, curr) => {
          return parseFloat(total) + parseFloat(curr.calculatedCarbonTax)
      }, 0);

      return ({
          allProducts,
          reportedProducts,
          carbonTaxPaid: totalCarbonTax // assume a value until ciip and swrs are connected
      });
    };

    generateIncentiveCalculationData = async () => {
        const data = await this.getData();
        console.log('data', data)
        const productsReported = data.reportedProducts.getProductsByBcghgid.nodes;
        const allProducts = data.allProducts.allProducts.nodes;
        let totalCarbonIncentive = 0;
        let incentiveSegments = [];

        productsReported.forEach((product) => {
           // Get bm/et details for the product from the Products table
           const productDetails = allProducts.filter((p) => p.name === product.product);
           const productQuantity = parseFloat(product.quantity)
           const attributableFuelPercentage = parseFloat(product.attributableFuelPercentage)
           const benchmark = productDetails[0] ? productDetails[0].benchmarksByProductId.nodes[0].benchmark : 0;
           const eligibilityThreshold = productDetails[0] ? productDetails[0].benchmarksByProductId.nodes[0].eligibilityThreshold : 0;
           //todo: How do we deal with benchmarks and products not set in db.
           let eligibilityValue = 0;

           if (productQuantity > benchmark && productQuantity < eligibilityThreshold){
               eligibilityValue = ((productQuantity - benchmark) / (eligibilityThreshold - benchmark));
           }

           const eligibleFuelValue = attributableFuelPercentage/100 * eligibilityValue;
           totalCarbonIncentive = totalCarbonIncentive + ( eligibleFuelValue * data.carbonTaxPaid );

           incentiveSegments.push(
                <IncentiveSegment
                    name = {product.product}
                    quantity={productQuantity}
                    benchmark={benchmark}
                    eligibilityThreshold={eligibilityThreshold}
                    fuelPercentage={attributableFuelPercentage}
                    carbonTaxPaid={data.carbonTaxPaid}
                    incentiveSegment={eligibleFuelValue * data.carbonTaxPaid}
                />
            );

        });

        this.setState({
            totalCarbonIncentive: totalCarbonIncentive,
            incentiveSegments:  incentiveSegments
        });

    };

    componentDidMount() {
        this.generateIncentiveCalculationData();
    }

    render(){
        const incentiveSegments =  this.state.incentiveSegments;
        return (
            <React.Fragment>
                <Jumbotron>
                    <div style={{marginBottom:'30px'}}>
                        <h5>
                            Incentive by Product:
                        </h5>
                        <p>
                            This formula gives the partial incentive for each product reported in <br/>
                            the CIIP application. The total Incentive is the sum of these partial incentives.
                            <br/>
                        </p>
                    </div>
                    <IncentiveSegmentFormula/>
                </Jumbotron>

                <div className='incentive-breakdown'>
                    <Table responsive="lg"  striped bordered hover>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Calculation Breakdown</th>
                            <th>Incentive for product</th>
                            <th>Chart</th>
                        </tr>
                        </thead>
                        <tbody>
                        {incentiveSegments.map(( segment, index ) => (
                            <React.Fragment key={index}>
                                { segment }
                            </React.Fragment>
                        ))}
                        <tr>
                            <td colSpan="2"><strong>Total Incentive</strong></td>
                            <td>
                                <strong>
                                CAD {this.state.totalCarbonIncentive.toFixed(2)}
                                </strong>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </React.Fragment>
        )

    }

}

export default IncentiveCalculatorContainer;

/*
    add data validation
    add tests for missing data
    add errors for missing data
    todo:
    1 create dummy data for actual swrs apps
    2 verify incentives
    2.5 move bcghgid to facility
    2.75 Get BCGHGID and year from Application ID

    3.5 create metabase application using bid, year
    4 create application with metabase widgets and incentives widget
    5 add reporting year to ciip
    6 use application id to get bcghgid and year
    7 Q: how are we matching applications? Facility BCHGHID?

 */