import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {organisationRequestsQueryResponse} from 'organisationRequestsQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import OrganisationRequestsTable from 'containers/Admin/OrganisationRequestsTable';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';
import {DEFAULT_PAGE_SIZE} from 'components/FilterableTable/FilterableTablePagination';

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props {
  query: organisationRequestsQueryResponse['query'];
}
class OrganisationRequests extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query organisationRequestsQuery(
      $user_id: Int
      $first_name: String
      $last_name: String
      $email_address: String
      $operator_name: String
      $status: CiipUserOrganisationStatus
      $order_by: [CiipUserOrganisationsOrderBy!]
      $pageSize: Int
      $offset: Int
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...OrganisationRequestsTable_query
          @arguments(
            user_id: $user_id
            first_name: $first_name
            last_name: $last_name
            email_address: $email_address
            operator_name: $operator_name
            status: $status
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
        order_by: 'OPERATOR_NAME_ASC',
        pageSize: DEFAULT_PAGE_SIZE,
        offset: 0
      }
    };
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout session={query.session} title="Operation Access Requests">
        <OrganisationRequestsTable query={query} />
      </DefaultLayout>
    );
  }
}

export default OrganisationRequests;
