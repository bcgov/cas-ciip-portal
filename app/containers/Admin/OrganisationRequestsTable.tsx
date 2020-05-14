import React, {useEffect} from 'react';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import {OrganisationRequestsTable_query} from 'OrganisationRequestsTable_query.graphql';
import SearchTableLayout from 'components/SearchTableLayout';
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
export const OrganisationRequestsTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {
    orderByField,
    searchField,
    searchValue,
    direction,
    handleEvent
  } = props;

  const displayNameToColumnNameMap = {
    'User ID': 'user_id',
    'First Name': 'first_name',
    'Last Name': 'last_name',
    Email: 'email_address',
    Operator: 'operator_name',
    Status: 'status',
    '': null
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
  const body = (
    <tbody>
      {edges.map((edge) => (
        <OrganisationRequestsTableRow
          key={edge.node.id}
          userOrganisation={edge.node}
        />
      ))}
    </tbody>
  );
  return (
    <SearchTableLayout
      body={body}
      displayNameToColumnNameMap={displayNameToColumnNameMap}
      handleEvent={handleEvent}
    />
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
