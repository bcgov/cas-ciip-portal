import React, {useRef, useState, useEffect} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {createFragmentContainer, graphql, commitLocalUpdate} from 'react-relay';
import updateUserMutation from '../../mutations/user/updateUserMutation';
import {useInput} from '../../components/Forms/InputHook';

export const FormEditUserComponent = props => {
  const {user, submitAction, submitBtnName} = props;

  // Values needed for throttling the mutation
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef('');
  const nameRef = useRef('');
  const makingCall = useRef(false);

  // Function handleChange updates the local store on every keystroke and sets values for updateUserMutation to be called after throttle
  const handleChange = e => {
    // Updater function for commitLocalUpdate
    const updater = store => {
      const node = store.get(user.id);
      node.setValue(e.target.name, e.target.value);
    };

    // Commit change to local store
    commitLocalUpdate(props.relay.environment, updater);
    setInputVal(e.target.value);
    inputRef.current = e.target.value;
    nameRef.current = e.target.name;
  };

  const {bind: bindFirstName} = useInput(user.firstName, handleChange);
  const {bind: bindLastName} = useInput(user.lastName, handleChange);
  const {bind: bindEmailAddress} = useInput(user.emailAddress, handleChange);
  const {bind: bindPhoneNumber} = useInput(user.phoneNumber, handleChange);
  const {bind: bindOccupation} = useInput(user.occupation, handleChange);

  // This useEffect handles the throttling for calling the updateUserMutation
  useEffect(() => {
    // If there's no value or we've already triggered a call
    // prevent further calls
    if (!inputVal.trim() || makingCall.current) return;
    makingCall.current = true;
    setTimeout(async () => {
      await updateUserMutation(props.relay.environment, props.user, {
        [nameRef.current]: inputRef.current
      });
      makingCall.current = false;
      // Only allow one updateUserMutation call per 1s
    }, 1000);
  }, [inputVal, props.relay.environment, props.user]);

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
