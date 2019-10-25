import React, {useState} from 'react';
import {Jumbotron, Button, Table, Form} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import editUserMutation from '../../mutations/industry/editUserMutation';
import {useInput} from './InputHook';

const edit = {
  width: '75px'
};
const table = {
  marginTop: '30px',
  marginBottom: '50px'
};

export const UserDetail = props => {
  const {user} = props;
  const [editMode, setMode] = useState(false);
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName
  } = useInput('');
  const {value: lastName, bind: bindLastName, reset: resetLastName} = useInput(
    ''
  );
  const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
  const {value: role, bind: bindRole, reset: resetRole} = useInput('');
  const {value: phone, bind: bindPhone, reset: resetPhone} = useInput('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMode(false);
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPhone();
    resetRole();

    const updateUserVariables = {
      input: {
        rowId: user.rowId,
        userPatch: {
          firstName,
          lastName,
          emailAddress: email,
          occupation: role,
          phoneNumber: phone
        }
      }
    };
    const response = await editUserMutation(
      props.relay.environment,
      updateUserVariables
    );
    console.log(response);
    location.reload();
  };

  const renderForm = () => {
    if (editMode === true) {
      return (
        <Form className="form-edit" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label id="NameInput">First Name</Form.Label>
            <Form.Control
              required
              aria-labelledby="NameInput"
              name="firstName"
              type="text"
              placeholder={user.firstName}
              {...bindFirstName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder={user.lastName}
              {...bindLastName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              required
              name="role"
              type="text"
              placeholder={user.occupation}
              {...bindRole}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              name="phone"
              type="text"
              placeholder={user.phoneNumber}
              {...bindPhone}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder={user.emailAddress}
              {...bindEmail}
            />
          </Form.Group>

          <Button className="button-submit" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    }

    return <div />;
  };

  return (
    <div>
      <Jumbotron>
        <h1>User Profile</h1>
        <p>
          Welcome to Ciip {user.firstName} {user.lastName}!
        </p>
      </Jumbotron>
      <Button
        className="button-edit"
        style={edit}
        variant="primary"
        onClick={() => setMode(true)}
      >
        Edit
      </Button>
      <p />
      {renderForm()}
      <Table striped bordered hover style={table}>
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>Occupation</th>
            <td>{user.occupation}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{user.phoneNumber}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.emailAddress}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default createFragmentContainer(UserDetail, {
  user: graphql`
    fragment UserDetail_user on User {
      rowId
      firstName
      lastName
      emailAddress
      phoneNumber
      occupation
    }
  `
});
