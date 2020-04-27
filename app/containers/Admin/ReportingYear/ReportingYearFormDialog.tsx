import React, {useState} from 'react';
import {Modal, Container, Button} from 'react-bootstrap';
import JsonSchemaForm from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import reportingYearSchema from './reporting_year.json';

// Interface Props {
//   show: boolean;
//   year: number;
//   formFields: object;
//   clearForm: Function;
//   saveReportingYear: Function;
// }

export default function ReportingYearFormDialog({
  show,
  year,
  formFields,
  clearForm,
  saveReportingYear
}) {
  return (
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
            uiSchema={reportingYearSchema.uiSchema}
            formData={formFields}
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
}
