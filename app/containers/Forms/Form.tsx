import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import JsonSchemaForm, {
  IChangeEvent,
  ErrorSchema,
  AjvError
} from 'react-jsonschema-form';
import {Form_query} from 'Form_query.graphql';
import {Button, Row, Col} from 'react-bootstrap';
import Link from 'next/link';
import {FormJson} from 'next-env';
import SearchDropdownWidget from 'components/Forms/SearchDropdownWidget';
import FormObjectFieldTemplate from './FormObjectFieldTemplate';
import FormFieldTemplate from './FormFieldTemplate';
import FormArrayFieldTemplate from './FormArrayFieldTemplate';
import FuelFields from './FuelFields';
import EmissionGasFields from './EmissionGasFields';
import EmissionSourceFields from './EmissionSourceFields';
import ProductionFields from './ProductionFields';
import ObjectField from './FormObjectField';

interface Props {
  query: Form_query;
  onComplete: (e: IChangeEvent) => void;
  onBack: () => void;
  onValueChanged?: (e: IChangeEvent, es?: ErrorSchema) => void;
}

const CUSTOM_FIELDS = {
  fuel: props => <FuelFields query={props.formContext.query} {...props} />,
  emissionSource: EmissionSourceFields,
  emissionGas: EmissionGasFields,
  production: props => (
    <ProductionFields query={props.formContext.query} {...props} />
  ),
  ObjectField
};

export const FormComponent: React.FunctionComponent<Props> = ({
  query,
  onComplete,
  onBack,
  onValueChanged
}) => {
  const {result} = query || {};
  const {
    formJsonByFormId: {name, formJson, ciipApplicationWizardByFormId},
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

  const formClass = uiSchema?.['ui:className'] || '';
  return (
    <div className={formClass}>
      <Row>
        <Col md={12} style={{marginLeft: '25px'}}>
          <h1 className="form-title">{name}</h1>
        </Col>
      </Row>

      <JsonSchemaForm
        safeRenderCompletion
        showErrorList={false}
        ArrayFieldTemplate={FormArrayFieldTemplate}
        FieldTemplate={FormFieldTemplate}
        formContext={{query}}
        formData={formResult}
        fields={CUSTOM_FIELDS}
        widgets={{SearchWidget: SearchDropdownWidget}}
        customFormats={customFormats}
        schema={schema}
        uiSchema={uiSchema}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        transformErrors={transformErrors}
        onSubmit={onComplete}
        onChange={onValueChanged}
      >
        <div className="form-submit">
          <Row>
            <Col md={3} style={{lineHeight: '48px'}}>
              <Link
                href={{
                  pathname: '/user-dashboard'
                }}
              >
                Save & Exit
              </Link>
            </Col>
            <Col md={9} style={{textAlign: 'right'}}>
              {ciipApplicationWizardByFormId &&
                ciipApplicationWizardByFormId.formPosition > 0 && (
                  <Button
                    size="lg"
                    type="button"
                    style={{marginRight: '10px'}}
                    variant="secondary"
                    onClick={onBack}
                  >
                    Back
                  </Button>
                )}
              <Button size="lg" type="submit">
                Continue
              </Button>
            </Col>
          </Row>
        </div>
      </JsonSchemaForm>
      <style jsx global>
        {`
          .rjsf .form-row {
            margin: 20px 0 40px;
          }
          .emission-form .rjsf .form-row {
            margin: 0;
          }
          .no-col-padding .form-row > .col,
          .no-col-padding .form-row > [class*='col-'] {
            padding: 0;
          }
          .form-submit {
            border: 1px solid #bbb;
            padding: 30px;
            background: #eee;
            border-radius: 6px;
          }
        `}
      </style>
    </div>
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
          name
          formJson
          ciipApplicationWizardByFormId {
            formPosition
          }
        }
      }
    }
  `
});
