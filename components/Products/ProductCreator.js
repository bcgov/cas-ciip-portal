import React ,{ Component } from 'react'
import {graphql, QueryRenderer, commitMutation} from "react-relay";
import { Form, Button, Col } from 'react-bootstrap';
import initEnvironment from '../../lib/createRelayEnvironment';
const environment = initEnvironment();

class ProductCreator extends Component {

    constructor(props) {
        super(props);
        this.createProductFromRef = React.createRef();
        this.createProduct = graphql`
            mutation ProductCreatorMutation ($input: CreateProductInput!){
                createProduct(input:$input){
                    product{
                        rowId
                    }
                }
            }
        `;

        this.createProductBenchmark = graphql`
            mutation ProductCreatorProductBenchmarkMutation ($input: CreateProductBenchmarkInput!){
                createProductBenchmark(input:$input){
                    productBenchmark{
                        rowId
                    }
                }
            }
        `;

        this.updateProductBenchmark = graphql`
            mutation ProductCreatorUpdateProductBenchmarkMutation ($input: UpdateProductBenchmarkByRowIdInput!){
                updateProductBenchmarkByRowId(input:$input){
                    productBenchmark{
                        rowId
                    }
                }
            }
        `;
    }

    updateProductBenchmarkProductId = (productBenchmarkId, productId) => {

        const saveVariables =
            {
                "input": {
                    "productBenchmarkPatch": {
                        "productId": productId
                    },
                    "rowId": productBenchmarkId
                },
            }
        const saveMutation = this.updateProductBenchmark;
        commitMutation(
            environment,
            {
                mutation: saveMutation,
                variables: saveVariables,
                onCompleted: (response, errors) => {
                    console.log(response);
                },
                onError: err => console.error(err),
            },
      ) ;
      window.location.reload();
    }

    saveProduct = (product, productBenchmarkId) => {

      const saveVariables =
          {
              "input": {
                  "product": {
                      "productBenchmarkId": productBenchmarkId,
                      "name": product.product_name,
                      "description": product.product_desc,
                      "archived": false
                  }
              }
          };

      const saveMutation = this.createProduct;
      commitMutation(
          environment,
          {
              mutation: saveMutation,
              variables: saveVariables,
              onCompleted: (response, errors) => {
                  console.log(response);
                  this.updateProductBenchmarkProductId(productBenchmarkId, response.createProduct.product.rowId);
                  this.createProductFromRef.current.reset();
              },
              onError: err => console.error(err),
          },
      );
  }

    saveProductBenchmark = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const product_name = event.target.product_name.value;
        const product_desc = event.target.product_description.value;
        const saveVariables =
            {
                "input": {
                    "productBenchmark": {}
                }
            };

        const saveMutation = this.createProductBenchmark;
        commitMutation(
            environment,
            {
                mutation: saveMutation,
                variables: saveVariables,
                onCompleted: (response, errors) => {
                    console.log(response);
                    this.saveProduct({product_name, product_desc}, response.createProductBenchmark.productBenchmark.rowId)
                },
                onError: err => console.error(err),
            },
        );
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Form ref={ this.createProductFromRef } onSubmit={this.saveProductBenchmark}>
                        <Form.Row>
                        <Form.Group as={Col} md="4" controlId="product_name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control required="required" type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group as={Col} md="8" controlId="product_description">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control required="required" type="textbox" placeholder="" />
                        </Form.Group>
                        </Form.Row>
                        <Button type="submit">Create Product</Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    }

}

export default ProductCreator;