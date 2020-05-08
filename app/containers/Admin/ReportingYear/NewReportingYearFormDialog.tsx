import React from 'react';
import moment from 'moment-timezone';
import {Modal, Container, Button} from 'react-bootstrap';
import globalFormStyles from '../../Forms/FormSharedStyles';
import JsonSchemaForm from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import newReportingYearSchema from './create_reporting_year.json';
import AltDateInput from 'components/Forms/AltDateInput';
import AltDateTimeInput from 'components/Forms/AltDateTimeInput';
import {validateAllDates, validateUniqueKey} from './reportingYearValidation';

const TIME_ZONE = 'America/Vancouver';

function transformUiSchema(json) {
  const now = moment.tz(TIME_ZONE);
  const thisYear = Number(now.year());

  Object.keys(json).forEach((field) => {
    if (field.includes('reportingPeriod')) {
      json[field]['ui:options'].yearsRange = [thisYear - 2, thisYear + 10];
    } else if (field.includes('application')) {
      json[field]['ui:options'].yearsRange = [thisYear, thisYear + 10];
    }
  });

  return json;
}

interface Props {
  show: boolean;
  clearForm: () => void;
  createReportingYear: ({formData}) => void;
  existingYearKeys: number[];
}

const NewReportingYearFormDialog: React.FunctionComponent<Props> = ({
  show,
  clearForm,
  createReportingYear,
  existingYearKeys
}) => {
  const uiSchema = transformUiSchema(newReportingYearSchema.uiSchema);

  const handleSubmit = (e) => {
    if (e.errors.length === 0) {
      createReportingYear(e);
    }
  };

  return (
    <>
      <Modal centered size="xl" show={show} onHide={clearForm}>
        <Modal.Header closeButton>
          <Modal.Title>New Reporting Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <JsonSchemaForm
              omitExtraData
              liveOmit
              noHtml5Validate
              schema={newReportingYearSchema.schema as JSONSchema6}
              uiSchema={uiSchema}
              formData={{}}
              FieldTemplate={FormFieldTemplate}
              ObjectFieldTemplate={FormObjectFieldTemplate}
              widgets={{AltDateInput, AltDateTimeInput}}
              showErrorList={false}
              validate={(formData, errors) => {
                validateUniqueKey(existingYearKeys, formData, errors);
                return validateAllDates(
                  null,
                  formData,
                  errors,
                  newReportingYearSchema.uiSchema
                );
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

export default NewReportingYearFormDialog;
