import React from 'react'
import {Accordion, Card, Button, Container, Row, Col} from 'react-bootstrap'
import {graphql, QueryRenderer} from "react-relay";
import initEnvironment from '../lib/createRelayEnvironment'
const environment = initEnvironment();

const renderQuery = ({error, props}) => {
    if (error) {
        return <div>error</div>;
    } else if (props) {
        console.log('me', props)
        return (
            <React.Fragment>
                <Accordion defaultActiveKey="0">
                    {props.allUsers.edges.map( ({node}) => {
                        return (
                            <Card key={node.id}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={node.id}>
                                        {node.firstName}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={node.id}>
                                    <Card.Body>{node.lastName}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
                </Accordion>
            </React.Fragment>
        )
    }
    return <div>Loading</div>;
}

const UserList = props => {
  return (
      <React.Fragment>
          <h3>Users</h3>
          <p>Data loaded from the GGIRCS portal schema</p>
          <br/>

          <QueryRenderer
              environment={environment}
              query={graphql`
                     query UserListQuery{
                         allUsers{
                            pageInfo{
                              hasNextPage
                              hasPreviousPage
                              startCursor
                              endCursor
                            }
                            edges{
                              node{
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
      </React.Fragment>
  )
}



export default UserList