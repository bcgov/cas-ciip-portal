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
    }

    saveProduct = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const saveVariables =
          {
              "input": {
                  "product": {
                      "name": event.target.product_name.value,
                      "description": event.target.product_description.value,
                      "state": 'created',
                      "parent": [null]
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
                  this.createProductFromRef.current.reset();
              },
              onError: err => console.error(err),
          },
      );
      window.location.reload();
  }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Form ref={ this.createProductFromRef } onSubmit={this.saveProduct}>
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