import React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { ManageBceidUserTable_query } from "ManageBceidUserTable_query.graphql";
import ManageBceidUserTableRow from "./ManageBceidUserTableRow";
import {
  TableFilter,
  TextFilter,
  DisplayOnlyFilter,
  NoHeaderFilter,
} from "components/FilterableTable/Filters";
import FilterableTable from "components/FilterableTable/FilterableTable";

interface Props {
  query: ManageBceidUserTable_query;
}

const filters: TableFilter[] = [
  new TextFilter("First Name", "first_name"),
  new TextFilter("Last Name", "last_name"),
  new TextFilter("Email", "email_address"),
  new DisplayOnlyFilter("View Access Requests"),
  new NoHeaderFilter(),
];

export const ManageBceidUserTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { edges, totalCount } = props.query.allCiipUsers;

  const body = (
    <tbody>
      {edges.map((edge) => (
        <ManageBceidUserTableRow key={edge.node.id} user={edge.node} />
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

export default createFragmentContainer(ManageBceidUserTableComponent, {
  query: graphql`
    fragment ManageBceidUserTable_query on Query
    @argumentDefinitions(
      first_name: { type: "String" }
      last_name: { type: "String" }
      email_address: { type: "String" }
      order_by: { type: "[CiipUsersOrderBy!]" }
      pageSize: { type: "Int" }
      offset: { type: "Int" }
    ) {
      allCiipUsers(
        first: $pageSize
        offset: $offset
        filter: {
          uuid: { notIncludesInsensitive: "idir" }
          firstName: { includesInsensitive: $first_name }
          lastName: { includesInsensitive: $last_name }
          emailAddress: { includesInsensitive: $email_address }
        }
        orderBy: $order_by
      ) {
        edges {
          node {
            id
            ...ManageBceidUserTableRow_user
          }
        }
        totalCount
      }
    }
  `,
});
