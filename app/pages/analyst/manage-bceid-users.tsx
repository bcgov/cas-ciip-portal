import React, { Component } from "react";
import { graphql } from "react-relay";
import { manageBceidUsersQueryResponse } from "manageBceidUsersQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import ManageBceidUserTable from "containers/User/ManageBceidUserTable";
import { INCENTIVE_ANALYST, ADMIN_GROUP } from "data/group-constants";
import { DEFAULT_PAGE_SIZE } from "components/FilterableTable/FilterableTablePagination";

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props {
  query: manageBceidUsersQueryResponse["query"];
}
class ManageBceidUsers extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query manageBceidUsersQuery(
      $first_name: String
      $last_name: String
      $email_address: String
      $order_by: [CiipUsersOrderBy!]
      $pageSize: Int
      $offset: Int
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ManageBceidUserTable_query
          @arguments(
            first_name: $first_name
            last_name: $last_name
            email_address: $email_address
            order_by: $order_by
            pageSize: $pageSize
            offset: $offset
          )
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        order_by: "LAST_NAME_ASC",
        pageSize: DEFAULT_PAGE_SIZE,
        offset: 0,
      },
    };
  }

  render() {
    const { query } = this.props;
    return (
      <DefaultLayout session={query.session} title="Manage BCeID User Access">
        <ManageBceidUserTable query={query} />
      </DefaultLayout>
    );
  }
}

export default ManageBceidUsers;
