import React from 'react';
import {Button} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm from 'react-jsonschema-form';
import {FormJson} from 'next-env';
import FormObjectFieldTemplate from './FormObjectFieldTemplate';
import FormFieldTemplate from './FormFieldTemplate';
import FormArrayFieldTemplate from './FormArrayFieldTemplate';
import FuelFields from './FuelFields';
import EmissionGasFields from './EmissionGasFields';
import EmissionSourceFields from './EmissionSourceFields';
import ProductionFields from './ProductionFields';

interface Props {
  formResult: object;
}

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
export const ApplicationWizardConfirmationCardItemComponent = props => {
  const {formResult} = props;
  console.log(formResult);
  const {formJson} = formResult.formJsonbyFormId;
  const {
    schema,
    uiSchema,
    customFormats
    // CustomFormatsErrorMessages = {}
  } = formJson as FormJson;

  const CUSTOM_FIELDS = {
    fuel: props => <FuelFields query={props.formContext.query} {...props} />,
    emissionSource: props => <EmissionSourceFields {...props} />,
    emissionGas: props => <EmissionGasFields {...props} />,
    production: props => (
      <ProductionFields query={props.formContext.query} {...props} />
    )
  };

  return (
    <>
      {/*
        //@ts-ignore */}
      {formResult.formJsonByFormId.name}
      {/*
      //@ts-ignore JsonSchemaForm typedef is missing customFormats prop */}
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
      >
        <div style={{textAlign: 'right'}}>
          <Button type="submit">Submit</Button>
        </div>
      </JsonSchemaForm>
    </>
  );
};

export default createFragmentContainer(
  ApplicationWizardConfirmationCardItemComponent,
  {
    formResult: graphql`
      fragment ApplicationWizardConfirmationCardItem_formResult on FormResult {
        formResult
        formJsonByFormId {
          name
          formJson
        }
      }
    `
  }
);
