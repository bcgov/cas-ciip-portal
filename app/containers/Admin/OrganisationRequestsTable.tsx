import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {OrganisationRequestsTable_query} from 'OrganisationRequestsTable_query.graphql';
import {CiipUserOrganisationStatus} from 'OrganisationRequestsTableRow_userOrganisation.graphql';
import OrganisationRequestsTableRow from './OrganisationRequestsTableRow';
import {ISearchOption} from 'components/Search/ISearchOption';
import {NoHeaderSearchOption} from 'components/Search/NoHeaderSearchOption';
import {TextSearchOption} from 'components/Search/TextSearchOption';
import {NumberSearchOption} from 'components/Search/NumberSearchOption';
import {EnumSearchOption} from 'components/Search/EnumSearchOption';
import FilterableTableLayoutComponent from 'components/FilterableComponents/FilterableTableLayout';
interface Props {
  query: OrganisationRequestsTable_query;
}
export const OrganisationRequestsTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  const searchOptions: ISearchOption[] = [
    new NumberSearchOption('User ID', 'user_id'),
    new TextSearchOption('First Name', 'first_name'),
    new TextSearchOption('Last Name', 'last_name'),
    new TextSearchOption('Email', 'email_address'),
    new TextSearchOption('Operator', 'operator_name'),
    new EnumSearchOption<CiipUserOrganisationStatus>('Status', 'status', [
      'APPROVED',
      'PENDING',
      'REJECTED'
    ]),
    NoHeaderSearchOption
  ];

  const {edges} = props.query.allCiipUserOrganisations;

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
    <FilterableTableLayoutComponent body={body} searchOptions={searchOptions} />
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
    ) {
      allCiipUserOrganisations(
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
      }
    }
  `
});
