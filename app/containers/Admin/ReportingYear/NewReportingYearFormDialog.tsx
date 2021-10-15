import React from "react";
import { Modal, Container, Button } from "react-bootstrap";
import globalFormStyles from "../../Forms/FormSharedStyles";
import { FormValidation } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import FormObjectFieldTemplate from "containers/Forms/FormObjectFieldTemplate";
import FormFieldTemplate from "containers/Forms/FormFieldTemplate";
import newReportingYearSchema from "./create_reporting_year.json";
import DatePickerWidget from "components/Forms/DatePickerWidget";
import { validateAllDates, validateUniqueKey } from "./reportingYearValidation";
import { ensureFullTimestamp } from "functions/formatDates";
import LoadingOnSubmitForm from "components/helpers/LoadingOnSubmitForm";

interface Props {
  show: boolean;
  clearForm: () => void;
  createReportingYear: ({ formData }) => void;
  existingYearKeys: number[];
  validateExclusiveDateRanges: (
    year: number,
    formData: object,
    errors: object
  ) => FormValidation;
}

const NewReportingYearFormDialog: React.FunctionComponent<Props> = ({
  show,
  clearForm,
  createReportingYear,
  existingYearKeys,
  validateExclusiveDateRanges,
}) => {
  const handleSubmit = (e) => {
    const beginningOfDay = { hour: 0, minute: 0, second: 0, millisecond: 0 };
    const endOfDay = { hour: 11, minute: 59, second: 59, millisecond: 999 };
    const formData = {
      ...e.formData,
      reportingPeriodStart: ensureFullTimestamp(
        e.formData.reportingPeriodStart,
        beginningOfDay
      ),
      reportingPeriodEnd: ensureFullTimestamp(
        e.formData.reportingPeriodEnd,
        endOfDay
      ),
      applicationOpenTime: ensureFullTimestamp(
        e.formData.applicationOpenTime,
        beginningOfDay
      ),
      applicationCloseTime: ensureFullTimestamp(
        e.formData.applicationCloseTime,
        endOfDay
      ),
      swrsDeadline: ensureFullTimestamp(e.formData.swrsDeadline, endOfDay),
    };

    if (e.errors.length === 0) {
      createReportingYear(formData);
    }
  };

  return (
    <>
      <Modal
        centered
        size="lg"
        show={show}
        onHide={clearForm}
        aria-labelledby="new-reporting-year"
      >
        <Modal.Header closeButton>
          <Modal.Title id="new-reporting-year">New Reporting Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <LoadingOnSubmitForm
              omitExtraData
              liveOmit
              noHtml5Validate
              schema={newReportingYearSchema.schema as JSONSchema7}
              uiSchema={newReportingYearSchema.uiSchema}
              formData={{}}
              FieldTemplate={FormFieldTemplate}
              ObjectFieldTemplate={FormObjectFieldTemplate}
              widgets={{ DatePickerWidget }}
              showErrorList={false}
              validate={(formData, errors) => {
                validateUniqueKey(existingYearKeys, formData, errors);
                validateAllDates(
                  null,
                  formData,
                  errors,
                  newReportingYearSchema.uiSchema
                );
                validateExclusiveDateRanges(null, formData, errors);
                return errors;
              }}
              onSubmit={handleSubmit}
            >
              <Button type="submit" variant="primary">
                Save Reporting Year
              </Button>
            </LoadingOnSubmitForm>
          </Container>
        </Modal.Body>
      </Modal>
      <style jsx global>
        {`
          ${globalFormStyles}
          #root_reportingYear {
            width: 12em;
          }
        `}
      </style>
    </>
  );
};

export default NewReportingYearFormDialog;
