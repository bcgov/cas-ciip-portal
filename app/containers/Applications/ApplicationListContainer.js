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
import DropdownMenuItemComponent from '../../components/DropdownMenuItemComponent';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';

export const ApplicationListContainer = props => {
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

  const dropdownSortItems = [
    {eventKey: 'id', title: 'Application ID'},
    {eventKey: 'operator_name', title: 'Operator Name'},
    {eventKey: 'facility_name', title: 'Facility Name'},
    {eventKey: 'submission_date', title: 'Submission Date'},
    {eventKey: 'application_status', title: 'Status'}
  ];

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
                {dropdownSortItems.map(item => (
                  <DropdownMenuItemComponent
                    key={item.eventKey}
                    itemId="sortApplications"
                    itemEventKey={item.eventKey}
                    itemFunc={(eventKey, event) => handleEvent(event, eventKey)}
                    itemTitle={item.title}
                  />
                ))}
                ;
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
                {[
                  {eventKey: null, title: 'No Filter'},
                  ...dropdownSortItems
                ].map(item => (
                  <DropdownMenuItemComponent
                    key={item.eventKey}
                    itemId="applySearchField"
                    itemEventKey={item.eventKey}
                    itemFunc={(eventKey, event) => handleEvent(event, eventKey)}
                    itemTitle={item.title}
                  />
                ))}
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
              id
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
