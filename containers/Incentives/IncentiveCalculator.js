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
                    processingUnit
                    applicationId
                    units
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
      const reportedProducts = await fetchQuery(environment, productsByBcghgidQuery, {bcghgidInput:'4'});
      const carbonTaxByBcghgid = await fetchQuery(environment, carbonTaxByBcghgidQuery , {bcghgidInput: '12111130401', reportingYear:'2014'});

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
           const productDetails = allProducts.filter((p) => p.name === product.processingUnit);
           const productQuantity = parseFloat(product.quantity)
           const attributableFuelPercentage = parseFloat(product.attributableFuelPercentage)
           const benchmark = productDetails[0].benchmarksByProductId.nodes[0].benchmark;
           const eligibilityThreshold = productDetails[0].benchmarksByProductId.nodes[0].eligibilityThreshold;
           let eligibilityValue = 0;

           if (productQuantity > benchmark && productQuantity < eligibilityThreshold){
               eligibilityValue = ((productQuantity - benchmark) / (eligibilityThreshold - benchmark));
           }

           const eligibleFuelValue = attributableFuelPercentage/100 * eligibilityValue;
           totalCarbonIncentive = totalCarbonIncentive + ( eligibleFuelValue * data.carbonTaxPaid );

           incentiveSegments.push(
                <IncentiveSegment
                    name = {product.processingUnit}
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

 */