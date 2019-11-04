import React from 'react';
import {Table} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';

export const UserTableComponent = props => {
  const {query} = props;
  if (!query.allUsers || !query.allUsers.edges) {
    return <div />;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Occupation</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {query.allUsers.edges.map(({node}) => {
            return (
              <tr key={node.id}>
                <td>{node.rowId}</td>
                <td>{node.firstName}</td>
                <td>{node.lastName}</td>
                <td>{node.occupation}</td>
                <td>{node.emailAddress}</td>
                <td>{node.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default createFragmentContainer(UserTableComponent, {
  query: graphql`
    fragment UserTable_query on Query {
      allUsers {
        edges {
          node {
            id
            rowId
            firstName
            lastName
            occupation
            emailAddress
            phoneNumber
          }
        }
      }
    }
  `
});
