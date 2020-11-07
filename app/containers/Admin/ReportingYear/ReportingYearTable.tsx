import React, {useState, useMemo} from 'react';
import {Table, Button} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ReportingYearTable_query} from '__generated__/ReportingYearTable_query.graphql';
import updateReportingYearMutation from 'mutations/reporting_year/updateReportingYearMutation';
import createReportingYearMutation from 'mutations/reporting_year/createReportingYearMutation';
import ReportingYearFormDialog from './ReportingYearFormDialog';
import NewReportingYearFormDialog from './NewReportingYearFormDialog';
import {nowMoment, defaultMoment, dateTimeFormat} from 'functions/formatDates';
import {validateExclusiveApplicationWindow} from 'containers/Admin/ReportingYear/reportingYearValidation';

interface Props {
  relay: RelayProp;
  query: ReportingYearTable_query;
}

function formatListViewDate(date: string) {
  return dateTimeFormat(date, 'days_string');
}

function isDatePast(date: string) {
  const d = defaultMoment(date);
  const now = nowMoment();
  return d.isBefore(now);
}

export const ReportingYearTableComponent: React.FunctionComponent<Props> = (
  props
) => {
  const [editingYear, setEditingYear] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const {query, relay} = props;
  if (!query.allReportingYears || !query.allReportingYears.edges) {
    return <div />;
  }

  const existingYearKeys = query.allReportingYears.edges.map((edge) => {
    return edge.node.reportingYear;
  });

  const applicationWindowValidator = useMemo(() => {
    return (year, formData, errors) => {
      return validateExclusiveApplicationWindow(
        year,
        props.query.allReportingYears.edges,
        formData,
        errors
      );
    };
  }, [props.query.allReportingYears]);

  const clearForm = () => {
    setDialogMode(null);
    setEditingYear(null);
  };

  const editYear = (node) => {
    setEditingYear(node);
    setDialogMode('edit');
  };

  const saveReportingYear = async (formData) => {
    await updateReportingYearMutation(relay.environment, {
      input: {
        id: editingYear.id,
        reportingYearPatch: {
          ...formData
        }
      }
    });
    clearForm();
  };

  const createReportingYear = async (formData) => {
    await createReportingYearMutation(relay.environment, {
      input: {
        reportingYear: {
          ...formData
        }
      }
    });
    clearForm();
  };

  return (
    <>
      <div style={{textAlign: 'right'}}>
        <Button
          style={{marginTop: '-220px'}}
          onClick={() => setDialogMode('create')}
        >
          New Reporting Year
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Reporting Year</th>
            <th scope="col">Reporting Period Start</th>
            <th scope="col">Reporting Period End</th>
            <th scope="col">Industrial GHG Reporting (SWRS) Deadline</th>
            <th scope="col">Application Open Time</th>
            <th scope="col">Application Close Time</th>
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
                <td>{formatListViewDate(node.swrsDeadline)}</td>
                <td>{formatListViewDate(node.applicationOpenTime)}</td>
                <td>{formatListViewDate(node.applicationCloseTime)}</td>
                <td>
                  {!isDatePast(node.applicationCloseTime) && (
                    <Button onClick={() => editYear(node)}>Edit</Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <NewReportingYearFormDialog
        show={dialogMode === 'create'}
        createReportingYear={createReportingYear}
        clearForm={clearForm}
        existingYearKeys={existingYearKeys}
        validateExclusiveApplicationWindow={applicationWindowValidator}
      />
      <ReportingYearFormDialog
        show={dialogMode === 'edit'}
        year={editingYear?.reportingYear}
        formFields={editingYear}
        clearForm={clearForm}
        saveReportingYear={saveReportingYear}
        validateExclusiveApplicationWindow={applicationWindowValidator}
      />
    </>
  );
};

export default createFragmentContainer(ReportingYearTableComponent, {
  query: graphql`
    fragment ReportingYearTable_query on Query {
      allReportingYears(orderBy: REPORTING_YEAR_DESC) {
        edges {
          node {
            id
            reportingYear
            reportingPeriodStart
            reportingPeriodEnd
            swrsDeadline
            applicationOpenTime
            applicationCloseTime
          }
        }
      }
    }
  `
});
