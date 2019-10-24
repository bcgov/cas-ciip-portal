import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import updateUserMutation from '../../mutations/user/updateUserMutation';

const FormCreateUser = props => {
  const {user} = props;

  const createUserFromRef = React.createRef();

  // Submit form to Patch User
  const submitForm = () => {
    // Event.preventDefault();
    // event.stopPropagation();

    // const userDetails = {
    //   input: {
    //     id: 'WyJ1c2VycyIsMV0=',
    //     userPatch: user
    //   }
    // };

    // updateUserMutation(props.relay.environment, userDetails);

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
                type="string"
                name="emailAddress"
                value={user.emailAddress}
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

export default createFragmentContainer(FormCreateUser, {
  user: graphql`
    fragment FormCreateUser_user on User {
      id
      firstName
      lastName
      emailAddress
    }
  `
});
