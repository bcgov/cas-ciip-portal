import React ,{ Component } from 'react'
import {graphql, QueryRenderer} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
import ProductRowItem from "./ProductRowItem";
const environment = initEnvironment();


class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    listProducts = ({error, props}) => {
        console.log('ProductList.js > listProducts()', props, error);
        let productList = [];
        let archivedList = [];
        if(props){
            const allProducts = props.allProducts.nodes;
            allProducts.forEach((product) => {
              if (product.state !== 'deprecated')
                product.state === 'archived' ? archivedList.push(<ProductRowItem product={product}/>) : productList.push(<ProductRowItem product={product}/>);
            })
        }
        return productList.concat(archivedList);
    }

    render(){
        return(
            <QueryRenderer
                environment={environment}
                query={graphql`
                    query ProductListQuery {
                        allProducts{
                            nodes{
                              rowId
                              name
                              description
                              state
                              parent
                              benchmarksByProductId{
                                nodes{
                                  benchmark
                                  eligibilityThreshold
                                }
                            }
                        }
                    }
                }`}
                render={this.listProducts}
            />
        )
    }

}

export default ProductList;
