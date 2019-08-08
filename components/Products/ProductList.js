import React ,{ Component } from 'react'
import {graphql, QueryRenderer, commitMutation} from "react-relay";
import {Form, Button, Col, Dropdown} from 'react-bootstrap';
import initEnvironment from '../../lib/createRelayEnvironment';
import ProductRowItem from "./ProductRowItem";
const environment = initEnvironment();

class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    listProducts = ({error, props}) => {
        console.log('ProductList.js > listProducts()', props);
        let productList = [];
        if(props){
            const allProducts = props.allProducts.nodes;
            allProducts.forEach((product) => {
                productList.push(<ProductRowItem product={product}/>);
            })

        }
        return productList;
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
                              benchmarksByProductId{
                                nodes{
                                  benchmark
                                  eligibilityThreshold
                                }
                              }
                            }
                          }
                        }
                    `}
                render={this.listProducts}
            />
        )
    }

}

export default ProductList;