import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import updateUserMutation from '../../mutations/user/updateUserMutation';

export const FormUpdateUser = props => {
  const {user} = props;

  const createUserFromRef = React.createRef();

  // Need to do something after form submitted
  const submitForm = event => {
    event.preventDefault();
    event.stopPropagation();

    createUserFromRef.current.reset();
  };

  const handleChange = e => {
    updateUserMutation(props.relay.environment, props.user, {
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Form
        ref={createUserFromRef}
        id="registration-form"
        className="mb-5"
        onSubmit={submitForm}
      >
        <input hidden name="id" value={user.id} />
        <Form.Group controlId="formBasicName">
          <Row className="mb-4">
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="string"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="string"
                name="lastName"
                value={user.lastName}
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
                required
                type="string"
                name="emailAddress"
                value={user.emailAddress}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                required
                type="string"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="mb-4">
            <Col lg={6}>
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                required
                type="string"
                name="occupation"
                value={user.occupation}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default createFragmentContainer(FormUpdateUser, {
  user: graphql`
    fragment FormUpdateUser_user on User {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      occupation
    }
  `
});
