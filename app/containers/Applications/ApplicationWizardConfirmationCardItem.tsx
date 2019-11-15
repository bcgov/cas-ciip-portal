import React from 'react';
import {Button} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm from 'react-jsonschema-form';
import {FormJson} from 'next-env';
import FormArrayFieldTemplate from '../Forms/FormArrayFieldTemplate';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import EmissionGasFields from '../Forms/EmissionGasFields';
import EmissionSourceFields from '../Forms/EmissionSourceFields';
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
    // Fuel: props => <FuelFields query={props.formContext.query} {...props} />,
    emissionSource: props => <EmissionSourceFields {...props} />,
    emissionGas: props => <EmissionGasFields {...props} />
    // Production: props => (
    // <ProductionFields query={props.formContext.query} {...props} />
    // )
  };

  return (
    <>
      {/*
      //@ts-ignore JsonSchemaForm typedef is missing customFormats prop */}
      <JsonSchemaForm
        disabled
        omitExtraData
        readonly
        liveOmit
        ArrayFieldTemplate={FormArrayFieldTemplate}
        FieldTemplate={FormFieldTemplate}
        FormContext={{query}}
        showErrorList={false}
        fields={CUSTOM_FIELDS}
        customFormats={customFormats}
        schema={schema}
        uiSchema={uiSchema}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        formData={query}
      >
        <div style={{display: 'none'}}>
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
