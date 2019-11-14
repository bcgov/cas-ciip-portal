import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {organisationRequestsQueryResponse} from 'organisationRequestsQuery.graphql';
import DefaultLayout from '../layouts/default-layout';
import OrganisationRequestsTable from '../containers/Admin/OrganisationRequestsTable';
import SearchTable from '../components/SearchTable';

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
      <>
        <DefaultLayout title="Organisation Requests">
          <SearchTable
            query={query}
            defaultOrderByField="status"
            defaultOrderByDisplay="Status"
          >
            {props => <OrganisationRequestsTable {...props} />}
          </SearchTable>
        </DefaultLayout>
      </>
    );
  }
}

export default OrganisationRequests;
