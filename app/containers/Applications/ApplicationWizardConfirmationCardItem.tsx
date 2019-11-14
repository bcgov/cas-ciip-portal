import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm from 'react-jsonschema-form';
import {FormJson} from 'next-env';
import FormArrayFieldTemplate from '../Forms/FormArrayFieldTemplate';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FuelFields from '../Forms/FuelFields';
import EmissionGasFields from '../Forms/EmissionGasFields';
import EmissionSourceFields from '../Forms/EmissionSourceFields';
import ProductionFields from '../Forms/ProductionFields';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';

interface Props {
  formResult;
}

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
export const ApplicationWizardConfirmationCardItemComponent: React.FunctionComponent<
  Props
> = ({formResult}) => {
  const {formJsonByFormId} = formResult;
  const query = formResult.formResult;
  const {formJson} = formJsonByFormId;
  const {
    schema,
    uiSchema,
    customFormats
    // CustomFormatsErrorMessages = {}
  } = formJson as FormJson;
  console.log(formResult);
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
        disabled
        omitExtraData
        liveOmit
        showErrorList={false}
        ArrayFieldTemplate={FormArrayFieldTemplate}
        FieldTemplate={FormFieldTemplate}
        FormContext={{query}}
        formData={query}
        fields={CUSTOM_FIELDS}
        customFormats={customFormats}
        schema={schema}
        uiSchema={uiSchema}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        // TransformErrors={transformErrors}
        // onSubmit={onComplete}
      />
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
