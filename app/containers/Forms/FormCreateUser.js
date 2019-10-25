import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import createUserMutation from '../../mutations/user/createUserMutation';

const FormCreateUser = props => {
  const user = {
    firstName: '',
    lastName: '',
    emailAddress: ''
  };

  const createUserFromRef = React.createRef();

  // Submit form to create new User
  const submitForm = event => {
    event.preventDefault();
    event.stopPropagation();

    createUserMutation(props.relay.environment, user);

    createUserFromRef.current.reset();
  };

  const handleChange = e => {
    user[e.target.name] = e.target.value;
  };

  return (
    <>
      <Form
        ref={createUserFromRef}
        id="registration-form"
        onSubmit={submitForm}
      >
        <Form.Group controlId="formBasicName">
          <Row className="mb-4">
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="string"
                name="firstName"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="string"
                name="lastName"
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="mb-4">
            <Col>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="string"
                name="emailAddress"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Phone No.</Form.Label>
              <Form.Control type="string" />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default createFragmentContainer(FormCreateUser, {});
