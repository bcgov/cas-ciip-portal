import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationsQueryResponse} from 'applicationsQuery.graphql';
import ApplicationListContainer from 'containers/Applications/ApplicationListContainer';
import DefaultLayout from 'layouts/default-layout';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props {
  query: applicationsQueryResponse['query'];
}

class Applications extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query applicationsQuery(
      $id: Int
      $operator_name: String
      $facility_name: String
      $reporting_year: Int
      $submission_date: Datetime
      $status: CiipApplicationRevisionStatus
      $order_by: [ApplicationsOrderBy!]
      $max_results: Int
      $offset: Int
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationListContainer_query
          @arguments(
            id: $id
            operator_name: $operator_name
            facility_name: $facility_name
            reporting_year: $reporting_year
            submission_date: $submission_date
            status: $status
            order_by: $order_by
            max_results: $max_results
            offset: $offset
          )
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'operator_name',
        direction: 'ASC',
        max_results: 10,
        offset: 0
      }
    };
  }

  render() {
    const {query} = this.props;
    /** maxResultsPerPage matches the value of max_results in getInitialProps().
     *  max_results is passed to the initial query via the router
     *  maxResultsPerPage is passed as a prop to aid in rendering the correct number of pages in the FilterableTablePagination component
     **/
    const maxResultsPerPage = 10;
    return (
      <DefaultLayout title="Applications" session={query.session}>
        <ApplicationListContainer
          query={query}
          maxResultsPerPage={maxResultsPerPage}
        />
      </DefaultLayout>
    );
  }
}

export default Applications;
