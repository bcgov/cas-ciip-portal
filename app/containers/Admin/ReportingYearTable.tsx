import React, {useState} from 'react';
import {Table, Modal, Container, Button} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm from 'react-jsonschema-form';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import moment from 'moment-timezone';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {ReportingYearTable_query} from '__generated__/ReportingYearTable_query.graphql';
import reportingYearSchema from './reporting_year.json';
import updateReportingYearMutation from 'mutations/reporting_year/updateReportingYearMutation';

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
  const initialFormState = {
    editingYear: null,
    formFields: null
  };
  const [state, setState] = useState(initialFormState);

  const {query, relay} = props;
  if (!query.allReportingYears || !query.allReportingYears.edges) {
    return <div />;
  }

  const clearForm = () => {
    setState(prev => {
      return {
        ...prev,
        ...initialFormState
      }
    });
  }

  // TODO: Refactor / implement this in a better way
  const editYear = node => {
    setState((prev) => {
      return {
        ...prev,
        editingYear: node,
        formFields: {
          applicationOpenDate: isoToLocaleDate(node.applicationOpenTime),
          applicationOpenTime: isoToLocaleTime(node.applicationOpenTime),
          applicationCloseDate: isoToLocaleDate(node.applicationCloseTime),
          applicationCloseTime: isoToLocaleTime(node.applicationCloseTime),
          applicationResponseTime: isoToLocaleDate(node.applicationResponseTime)
        }
      }
    });
  };

  // TODO: Refactor / implement this in a better way
  const saveReportingYear = async ({formData}) => {
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
        id: state.editingYear.id,
        reportingYearPatch: {
          ...finalData
        }
      }
    })
    .then(clearForm);
  };

  const editModal = (
    <Modal
      centered
      size="xl"
      show={Boolean(state.editingYear)}
      onHide={clearForm}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Edit Reporting Year {state.editingYear?.reportingYear}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <JsonSchemaForm
            omitExtraData
            liveOmit
            schema={reportingYearSchema.schema as JSONSchema6}
            uiSchema={reportingYearSchema.uiSchema}
            formData={state.formFields}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            showErrorList={false}
            onSubmit={saveReportingYear}
          >
            <Button type="submit" variant="primary">
              Save Reporting Year
            </Button>
          </JsonSchemaForm>
        </Container>
      </Modal.Body>
    </Modal>
  );

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
      {editModal}
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
