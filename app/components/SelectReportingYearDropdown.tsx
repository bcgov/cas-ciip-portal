import React from 'react';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  selectableReportingYears: number[];
  handleEvent: (
    action: string,
    value?: string | number,
    column?: string
  ) => any;
  selectedReportingYear: number;
}

const SelectReportingYearDropDownComponent: React.FunctionComponent<Props> = ({
  selectableReportingYears,
  handleEvent,
  selectedReportingYear
}) => {
  console.log(selectedReportingYear);
  const yearSchema: JSONSchema6 = {
    type: 'object',
    properties: {
      reportingYear: {
        title: 'Reporting Period:',
        type: 'number',
        enum: selectableReportingYears,
        default: selectedReportingYear
      }
    }
  };

  const yearUISchema = {
    reportingYear: {
      'ui:col-md': 12
    }
  };

  const handleChange = (e: IChangeEvent) => {
    handleEvent('selectReportingYear', e.formData.reportingYear);
  };

  return (
    <JsonSchemaForm
      schema={yearSchema}
      uiSchema={yearUISchema}
      showErrorList={false}
      FieldTemplate={FormFieldTemplate}
      ObjectFieldTemplate={FormObjectFieldTemplate}
      onChange={handleChange}
    >
      <div />
    </JsonSchemaForm>
  );
};

export default SelectReportingYearDropDownComponent;
