import React, {Component} from 'react';
import {graphql, createFragmentContainer, commitMutation} from 'react-relay';
import {Form, Button, Col} from 'react-bootstrap';

class ProductCreator extends Component {
  constructor(props) {
    super(props);
    this.createProductFromRef = React.createRef();
    this.createProduct = graphql`
      mutation ProductCreatorMutation($input: CreateProductInput!) {
        createProduct(input: $input) {
          product {
            rowId
          }
        }
      }
    `;
  }

  saveProduct = event => {
    event.preventDefault();
    event.stopPropagation();
    const date = new Date().toUTCString();
    const saveVariables = {
      input: {
        product: {
          name: event.target.product_name.value,
          description: event.target.product_description.value,
          state: 'active',
          parent: [null],
          createdAt: date,
          createdBy: 'Admin'
        }
      }
    };

    const saveMutation = this.createProduct;
    const {environment} = this.props.relay;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveVariables,
      onCompleted: response => {
        console.log(response);
        this.createProductFromRef.current.reset();
        window.location.reload();
      },
      onError: err => console.error(err)
    });
  };

  render() {
    return (
      <>
        <div>
          <Form ref={this.createProductFromRef} onSubmit={this.saveProduct}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="product_name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control required="required" type="text" placeholder="" />
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="product_description">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  required="required"
                  type="textbox"
                  placeholder=""
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit">Create Product</Button>
          </Form>
        </div>
      </>
    );
  }
}

export default createFragmentContainer(ProductCreator, {});
