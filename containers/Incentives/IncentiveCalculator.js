import React ,{ Component } from 'react'
import {graphql, QueryRenderer, fetchQuery} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
import IncentiveCalculator from '../../components/Incentives/IncentiveCalculator'
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

const productsByApplicationQuery = graphql`
        query IncentiveCalculatorProductsByApplicationQuery {
            getProductsByApplicationId(appId:6){
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


class IncentiveCalculatorContainer extends Component {

    constructor(props) {
        super(props);
    }

    getData = async () => {
      const allProducts = await fetchQuery(environment, allProductsQuery);
      const productsByApplication = await fetchQuery(environment, productsByApplicationQuery);
      return ({
          allProducts,
          productsByApplication,
          carbonTaxPaid: 1000000 // assume a value until ciip and swrs are connected
      });
    };

    calculateIncentive = async () => {
        const data = await this.getData();
        const productsReported = data.productsByApplication.getProductsByApplicationId.nodes;
        const allProducts = data.allProducts.allProducts.nodes;
        let eligibleFuelList = [];
        let carbonIncentive = 0;

        productsReported.forEach((product) => {
           // Get bm/et details for the product from the Products table
           const productDetails = allProducts.filter((p) => p.name === product.processingUnit);
           console.log('each product', product, productDetails);
           const benchmark = productDetails[0].benchmarksByProductId.nodes[0].benchmark;
           const eligibilityThreshold = productDetails[0].benchmarksByProductId.nodes[0].eligibilityThreshold;
           let eligibilityValue = 0;

           if (product.quantity > benchmark && product.quantity < eligibilityThreshold){
               eligibilityValue = ((product.quantity - benchmark) / (eligibilityThreshold - benchmark));
           }

           const eligibleFuelValue = product.attributableFuelPercentage/100 * eligibilityValue;
           carbonIncentive = carbonIncentive + ( eligibleFuelValue * data.carbonTaxPaid )

        });

        console.log('ct',carbonIncentive);
    };


    render(){
       this.calculateIncentive();
       return <IncentiveCalculator/>
    }

}

export default IncentiveCalculatorContainer;

/*

Incentives Calculator
1: Get the application by id - fetch application
2: Write function to fetch production data by application id
3: get the benchmark / et for each production item - fetch benchmarks
4: assume a carbox tax paid value until ciip and swrs are connected
5: find details for product -- todo: use products ids
6: calculate percentage eligibility
7: multiply by fuel allocation and ct
8: voila


4: Create a view from the carbon tax table
4: get the carbon tax paid by facility that year

q = 73
bm = 10
et = 90
60/80 = 75% eligible
fuel = 40%
0.75 * 0.40 = 0.315

total = 1,000,000

*/