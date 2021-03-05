import React from 'react';
import JsonSchemaForm, {IChangeEvent} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  selectableReportingYears: number[];
  onChange: (value?: number) => any;
  selectedReportingYear: number;
}

const SelectReportingYearDropDownComponent: React.FunctionComponent<Props> = ({
  selectableReportingYears,
  onChange,
  selectedReportingYear
}) => {
  const yearSchema: JSONSchema7 = {
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
      classNames: 'ml-auto',
      'ui:col-md': 'auto'
    }
  };

  const handleChange = (e: IChangeEvent) => {
    onChange(e.formData.reportingYear);
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
