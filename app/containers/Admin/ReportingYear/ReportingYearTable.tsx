import React, {useState} from 'react';
import {Table, Button} from 'react-bootstrap';
import moment from 'moment-timezone';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ReportingYearTable_query} from '__generated__/ReportingYearTable_query.graphql';
import updateReportingYearMutation from 'mutations/reporting_year/updateReportingYearMutation';
import ReportingYearFormDialog from './ReportingYearFormDialog';

interface Props {
  relay: RelayProp;
  query: ReportingYearTable_query;
}

function formatListViewDate(date) {
  return moment.tz(date, 'America/Vancouver').format('MMM D, YYYY');
}

function isoToLocaleDate(timestamptz) {
  return moment.tz(timestamptz, 'America/Vancouver').format('YYYY-MM-DD');
}

function isoToLocaleTime(timestamptz) {
  return moment.tz(timestamptz, 'America/Vancouver').format('LT');
}

function localeDateTimeToISO(date, time) {
  return moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm a').toISOString();
}

export const ReportingYearTableComponent: React.FunctionComponent<Props> = props => {
  const [editingYear, setEditingYear] = useState(null);

  const {query, relay} = props;
  if (!query.allReportingYears || !query.allReportingYears.edges) {
    return <div />;
  }

  const clearForm = () => setEditingYear(null);

  const editYear = node => setEditingYear(node);

  const displayFormFields = (node) => {
    if(!node) return null
    return {
      applicationOpenDate: isoToLocaleDate(node.applicationOpenTime),
      applicationOpenTime: isoToLocaleTime(node.applicationOpenTime),
      applicationCloseDate: isoToLocaleDate(node.applicationCloseTime),
      applicationCloseTime: isoToLocaleTime(node.applicationCloseTime),
      applicationResponseTime: isoToLocaleDate(node.applicationResponseTime)
    }
  };

  const saveReportingYear = ({formData}) => {
    const finalData = {
      applicationOpenTime: localeDateTimeToISO(
        formData.applicationOpenDate,
        formData.applicationOpenTime
      ),
      applicationCloseTime: localeDateTimeToISO(
        formData.applicationCloseDate,
        formData.applicationCloseTime
      ),
      applicationResponseTime: moment(
        formData.applicationResponseTime,
        'YYYY-MM-DD'
      ).toISOString()
    };

    updateReportingYearMutation(relay.environment, {
      input: {
        id: editingYear.id,
        reportingYearPatch: {
          ...finalData
        }
      }
    })
    .then(clearForm);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Reporting Year</th>
            <th scope="col">Reporting Period Start</th>
            <th scope="col">Reporting Period End</th>
            <th scope="col">Application Open Time</th>
            <th scope="col">Application Close Time</th>
            <th scope="col">Application Response Time</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {query.allReportingYears.edges.map(({node}) => {
            return (
              <tr key={node.id}>
                <td>{node.reportingYear}</td>
                <td>{formatListViewDate(node.reportingPeriodStart)}</td>
                <td>{formatListViewDate(node.reportingPeriodEnd)}</td>
                <td>{formatListViewDate(node.applicationOpenTime)}</td>
                <td>{formatListViewDate(node.applicationCloseTime)}</td>
                <td>{formatListViewDate(node.applicationResponseTime)}</td>
                <td>
                  <Button onClick={() => editYear(node)}>Edit</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReportingYearFormDialog
        show={Boolean(editingYear)}
        year={editingYear?.reportingYear}
        formFields={displayFormFields(editingYear)}
        clearForm={clearForm}
        saveReportingYear={saveReportingYear}
      />
    </>
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
