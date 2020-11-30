import React, {useState, useMemo} from 'react';
import {Table, Button} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ReportingYearTable_query} from '__generated__/ReportingYearTable_query.graphql';
import updateReportingYearMutation from 'mutations/reporting_year/updateReportingYearMutation';
import createReportingYearMutation from 'mutations/reporting_year/createReportingYearMutation';
import ReportingYearFormDialog from './ReportingYearFormDialog';
import NewReportingYearFormDialog from './NewReportingYearFormDialog';
import {nowMoment, defaultMoment, dateTimeFormat} from 'functions/formatDates';
import {validateExclusiveDateRanges} from 'containers/Admin/ReportingYear/reportingYearValidation';

interface Props {
  relay: RelayProp;
  query: ReportingYearTable_query;
}

function formatListViewDate(date: string) {
  return dateTimeFormat(date, 'days_string');
}

function getMostRecentlyClosedYear(query) {
  const orderedByCloseTimeDesc = query.allReportingYears.edges
    .slice()
    .sort((yearA, yearB) => {
      const yearACloseTime = defaultMoment(yearA.node.applicationCloseTime);
      const yearBCloseTime = defaultMoment(yearB.node.applicationCloseTime);
      let sortOrder = yearACloseTime === yearBCloseTime ? 0 : 1;
      if (yearBCloseTime.isBefore(yearACloseTime)) sortOrder *= -1;
      return sortOrder;
    });
  // Can edit only the most recently closed reporting period
  // (unless the next application window has already opened - prevents overlap):
  const now = nowMoment();
  const mostRecentlyClosedYear = query.openedReportingYear
    ? null
    : orderedByCloseTimeDesc.find((y) =>
        defaultMoment(y.node.applicationCloseTime).isSameOrBefore(now)
      ).node;
  return mostRecentlyClosedYear;
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

  const mostRecentlyClosedYear = getMostRecentlyClosedYear(props.query);

  const isYearEditable = (year, openedReportingYear) => {
    const closeTime = defaultMoment(year.applicationCloseTime);
    const mostRecentEditableCloseTime = defaultMoment(
      openedReportingYear
        ? openedReportingYear.applicationCloseTime
        : mostRecentlyClosedYear.applicationCloseTime
    );
    return closeTime.isSameOrAfter(mostRecentEditableCloseTime);
  };

  const exclusiveDateRangesValidator = useMemo(() => {
    return (year, formData, errors) => {
      return validateExclusiveDateRanges(
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
          style={{marginTop: '-100px'}}
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
                  {isYearEditable(node, props.query.openedReportingYear) && (
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
        validateExclusiveDateRanges={exclusiveDateRangesValidator}
      />
      <ReportingYearFormDialog
        show={dialogMode === 'edit'}
        year={editingYear?.reportingYear}
        formFields={editingYear}
        clearForm={clearForm}
        saveReportingYear={saveReportingYear}
        validateExclusiveDateRanges={exclusiveDateRangesValidator}
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
      openedReportingYear {
        reportingYear
        applicationOpenTime
        applicationCloseTime
      }
    }
  `
});
