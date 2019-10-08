import React, {useEffect} from 'react';
import {Container, Row, Col, Dropdown} from 'react-bootstrap';
import {graphql, commitMutation, createRefetchContainer} from 'react-relay';

const setStatus = graphql`
  mutation ApplicationStatusMutation(
    $input: UpdateApplicationStatusByRowIdInput!
  ) {
    updateApplicationStatusByRowId(input: $input) {
      applicationStatus {
        rowId
      }
    }
  }
`;

const ApplicationStatus = props => {
  if (props.applicationId) props.setApplicationId(props.applicationId);

  useEffect(() => {
    const refetchVariables = {
      condition: {
        rowId: props.applicationId
      }
    };
    props.relay.refetch(refetchVariables);
  });

  // Const setApplicationStatus = (eventKey, event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.persist();
  //   // This.setState({status: eventKey});
  //   const date = new Date().toUTCString();
  //   const saveVariables = {
  //     input: {
  //       rowId: Number(props.applicationId),
  //       applicationStatusPatch: {
  //         applicationStatus: eventKey,
  //         updatedAt: date,
  //         updatedBy: 'Admin'
  //       }
  //     }
  //   };
  //   const {environment} = props.relay;
  //   const saveMutation = setStatus;
  //   commitMutation(environment, {
  //     mutation: saveMutation,
  //     variables: saveVariables,
  //     onCompleted: response => {
  //       console.log(response);
  //     },
  //     onError: err => console.error(err)
  //   });
  // };

  const {applicationStatus} = props;
  const statusBadgeColor = {
    pending: 'info',
    attention: 'warning',
    declined: 'danger',
    approved: 'success'
  };

  return (
    <>
      {/* <div>{props.}</div> */}
      {props.status ? (
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
  ApplicationStatus,
  {
    query: graphql`
      fragment ApplicationStatus_query on Query
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
    query ApplicationStatusRefetchQuery(
      $condition: ApplicationStatusCondition
    ) {
      query {
        ...ApplicationStatus_query @arguments(condition: $condition)
      }
    }
  `
);
