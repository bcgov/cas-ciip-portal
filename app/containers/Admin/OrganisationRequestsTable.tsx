import React, {useEffect} from 'react';
import {
  Table,
  Container,
  Dropdown,
  Button,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import {OrganisationRequestsTable_query} from '__generated__/OrganisationRequestsTable_query.graphql';
import DropdownMenuItemComponent from '../../components/DropdownMenuItemComponent';
import OrganisationRequestsTableRow from './OrganisationRequestsTableRow';
interface Props {
  query: OrganisationRequestsTable_query;
  orderByField: string;
  orderByDisplay: string;
  searchField: string;
  searchValue: string;
  direction: string;
  searchDisplay: string;
  handleEvent: (...args: any[]) => void;
  relay: RelayRefetchProp;
}
export const OrganisationRequestsTableComponent: React.FunctionComponent<
  Props
> = props => {
  const {
    orderByField,
    orderByDisplay,
    searchField,
    searchValue,
    searchDisplay,
    direction,
    handleEvent
  } = props;
  const dropdownSortItems = [
    {eventKey: 'user_id', title: 'User ID'},
    {eventKey: 'first_name', title: 'First Name'},
    {eventKey: 'last_name', title: 'Last Name'},
    {eventKey: 'status', title: 'Status'},
    {eventKey: 'operator_name', title: 'Operator'}
  ];
  const {edges} = props.query.searchUserOrganisation;
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
      <Container style={{padding: 20, background: '#dee2e6'}}>
        <Row>
          <Col md={3}>
            <h5>Sort User Requests</h5>
          </Col>
          <Col md={1} />
          <Col md={3}>
            <h5>Filter User Requests</h5>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Dropdown style={{width: '100%'}}>
              <Dropdown.Toggle
                style={{width: '100%', backgroundColor: '#036'}}
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
              style={{width: '100%', backgroundColor: '#036'}}
              onClick={event => handleEvent(event)}
            >
              {direction}
            </Button>
          </Col>
          <Col md={1} />
          <Col md={2}>
            <Dropdown style={{width: '100%'}}>
              <Dropdown.Toggle
                style={{width: '100%', backgroundColor: '#036'}}
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
                    itemTitle={item.title}
                    itemFunc={(eventKey, event) => handleEvent(event, eventKey)}
                  />
                ))}
                ;
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={6}>
            <Form id="applySearchValue" onSubmit={event => handleEvent(event)}>
              <Form.Row>
                <Form.Group as={Col} md={8}>
                  <Form.Control type="string" />
                </Form.Group>
                <Form.Group as={Col} md={1}>
                  <Button type="submit" style={{backgroundColor: '#036'}}>
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
      <Table
        striped
        hover
        style={{textAlign: 'center', border: '1px solid #f5f5f5'}}
      >
        <thead style={{backgroundColor: '#036', color: 'white'}}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Operator Requested</th>
            <th>Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {edges.map(edge => (
            <OrganisationRequestsTableRow
              key={edge.node.id}
              userOrganisation={edge.node}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default createRefetchContainer(
  OrganisationRequestsTableComponent,
  {
    query: graphql`
      fragment OrganisationRequestsTable_query on Query
        @argumentDefinitions(
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
        ) {
        searchUserOrganisation(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) {
          edges {
            node {
              id
              ...OrganisationRequestsTableRow_userOrganisation
            }
          }
        }
      }
    `
  },
  graphql`
    query OrganisationRequestsTableRefetchQuery(
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
    ) {
      query {
        ...OrganisationRequestsTable_query
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
