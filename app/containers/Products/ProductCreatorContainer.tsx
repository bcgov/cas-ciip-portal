import React from 'react';
import {graphql, createFragmentContainer, commitMutation} from 'react-relay';
import {Form, Button, Col} from 'react-bootstrap';

export const ProductCreator = props => {
  const createProductFromRef = React.createRef<Form & HTMLFormElement>();
  const createProduct = graphql`
    mutation ProductCreatorContainerMutation($input: CreateProductInput!) {
      createProduct(input: $input) {
        product {
          rowId
        }
        query {
          ...ProductListContainer_query
        }
      }
    }
  `;

  const saveProduct = event => {
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

    const saveMutation = createProduct;
    const {environment} = props.relay;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveVariables,
      onCompleted: response => {
        console.log(response);
        createProductFromRef.current.reset();
      },
      onError: err => console.error(err)
    });
  };

  return (
    <>
      <div>
        <Form ref={createProductFromRef} onSubmit={saveProduct}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="product_name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control required type="text" placeholder="" />
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="product_description">
              <Form.Label>Product Description</Form.Label>
              <Form.Control required type="textbox" placeholder="" />
            </Form.Group>
          </Form.Row>
          <Button type="submit">Create Product</Button>
        </Form>
      </div>
    </>
  );
};

export default createFragmentContainer(ProductCreator, {});
