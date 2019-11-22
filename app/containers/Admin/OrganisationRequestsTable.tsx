import React, {useEffect} from 'react';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import {OrganisationRequestsTable_query} from 'OrganisationRequestsTable_query.graphql';
import {Table, Container, Row, Col} from 'react-bootstrap';
import SortableTableHeader from '../../components/SortableTableHeader';
import SearchBox from '../../components/SearchBox';
import OrganisationRequestsTableRow from './OrganisationRequestsTableRow';
interface Props {
  query: OrganisationRequestsTable_query;
  orderByField?: string;
  orderByDisplay?: string;
  searchField?: string;
  searchValue?: string;
  direction?: string;
  searchDisplay?: string;
  handleEvent: (...args: any[]) => void;
  relay: RelayRefetchProp;
}
export const OrganisationRequestsTableComponent: React.FunctionComponent<Props> = props => {
  const {
    orderByField,
    searchField,
    searchValue,
    searchDisplay,
    direction,
    handleEvent
  } = props;

  const tableHeaders = [
    {columnName: 'user_id', displayName: 'User ID'},
    {columnName: 'first_name', displayName: 'First Name'},
    {columnName: 'last_name', displayName: 'Last Name'},
    {columnName: 'email_address', displayName: 'Email'},
    {columnName: 'status', displayName: 'Status'},
    {columnName: 'operator_name', displayName: 'Operator'}
  ];

  const dropdownSortItems = [
    'User ID',
    'First Name',
    'Last Name',
    'Email',
    'Status',
    'Operator'
  ];

  const displayNameToColumnNameMap = {
    'User ID': 'user_id',
    'First Name': 'first_name',
    'Last Name': 'last_name',
    Email: 'email_address',
    Status: 'status',
    Operator: 'operator_name'
  };

  const {edges} = props.query.searchCiipUserOrganisation;
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
      <Container>
        <Row>
          <Col md={{span: 12, offset: 6}}>
            <SearchBox
              dropdownSortItems={dropdownSortItems}
              handleEvent={handleEvent}
              displayNameToColumnNameMap={displayNameToColumnNameMap}
              searchDisplay={searchDisplay}
            />
          </Col>
        </Row>
      </Container>
      <Table
        striped
        hover
        style={{textAlign: 'center', border: '1px solid #f5f5f5'}}
      >
        <thead style={{backgroundColor: '#036', color: 'white'}}>
          <tr>
            {tableHeaders.map(header => (
              <SortableTableHeader
                key={header.columnName}
                sort={handleEvent}
                headerVariables={header}
              />
            ))}
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
        searchCiipUserOrganisation(
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
