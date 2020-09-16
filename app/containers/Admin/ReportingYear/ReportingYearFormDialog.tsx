import React from 'react';
import {Modal, Container, Button} from 'react-bootstrap';
import globalFormStyles from '../../Forms/FormSharedStyles';
import JsonSchemaForm from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import reportingYearSchema from './edit_reporting_year.json';
import AltDateInput from 'components/Forms/AltDateInput';
import AltDateTimeInput from 'components/Forms/AltDateTimeInput';
import {validateApplicationDates} from './reportingYearValidation';
import {nowMoment, defaultMoment} from 'functions/formatDates';

function transformUiSchema(json, formFields) {
  if (!formFields) return;
  const now = nowMoment();

  Object.keys(json).forEach((field) => {
    const d = defaultMoment(formFields[field]);
    const thisYear = Number(now.year());

    json[field]['ui:disabled'] = d < now;
    json[field]['ui:options'].yearsRange = [thisYear, thisYear + 10];
  });

  return json;
}

interface Props {
  show: boolean;
  year: number;
  formFields: object;
  clearForm: () => void;
  saveReportingYear: ({formData}) => void;
}

const ReportingYearFormDialog: React.FunctionComponent<Props> = ({
  show,
  year,
  formFields,
  clearForm,
  saveReportingYear
}) => {
  const uiSchema = transformUiSchema(reportingYearSchema.uiSchema, formFields);

  const handleSubmit = (e) => {
    if (e.errors.length === 0) {
      saveReportingYear(e);
    }
  };

  return (
    <>
      <Modal centered size="xl" show={show} onHide={clearForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reporting Year {year}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <JsonSchemaForm
              omitExtraData
              liveOmit
              noHtml5Validate
              schema={reportingYearSchema.schema as JSONSchema6}
              uiSchema={uiSchema}
              formData={formFields}
              FieldTemplate={FormFieldTemplate}
              ObjectFieldTemplate={FormObjectFieldTemplate}
              widgets={{AltDateInput, AltDateTimeInput}}
              showErrorList={false}
              validate={(formData, errors) =>
                validateApplicationDates(formFields, formData, errors, uiSchema)
              }
              onSubmit={handleSubmit}
            >
              <Button type="submit" variant="primary">
                Save Reporting Year
              </Button>
            </JsonSchemaForm>
          </Container>
        </Modal.Body>
      </Modal>
      <style jsx global>
        {globalFormStyles}
      </style>
    </>
  );
};

export default ReportingYearFormDialog;
