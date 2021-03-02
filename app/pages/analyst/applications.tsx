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
      $after_cursor: Cursor
      $before_cursor: Cursor
      $num_forward: Int
      $num_back: Int
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
            after_cursor: $after_cursor
            before_cursor: $before_cursor
            num_forward: $num_forward
            num_back: $num_back
          )
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'operator_name',
        direction: 'ASC',
        num_forward: 10
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
