import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Alert from 'react-bootstrap/Alert';
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

interface FormJson {
  schema: any;
  uiSchema: UiSchema;
  customFormats: any;
  customFormatsErrorMessages: Record<string, string>;
}

interface Props {
  query: Form_query;
  initialData?: any;
  initialDataSource?: string;
  onComplete?: any;
  onValueChanged: (e: IChangeEvent<unknown>, es?: ErrorSchema) => any;
}
// Note: https://github.com/graphile/postgraphile/issues/980
export const FormComponent: React.FunctionComponent<Props> = ({
  query,
  initialData,
  initialDataSource,
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
    <>
      {initialData && Object.keys(initialData).length > 0 && initialDataSource && (
        <>
          <Alert variant="info">
            We filled this form for you with the data coming from{' '}
            {initialDataSource}. Please review it and either submit or edit it.
          </Alert>
        </>
      )}

      {/*
      //@ts-ignore JsonSchemaForm typedef is missing customFormats prop */}
      <JsonSchemaForm
        omitExtraData
        liveOmit
        showErrorList={false}
        FieldTemplate={FormFieldTemplate}
        formContext={{query}}
        formData={formResult}
        transformErrors={transformErrors}
        customFormats={customFormats}
        schema={schema}
        uiSchema={uiSchema}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        onSubmit={onComplete}
        onChange={onValueChanged}
      >
        <div style={{textAlign: 'right'}}>
          <Button type="submit">Submit</Button>
        </div>
      </JsonSchemaForm>
    </>
  );
};

export default createFragmentContainer(FormComponent, {
  query: graphql`
    fragment Form_query on Query
      @argumentDefinitions(formResultId: {type: "ID!"}) {
      ...FormWithProductUnits_query
      ...FormWithFuelUnits_query
      result: formResult(id: $formResultId) {
        formResult
        formJsonByFormId {
          formJson
        }
      }
    }
  `
});
