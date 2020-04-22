import React from 'react';
import {Table} from 'react-bootstrap';
import moment from 'moment-timezone';
import {graphql, createFragmentContainer} from 'react-relay';
import {ReportingYearTable_query} from '__generated__/ReportingYearTable_query.graphql';

interface Props {
  query: ReportingYearTable_query;
}

function formatDate(date) {
  return moment.tz(date, 'America/Vancouver').format('MMM D, YYYY');
}

export const ReportingYearTableComponent: React.FunctionComponent<Props> = props => {
  const {query} = props;
  if (!query.allReportingYears || !query.allReportingYears.edges) {
    return <div />;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Reporting Year</th>
            <th scope="col">Reporting Period Start</th>
            <th scope="col">Reporting Period End</th>
            <th scope="col">Application Open Time</th>
            <th scope="col">Application Close Time</th>
            <th scope="col">Application Response Time</th>
          </tr>
        </thead>
        <tbody>
          {query.allReportingYears.edges.map(({node}) => {
            return (
              <tr key={node.id}>
                <td>{node.reportingYear}</td>
                <td>{formatDate(node.reportingPeriodStart)}</td>
                <td>{formatDate(node.reportingPeriodEnd)}</td>
                <td>{formatDate(node.applicationOpenTime)}</td>
                <td>{formatDate(node.applicationCloseTime)}</td>
                <td>{formatDate(node.applicationResponseTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default createFragmentContainer(ReportingYearTableComponent, {
  query: graphql`
    fragment ReportingYearTable_query on Query {
      allReportingYears {
        edges {
          node {
            id
            reportingYear
            reportingPeriodStart
            reportingPeriodEnd
            applicationOpenTime
            applicationCloseTime
            applicationResponseTime
          }
        }
      }
    }
  `
});
