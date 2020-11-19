import React from 'react';
import {Modal, Container, Button} from 'react-bootstrap';
import globalFormStyles from '../../Forms/FormSharedStyles';
import JsonSchemaForm, {FormValidation} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import reportingYearSchema from './edit_reporting_year.json';
import DatePickerWidget from 'components/Forms/DatePickerWidget';
import {validateApplicationDates} from './reportingYearValidation';
import {defaultMoment, nowMoment, ensureFullTimestamp} from 'functions/formatDates';

function transformUiSchema(json, formFields) {
  if (!formFields) return;
  const now = nowMoment();

  Object.keys(json).forEach((field) => {
    const d = defaultMoment(formFields[field]);
    // Disable editing past dates, except for applicationCloseTime to enable them to extend it
    // (interface is only displayed for the most recent period):
    json[field]['ui:disabled'] =
      field === 'applicationCloseTime' ? false : d.isBefore(now);
  });

  return json;
}

interface Props {
  show: boolean;
  year: number;
  formFields: object;
  clearForm: () => void;
  saveReportingYear: ({formData}) => void;
  validateExclusiveDateRanges: (
    year: number,
    formData: object,
    errors: object
  ) => FormValidation;
}

const ReportingYearFormDialog: React.FunctionComponent<Props> = ({
  show,
  year,
  formFields,
  clearForm,
  saveReportingYear,
  validateExclusiveDateRanges
}) => {
  const uiSchema = transformUiSchema(reportingYearSchema.uiSchema, formFields);

  const handleSubmit = (e) => {
    const beginningOfDay = {hour: 0, minute: 0, second: 0, millisecond: 0};
    const endOfDay = {hour: 11, minute: 59, second: 59, millisecond: 999};
    const formData = {
      ...e.formData,
      applicationOpenTime: ensureFullTimestamp(
        e.formData.applicationOpenTime,
        beginningOfDay
      ),
      applicationCloseTime: ensureFullTimestamp(
        e.formData.applicationCloseTime,
        endOfDay
      ),
      swrsDeadline: ensureFullTimestamp(e.formData.swrsDeadline, endOfDay)
    };

    if (e.errors.length === 0) {
      saveReportingYear(formData);
    }
  };

  return (
    <>
      <Modal centered size="lg" show={show} onHide={clearForm}>
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
              widgets={{DatePickerWidget}}
              showErrorList={false}
              validate={(formData, errors) => {
                validateApplicationDates(
                  formFields,
                  formData,
                  errors,
                  uiSchema
                );
                return validateExclusiveDateRanges(year, formData, errors);
              }}
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
