import React from 'react';
import {createFragmentContainer} from 'react-relay';
import {Form, Button, Col} from 'react-bootstrap';
import createProductMutation from '../../mutations/product/createProductMutation';

export const ProductCreator = props => {
  const createProductFromRef = React.createRef<Form & HTMLFormElement>();

  const saveProduct = async event => {
    event.preventDefault();
    event.stopPropagation();
    const date = new Date().toUTCString();
    const variables = {
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

    const {environment} = props.relay;
    await createProductMutation(environment, variables);
    createProductFromRef.current.reset();
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
