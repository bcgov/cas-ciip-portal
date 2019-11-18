import React from 'react';
import {Table} from 'react-bootstrap';
import {graphql, createFragmentContainer} from 'react-relay';
import {UserTable_query} from '__generated__/UserTable_query.graphql';
interface Props {
  query: UserTable_query;
}
export const UserTableComponent: React.FunctionComponent<Props> = props => {
  const {query} = props;
  if (!query.allCiipUsers || !query.allCiipUsers.edges) {
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
          {query.allCiipUsers.edges.map(({node}) => {
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
      allCiipUsers {
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
