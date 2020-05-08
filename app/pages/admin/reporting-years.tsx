import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {reportingYearsQueryResponse} from 'reportingYearsQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import ReportingYearTable from 'containers/Admin/ReportingYear/ReportingYearTable';
import {ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: reportingYearsQueryResponse['query'];
}

class ReportingYears extends Component<Props> {
  static query = graphql`
    query reportingYearsQuery {
      query {
        ...ReportingYearTable_query
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        session={query.session}
        title="Reporting Years"
        allowedGroups={ALLOWED_GROUPS}
      >
        <ReportingYearTable query={query} />
      </DefaultLayout>
    );
  }
}

export default ReportingYears;
