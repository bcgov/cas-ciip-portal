import React, {useState} from 'react';
import {Button, Card, Collapse} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm from 'react-jsonschema-form';
import {FormJson} from 'next-env';
import SummaryFormArrayFieldTemplate from '../Forms/SummaryFormArrayFieldTemplate';
import SummaryFormFieldTemplate from '../Forms/SummaryFormFieldTemplate';
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

  const [isOpen, setIsOpen] = useState(false);

  const CUSTOM_FIELDS = {
    TitleField: props => (
      <>
        <h3>{props.title}</h3>

        <hr />
      </>
    ),
    StringField: props => (
      <>: {props.formData ? props.formData : '[No Data Entered]'}</>
    ),
    BooleanField: props => <>{props.formData ? 'Yes' : 'No'}</>,
    emissionSource: props => <EmissionSourceFields {...props} />,
    emissionGas: props => <EmissionGasFields {...props} />
  };

  return (
    <Card style={{width: '100%', marginBottom: '10px'}}>
      <Card.Header onClick={() => setIsOpen(!isOpen)}>
        <Button>{isOpen ? 'Expand' : 'Collapse'}</Button>
      </Card.Header>
      <Collapse in={!isOpen}>
        <Card.Body>
          {/*
      //@ts-ignore JsonSchemaForm typedef is missing customFormats prop */}
          <JsonSchemaForm
            omitExtraData
            liveOmit
            ArrayFieldTemplate={SummaryFormArrayFieldTemplate}
            FieldTemplate={SummaryFormFieldTemplate}
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
        </Card.Body>
      </Collapse>
    </Card>
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
