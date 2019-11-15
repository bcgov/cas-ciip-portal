import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import JsonSchemaForm, {
  IChangeEvent,
  ErrorSchema,
  UiSchema,
  AjvError
} from 'react-jsonschema-form';
import {Form_query} from 'Form_query.graphql';
import {Button} from 'react-bootstrap';
import FormObjectFieldTemplate from './FormObjectFieldTemplate';
import FormFieldTemplate from './FormFieldTemplate';
import FormArrayFieldTemplate from './FormArrayFieldTemplate';
import FuelFields from './FuelFields';
import EmissionGasFields from './EmissionGasFields';
import EmissionSourceFields from './EmissionSourceFields';
import ProductionFields from './ProductionFields';

interface FormJson {
  schema: any;
  uiSchema: UiSchema;
  customFormats: any;
  customFormatsErrorMessages: Record<string, string>;
}

interface Props {
  query: Form_query;
  onComplete?: (e: IChangeEvent) => void;
  onValueChanged?: (e: IChangeEvent, es?: ErrorSchema) => void;
}

const CUSTOM_FIELDS = {
  fuel: props => <FuelFields query={props.formContext.query} {...props} />,
  emissionSource: EmissionSourceFields,
  emissionGas: EmissionGasFields,
  production: props => (
    <ProductionFields query={props.formContext.query} {...props} />
  )
};

export const FormComponent: React.FunctionComponent<Props> = ({
  query,
  onComplete,
  onValueChanged
}) => {
  const {result} = query || {};
  const {
    formJsonByFormId: {formJson},
    formResult
  } = result || {formJsonByFormId: {}};
  if (!result) return null;
  const {
    schema,
    uiSchema,
    customFormats,
    customFormatsErrorMessages = {}
  } = formJson as FormJson;

  const transformErrors = (errors: AjvError[]) => {
    return errors.map(error => {
      if (error.name !== 'format') return error;
      if (!customFormatsErrorMessages[error.params.format]) return error;
      return {
        ...error,
        message: customFormatsErrorMessages[error.params.format]
      };
    });
  };

  return (
    <JsonSchemaForm
      omitExtraData
      liveOmit
      showErrorList={false}
      ArrayFieldTemplate={FormArrayFieldTemplate}
      FieldTemplate={FormFieldTemplate}
      formContext={{query}}
      formData={formResult}
      fields={CUSTOM_FIELDS}
      customFormats={customFormats}
      schema={schema}
      uiSchema={uiSchema}
      ObjectFieldTemplate={FormObjectFieldTemplate}
      transformErrors={transformErrors}
      onSubmit={onComplete}
      onChange={onValueChanged}
    >
      <div style={{textAlign: 'right'}}>
        <Button type="submit">Submit</Button>
      </div>
    </JsonSchemaForm>
  );
};

export default createFragmentContainer(FormComponent, {
  query: graphql`
    fragment Form_query on Query
      @argumentDefinitions(formResultId: {type: "ID!"}) {
      ...FuelFields_query
      ...ProductionFields_query
      result: formResult(id: $formResultId) {
        formResult
        formJsonByFormId {
          formJson
        }
      }
    }
  `
});
