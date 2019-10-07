import React from 'react';
import {Accordion, Card, Button} from 'react-bootstrap';
import {graphql, QueryRenderer} from 'react-relay';
// Import initEnvironment from '../lib/createRelayEnvironment';

// const environment = initEnvironment();

const renderQuery = ({error, props}) => {
  if (error) {
    return <div>error</div>;
  }

  if (props) {
    console.log('me', props);
    return (
      <>
        <Accordion defaultActiveKey="0">
          {props.allUsers.edges.map(({node}) => {
            return (
              <Card key={node.id}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={node.id}
                  >
                    {node.firstName}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={node.id}>
                  <Card.Body>{node.lastName}</Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
      </>
    );
  }

  return <div>Loading</div>;
};

const UserList = props => {
  const {environment} = props.relay;
  return (
    <>
      <h3>Users</h3>
      <p>Data loaded from the GGIRCS portal schema</p>
      <br />

      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserListQuery {
            allUsers {
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                node {
                  id
                  firstName
                  lastName
                }
              }
            }
          }
        `}
        render={renderQuery}
      />
    </>
  );
};

export default UserList;
