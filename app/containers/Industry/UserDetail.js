import React, {useState} from 'react';
import {Jumbotron, Button, Table, Form} from 'react-bootstrap';
import {graphql, commitMutation} from 'react-relay';
import {useInput} from './InputHook';

const edit = {
  width: '75px'
};
const table = {
  marginTop: '30px',
  marginBottom: '50px'
};

const UserDetail = props => {
  const [editMode, setMode] = useState(0);
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
  const updateUser = graphql`
    mutation UserDetailMutation($input: UpdateUserByRowIdInput!) {
      updateUserByRowId(input: $input) {
        user {
          rowId
        }
      }
    }
  `;
  const handleSubmit = e => {
    e.preventDefault();
    setMode(editMode - 1);
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPhone();
    resetRole();
    console.log(firstName, lastName, phone);

    const saveMutation = updateUser;
    const updateUserVariables = {
      input: {
        rowId: 0,
        UserPatch: {
          firstName,
          lastName,
          emailAddress: email,
          occupation: role,
          phoneNumber: phone
        }
      }
    };
    commitMutation(environment, {
      mutation: saveMutation,
      variables: updateUserVariables,
      onCompleted: response => {
        console.log(response);
      },
      onError: err => console.error(err)
    });
  };

  const renderForm = () => {
    if (editMode === 1) {
      return (
        <Form data-testid="form-edit" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label id="NameInput">First Name</Form.Label>
            <Form.Control
              required
              aria-labelledby="NameInput"
              name="firstName"
              type="text"
              placeholder={props.firstName}
              {...bindFirstName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder={props.lastName}
              {...bindLastName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              required
              name="role"
              type="text"
              placeholder={props.role}
              {...bindRole}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              name="phone"
              type="text"
              placeholder={props.phone}
              {...bindPhone}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder={props.email}
              {...bindEmail}
            />
          </Form.Group>

          <Button data-testid="button-submit" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    }

    return <div />;
  };

  console.log(props);
  return (
    <div>
      <Jumbotron>
        <h1>User Profile</h1>
        <p>
          Welcome to Ciip {props.firstName} {props.lastName}!
        </p>
      </Jumbotron>
      <Button
        data-testid="button-edit"
        style={edit}
        variant="primary"
        onClick={() => setMode(editMode + 1)}
      >
        Edit
      </Button>
      <p />
      {renderForm()}
      <Table striped bordered hover style={table}>
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{props.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{props.lastName}</td>
          </tr>
          <tr>
            <th>Occupation</th>
            <td>{props.role}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{props.phone}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{props.email}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserDetail;
