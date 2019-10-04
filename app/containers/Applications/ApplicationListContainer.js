import React, {useEffect} from 'react';
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
  const {
    orderByDisplay,
    searchDisplay,
    direction,
    orderByField,
    searchField,
    searchValue,
    handleEvent
  } = props;
  const {edges} = props.query.searchApplicationList;

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
                  id="sortApplications"
                  eventKey="id"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Application ID
                </Dropdown.Item>
                <Dropdown.Item
                  id="sortApplications"
                  eventKey="operator_name"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Operator Name
                </Dropdown.Item>
                <Dropdown.Item
                  id="sortApplications"
                  eventKey="facility_name"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Facility Name
                </Dropdown.Item>
                <Dropdown.Item
                  id="sortApplications"
                  eventKey="submission_date"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Submission Date
                </Dropdown.Item>
                <Dropdown.Item
                  id="sortApplications"
                  eventKey="application_status"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Status
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={1}>
            <Button
              id="toggleDirection"
              style={{width: '100%'}}
              variant="info"
              onClick={handleEvent}
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
                {searchDisplay}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{width: '100%'}}>
                <Dropdown.Item
                  id="applySearchField"
                  eventKey={null}
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  No Filter
                </Dropdown.Item>
                <Dropdown.Item
                  id="applySearchField"
                  eventKey="id"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Application ID
                </Dropdown.Item>
                <Dropdown.Item
                  id="applySearchField"
                  eventKey="operator_name"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Operator Name
                </Dropdown.Item>
                <Dropdown.Item
                  id="applySearchField"
                  eventKey="facility_name"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Facility Name
                </Dropdown.Item>
                <Dropdown.Item
                  id="applySearchField"
                  eventKey="submission_date"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Submission Date
                </Dropdown.Item>
                <Dropdown.Item
                  id="applySearchField"
                  eventKey="application_status"
                  onSelect={(eventKey, event) => handleEvent(event, eventKey)}
                >
                  Status
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={6}>
            <Form id="applySearchValue" onSubmit={event => handleEvent(event)}>
              <Form.Row>
                <Form.Group as={Col} md={8} controlId="filter">
                  <Form.Control type="string" step="0.01" />
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
      <Container>
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
                key={edge.node.id}
                ciipApplication={edge.node}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

// TODO(wenzowski): each search result node needs an ID both for react dom diffing as list key
// and also for relay to refetch
// @see https://facebook.github.io/relay/graphql/objectidentification.htm#sec-Node-Interface
// TODO: Several entitites do not have graphql ID's because they are views
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
              ...ApplicationRowItemContainer_ciipApplication
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
