import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import {OrganisationRequestsTable_query} from 'OrganisationRequestsTable_query.graphql';
import SearchTableLayout from '../../components/SearchTableLayout';
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
    {eventKey: 'email_address', title: 'Email'},
    {eventKey: 'status', title: 'Status'},
    {eventKey: 'operator_name', title: 'Operator'}
  ];
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
      <SearchTableLayout
        orderByDisplay={orderByDisplay}
        searchDisplay={searchDisplay}
        handleEvent={handleEvent}
        dropdownSortItems={dropdownSortItems}
        direction={direction}
      />
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Operator Requested</th>
            <th>Status</th>
            <th>Action</th>
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
