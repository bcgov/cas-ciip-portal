import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import updateUserMutation from '../../mutations/user/updateUserMutation';
import {useInput} from '../../components/Forms/InputHook';

export const FormEditUserComponent = props => {
  const {user, submitAction, submitBtnName} = props;

  const handleChange = e => {
    updateUserMutation(props.relay.environment, props.user, {
      [e.target.name]: e.target.value
    });
  };

  const {bind: bindFirstName} = useInput(user.firstName, handleChange);
  const {bind: bindLastName} = useInput(user.lastName, handleChange);
  const {bind: bindEmailAddress} = useInput(user.emailAddress, handleChange);
  const {bind: bindPhoneNumber} = useInput(user.phoneNumber, handleChange);
  const {bind: bindOccupation} = useInput(user.occupation, handleChange);

  return (
    <>
      <Form id="registration-form" className="mb-5">
        <input hidden name="id" value={user.id} />
        <Form.Group controlId="formBasicName">
          <Row className="mb-4">
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="string"
                name="firstName"
                {...bindFirstName}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="string"
                name="lastName"
                {...bindLastName}
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
                {...bindEmailAddress}
              />
            </Col>
            <Col>
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                required
                type="string"
                name="phoneNumber"
                {...bindPhoneNumber}
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
                {...bindOccupation}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          className="mt-4"
          value="Continue"
          onClick={submitAction}
        >
          {submitBtnName || 'Continue'}
        </Button>
      </Form>
    </>
  );
};

export default createFragmentContainer(FormEditUserComponent, {
  user: graphql`
    fragment FormEditUser_user on User {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      occupation
    }
  `
});
