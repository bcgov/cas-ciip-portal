import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationsQueryResponse} from 'applicationsQuery.graphql';
import ApplicationListContainer from 'containers/Applications/ApplicationListContainer';
import DefaultLayout from 'layouts/default-layout';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';
import {DEFAULT_PAGE_SIZE} from 'components/FilterableTable/FilterableTablePagination';

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
      $pageSize: Int
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
      <DefaultLayout title="Applications" session={query.session}>
        <ApplicationListContainer query={query} />
      </DefaultLayout>
    );
  }
}

export default Applications;
