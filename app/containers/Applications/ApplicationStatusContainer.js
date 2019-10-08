import React, {useEffect} from 'react';
import {Container, Row, Col, Dropdown} from 'react-bootstrap';
import {graphql, commitMutation, createRefetchContainer} from 'react-relay';

const setStatus = graphql`
  mutation ApplicationStatusContainerMutation(
    $input: UpdateApplicationStatusByRowIdInput!
  ) {
    updateApplicationStatusByRowId(input: $input) {
      applicationStatus {
        rowId
        applicationStatus
      }
    }
  }
`;

const ApplicationStatusContainer = props => {
  // Set applicationId to state in parent component
  if (props.applicationId) props.setApplicationId(props.applicationId);
  // Set applicationStatus to state in parent component
  if (!props.status && props.query.allApplicationStatuses.edges.length === 1)
    props.setApplicationStatusInState(
      props.query.allApplicationStatuses.edges[0].node.applicationStatus
    );
  let applicationStatus = props.status;
  useEffect(() => {
    const refetchVariables = {
      condition: {
        formResultId: Number(props.applicationId)
      }
    };
    props.relay.refetch(refetchVariables);
  });

  // Save Application status to database
  const setApplicationStatus = (eventKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();

    const date = new Date().toUTCString();
    const saveVariables = {
      input: {
        rowId: Number(props.applicationId),
        applicationStatusPatch: {
          applicationStatus: eventKey,
          updatedAt: date,
          updatedBy: 'Admin'
        }
      }
    };
    const {environment} = props.relay;
    const saveMutation = setStatus;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveVariables,
      onCompleted: response => {
        console.log(response);
        props.setApplicationStatusInState(eventKey);
        applicationStatus = eventKey;
      },
      onError: err => console.error(err)
    });
  };

  // Dropdown color changes for statuses
  const statusBadgeColor = {
    pending: 'info',
    attention: 'warning',
    declined: 'danger',
    approved: 'success'
  };

  return (
    <>
      {props.query.allApplicationStatuses.edges.length === 1 ? (
        <Container>
          <Row>
            <Col md={3}>
              <h3>Application Status: </h3>
            </Col>
            <Col md={2}>
              <Dropdown style={{width: '100%'}}>
                <Dropdown.Toggle
                  style={{width: '100%', textTransform: 'capitalize'}}
                  variant={statusBadgeColor[applicationStatus]}
                  id="dropdown"
                >
                  {applicationStatus}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{width: '100%'}}>
                  <Dropdown.Item
                    eventKey="approved"
                    onSelect={setApplicationStatus}
                  >
                    Approved
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="declined"
                    onSelect={setApplicationStatus}
                  >
                    Declined
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="attention"
                    onSelect={setApplicationStatus}
                  >
                    Attention
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="pending"
                    onSelect={setApplicationStatus}
                  >
                    Pending
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      ) : null}
    </>
  );
};

export default createRefetchContainer(
  ApplicationStatusContainer,
  {
    query: graphql`
      fragment ApplicationStatusContainer_query on Query
        @argumentDefinitions(condition: {type: "ApplicationStatusCondition"}) {
        allApplicationStatuses(condition: $condition) {
          edges {
            node {
              rowId
              applicationStatus
            }
          }
        }
      }
    `
  },
  graphql`
    query ApplicationStatusContainerRefetchQuery(
      $condition: ApplicationStatusCondition
    ) {
      query {
        ...ApplicationStatusContainer_query @arguments(condition: $condition)
      }
    }
  `
);
