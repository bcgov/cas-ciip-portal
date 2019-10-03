import React, {useRef, useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {
  Container,
  Dropdown,
  Button,
  Row,
  Col,
  Form,
  Table
} from 'react-bootstrap';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';

const ApplicationListContainer = props => {
  // TODO(wenzowski): by migrating to an event switch convention, we need fewer props here
  const {
    sortApplications,
    toggleDirection,
    applyFilterField,
    applyFilterValue,
    orderByDisplay,
    filterDisplay,
    direction,
    orderByField,
    searchField,
    searchValue
  } = props;
  const {edges} = props.query.searchApplicationList;
  // TODO(wenzowski): confirm why the ref is neccessary?
  const inputref = useRef(null);

  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction
    };
    props.relay.refetch(refetchVariables);
  });

  return (
    <>
      <Container style={{padding: 10, background: '#dee2e6'}}>
        <Row>
          <Col md={2}>
            <h5>Sort Applications</h5>
          </Col>
          <Col md={2} />
          <Col md={3}>
            <h5>Filter Applications</h5>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Dropdown style={{width: '100%'}}>
              <Dropdown.Toggle
                style={{width: '100%'}}
                variant="info"
                id="dropdown-sort"
              >
                {orderByDisplay}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{width: '100%'}}>
                <Dropdown.Item
                  eventKey="application_id"
                  onSelect={sortApplications}
                >
                  Application ID
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="operator_name"
                  onSelect={sortApplications}
                >
                  Operator Name
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="facility_name"
                  onSelect={sortApplications}
                >
                  Facility Name
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="submission_date"
                  onSelect={sortApplications}
                >
                  Submission Date
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="application_status"
                  onSelect={sortApplications}
                >
                  Status
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={1}>
            <Button
              style={{width: '100%'}}
              variant="info"
              onClick={toggleDirection}
            >
              {direction}
            </Button>
          </Col>
          <Col md={1} />
          <Col md={2}>
            <Dropdown style={{width: '100%'}}>
              <Dropdown.Toggle
                style={{width: '100%'}}
                variant="info"
                id="dropdown-filter"
              >
                {filterDisplay}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{width: '100%'}}>
                <Dropdown.Item eventKey={null} onSelect={applyFilterField}>
                  No Filter
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="application_id"
                  onSelect={applyFilterField}
                >
                  Application ID
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="operator_name"
                  onSelect={applyFilterField}
                >
                  Operator Name
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="facility_name"
                  onSelect={applyFilterField}
                >
                  Facility Name
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="submission_date"
                  onSelect={applyFilterField}
                >
                  Submission Date
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="application_status"
                  onSelect={applyFilterField}
                >
                  Status
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={6}>
            <Form ref={inputref} onSubmit={applyFilterValue}>
              <Form.Row>
                <Form.Group as={Col} md={8} controlId="filter">
                  <Form.Control inputref="filter" type="string" step="0.01" />
                </Form.Group>
                <Form.Group as={Col} md={1}>
                  <Button variant="info" type="submit">
                    Filter
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Table striped bordered hover style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Operator Name</th>
            <th>Facility Name</th>
            <th>Submitted</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {edges.map(edge => (
            <ApplicationRowItemContainer
              key={edge.node.applicationId}
              application={edge.node}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};


// TODO(wenzowski): each search result node needs an ID both for react dom diffing as list key
// and also for relay to refetch
// @see https://facebook.github.io/relay/graphql/objectidentification.htm#sec-Node-Interface
export default createRefetchContainer(
  ApplicationListContainer,
  {
    query: graphql`
      fragment ApplicationListContainer_query on Query
        @argumentDefinitions(
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
        ) {
        searchApplicationList(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) {
          edges {
            node {
              applicationId
              facilityName
              operatorName
              applicationStatus
              submissionDate
              reportingYear
              bcghgid
            }
          }
        }
      }
    `
  },
  graphql`
    query ApplicationListContainerRefetchQuery(
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
    ) {
      query {
        ...ApplicationListContainer_query
          @arguments(
            searchField: $searchField
            searchValue: $searchValue
            orderByField: $orderByField
            direction: $direction
          )
      }
    }
  `
);
