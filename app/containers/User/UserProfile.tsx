import React, {useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import UserForm from './UserForm';

const edit = {
  width: '75px'
};
const table = {
  marginTop: '30px',
  marginBottom: '50px'
};

export const UserProfile = ({user}) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <Button
        className="button-edit"
        style={edit}
        variant="primary"
        onClick={() => setEditMode(true)}
      >
        Edit
      </Button>
      <p />
      {editMode && <UserForm user={user} onSubmit={() => setEditMode(false)} />}
      {!editMode && (
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
      )}
    </div>
  );
};

export default createFragmentContainer(UserProfile, {
  user: graphql`
    fragment UserProfile_user on User {
      ...UserForm_user
      firstName
      lastName
      emailAddress
      phoneNumber
      occupation
    }
  `
});
