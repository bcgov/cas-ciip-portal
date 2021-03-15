import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {OrganisationRequestsTable_query} from 'OrganisationRequestsTable_query.graphql';
import {CiipUserOrganisationStatus} from 'OrganisationRequestsTableRow_userOrganisation.graphql';
import OrganisationRequestsTableRow from './OrganisationRequestsTableRow';
import {
  TableFilter,
  TextFilter,
  NumberFilter,
  EnumFilter,
  NoHeaderFilter
} from 'components/FilterableTable/Filters';
import FilterableTable from 'components/FilterableTable/FilterableTable';

interface Props {
  query: OrganisationRequestsTable_query;
}

const filters: TableFilter[] = [
  new NumberFilter('User ID', 'user_id'),
  new TextFilter('First Name', 'first_name'),
  new TextFilter('Last Name', 'last_name'),
  new TextFilter('Email', 'email_address'),
  new TextFilter('Operator', 'operator_name'),
  new EnumFilter<CiipUserOrganisationStatus>('Status', 'status', [
    'APPROVED',
    'PENDING',
    'REJECTED'
  ]),
  NoHeaderFilter
];

export const OrganisationRequestsTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {edges, totalCount} = props.query.allCiipUserOrganisations;

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
    <FilterableTable
      body={body}
      filters={filters}
      paginated
      totalCount={totalCount}
    />
  );
};

export default createFragmentContainer(OrganisationRequestsTableComponent, {
  query: graphql`
    fragment OrganisationRequestsTable_query on Query
    @argumentDefinitions(
      user_id: {type: "Int"}
      first_name: {type: "String"}
      last_name: {type: "String"}
      email_address: {type: "String"}
      operator_name: {type: "String"}
      status: {type: "CiipUserOrganisationStatus"}
      order_by: {type: "[CiipUserOrganisationsOrderBy!]"}
      pageSize: {type: "Int"}
      offset: {type: "Int"}
    ) {
      allCiipUserOrganisations(
        first: $pageSize
        offset: $offset
        filter: {
          userId: {equalTo: $user_id}
          firstName: {includesInsensitive: $first_name}
          lastName: {includesInsensitive: $last_name}
          emailAddress: {includesInsensitive: $email_address}
          operatorName: {includesInsensitive: $operator_name}
          status: {equalTo: $status}
        }
        orderBy: $order_by
      ) {
        edges {
          node {
            id
            ...OrganisationRequestsTableRow_userOrganisation
          }
        }
        totalCount
      }
    }
  `
});
