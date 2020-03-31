import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {organisationRequestsQueryResponse} from 'organisationRequestsQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import OrganisationRequestsTable from 'containers/Admin/OrganisationRequestsTable';
import SearchTable from 'components/SearchTable';
import {ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: organisationRequestsQueryResponse['query'];
}
class OrganisationRequests extends Component<Props> {
  static query = graphql`
    query organisationRequestsQuery(
      $orderByField: String
      $direction: String
      $searchField: String
      $searchValue: String
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...OrganisationRequestsTable_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
          )
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'status',
        direction: 'ASC'
      }
    };
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        session={query.session}
        title="Organisation Requests"
        allowedGroups={ALLOWED_GROUPS}
      >
        <SearchTable
          query={query}
          defaultOrderByField="status"
          defaultOrderByDisplay="Status"
        >
          {props => <OrganisationRequestsTable {...props} />}
        </SearchTable>
      </DefaultLayout>
    );
  }
}

export default OrganisationRequests;
