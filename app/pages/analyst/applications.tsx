import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationsQueryResponse} from 'applicationsQuery.graphql';
import ApplicationListContainer from 'containers/Applications/ApplicationListContainer';
import DefaultLayout from 'layouts/default-layout';
import SearchTable from 'components/SearchTable';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props {
  query: applicationsQueryResponse['query'];
}

class Applications extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  // In downstream component
  // onClick={(event) => handleApplicationsAction({action: Applications.SORT_ACTION})})
  // I didn't fully understand how to make this work, so I moved on with the way I did.
  static query = graphql`
    query applicationsQuery(
      $row_id: Int
      $operator_name: String
      $facility_name: String
      $reporting_year: Int
      $submission_date: Datetime
      $status: String
      $order_by: [ApplicationsOrderBy!]
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationListContainer_query
          @arguments(
            row_id: $row_id
            operator_name: $operator_name
            facility_name: $facility_name
            reporting_year: $reporting_year
            submission_date: $submission_date
            status: $status
            order_by: $order_by
          )
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'operator_name',
        direction: 'ASC'
      }
    };
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout title="Applications" session={query.session}>
        <SearchTable
          query={query}
          defaultOrderByField="operator_name"
          defaultOrderByDisplay="Operator Name"
        >
          {(props) => <ApplicationListContainer {...props} />}
        </SearchTable>
      </DefaultLayout>
    );
  }
}

export default Applications;
