import React, {useState} from 'react';
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
import ProductField from './ProductField';
import EmissionField from './EmissionField';
import ProductRowIdField from './ProductRowIdField';
import NumberField from './NumberField';

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
  product: props => <ProductField query={props.formContext.query} {...props} />,
  emission: props => (
    <EmissionField query={props.formContext.query} {...props} />
  ),
  productRowId: props => (
    <ProductRowIdField query={props.formContext.query} {...props} />
  ),
  NumberField
};

export const FormComponent: React.FunctionComponent<Props> = ({
  query,
  onComplete,
  onBack,
  onValueChanged
}) => {
  const [hasErrors, setHasErrors] = useState(false);
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
    // Ignore oneOf errors https://github.com/rjsf-team/react-jsonschema-form/issues/1263
    return errors
      .filter(error => error.name !== 'oneOf')
      .map(error => {
        if (error.name !== 'format') return error;
        if (!customFormatsErrorMessages[error.params.format]) return error;
        return {
          ...error,
          message: customFormatsErrorMessages[error.params.format]
        };
      });
  };

  const onError = () => {
    setHasErrors(true);
    window.scrollTo(0, 0);
  };

  const formClass = uiSchema?.['ui:className'] || '';
  return (
    <div className={formClass}>
      <Row>
        <Col md={8}>
          <h1 className="form-title">{name}</h1>
        </Col>
      </Row>
      {hasErrors && (
        <div className="errors">Please correct the errors below.</div>
      )}
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
        onError={onError}
        onSubmit={onComplete}
        onChange={onValueChanged}
      >
        <div className="form-submit">
          <Row>
            <Col md={3} style={{lineHeight: '48px'}}>
              <Link
                href={{
                  pathname: '/reporter/user-dashboard'
                }}
              >
                Save & Exit
              </Link>
            </Col>
            <Col className="form-nav" md={9} style={{textAlign: 'right'}}>
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
            margin: 20px 0 20px;
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
          .errors {
            margin-left: 20px;
            padding: 20px;
            background: #ce5c5c;
            color: white;
            font-size: 20px;
          }
          ul.error-detail {
            padding: 0;
            list-style: none;
          }
          ul.error-detail li.text-danger {
            background: #ce5c5c;
            color: white !important;
            padding: 5px;
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
      ...ProductField_query
      ...ProductRowIdField_query
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
