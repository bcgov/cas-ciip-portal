import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {NextRouter} from 'next/router';
import {CiipPageComponentProps} from 'next-env';
import {requestsQueryResponse} from 'requestsQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';
// Import CertificationRequestsTable from 'containers/Certifier/CertificationRequestsTable';
import SearchTable from 'components/SearchTable';
import CertificationRequestsContainer from 'containers/Certifier/CertificationRequestsContainer';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: requestsQueryResponse['query'];
  router: NextRouter;
}

export default class CertifierRequests extends Component<Props> {
  static query = graphql`
    query requestsQuery(
      $searchField: [String]
      $searchValue: [String]
      $orderByField: String
      $direction: String
      $offsetValue: Int
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...CertificationRequestsContainer_query
          @arguments(
            searchField: $searchField
            searchValue: $searchValue
            orderByField: $orderByField
            direction: $direction
            offsetValue: $offsetValue
          )
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'facility_name',
        direction: 'ASC',
        offsetValue: 0
      }
    };
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        title="Certification Requests"
        session={query.session}
        allowedGroups={ALLOWED_GROUPS}
      >
        {/* <CertificationRequestsTable query={query.session.ciipUserBySub} /> */}
        <SearchTable
          query={this.props.query}
          defaultOrderByField="facility_name"
          defaultOrderByDisplay="Facility"
        >
          {(props) => <CertificationRequestsContainer {...props} />}
        </SearchTable>
      </DefaultLayout>
    );
  }
}
