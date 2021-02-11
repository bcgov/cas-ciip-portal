import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
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
}
export const OrganisationRequestsTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {handleEvent} = props;

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

export default createFragmentContainer(OrganisationRequestsTableComponent, {
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
});
