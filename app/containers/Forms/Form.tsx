import React, {useState} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import JsonSchemaForm, {
  IChangeEvent,
  ErrorSchema,
  AjvError
} from 'react-jsonschema-form';
import {Form_query} from 'Form_query.graphql';
import {Button, Row, Col, Alert} from 'react-bootstrap';
import globalFormStyles from './FormSharedStyles';
import Link from 'next/link';
import {FormJson} from 'next-env';
import SearchDropdownWidget from 'components/Forms/SearchDropdownWidget';
import FormObjectFieldTemplate from './FormObjectFieldTemplate';
import FormFieldTemplate from './FormFieldTemplate';
import FormArrayFieldTemplate from './FormArrayFieldTemplate';
import FuelFields from './FuelField';
import EmissionGasFields from './EmissionGasFields';
import EmissionSourceFields from './EmissionSourceFields';
import ProductField from './ProductField';
import EmissionField from './EmissionField';
import ProductRowIdField from './ProductRowIdField';
import FuelRowIdField from './FuelRowIdField';
import NumberField from './NumberField';
import EmissionCategoryRowIdField from './EmissionCategoryRowIdField';

interface Props {
  query: Form_query;
  onComplete: (e: IChangeEvent) => void;
  onBack: () => void;
  onValueChanged?: (e: IChangeEvent, es?: ErrorSchema) => void;
}

const CUSTOM_FIELDS = {
  fuel: (props) => <FuelFields query={props.formContext.query} {...props} />,
  emissionSource: EmissionSourceFields,
  emissionGas: EmissionGasFields,
  product: (props) => (
    <ProductField query={props.formContext.query} {...props} />
  ),
  emission: (props) => (
    <EmissionField query={props.formContext.query} {...props} />
  ),
  productRowId: (props) => (
    <ProductRowIdField query={props.formContext.query} {...props} />
  ),
  fuelRowId: (props) => (
    <FuelRowIdField query={props.formContext.query} {...props} />
  ),
  emissionCategoryRowId: (props) => (
    <EmissionCategoryRowIdField query={props.formContext.query} {...props} />
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
      .filter((error) => error.name !== 'oneOf')
      .map((error) => {
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

  let showAllocationReminder;
  if (ciipApplicationWizardByFormId?.formPosition === 3)
    showAllocationReminder = formResult?.some((result) => {
      return result?.requiresEmissionAllocation === true;
    });

  const customValidation = (formData, errors) => {
    let hasFalseRequiresEmissionAllocation = false;
    let nonEnergyProductCount = 0;
    const productsInConflict = [];
    if (formData[0]?.productRowId) {
      formData.forEach((product, index: number) => {
        if (product.requiresEmissionAllocation === false)
          hasFalseRequiresEmissionAllocation = true;
        if (product.isEnergyProduct === false) {
          nonEnergyProductCount++;
          productsInConflict.push(index + 1);
        }
      });
    }

    if (hasFalseRequiresEmissionAllocation && nonEnergyProductCount > 1)
      errors['0'].addError(
        `Products: ${productsInConflict.join(
          ','
        )} cannot be reported together as at least one of these products does not require manual allocation of emissions.`
      );

    return errors;
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
        noHtml5Validate
        validate={customValidation}
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
        {showAllocationReminder && (
          <Alert variant="info">
            <Alert.Heading>Before you proceed:</Alert.Heading>
            Please refer to the guidance documents to calculate the emission
            allocations for each product or service, and ensure that you report
            all the necessary product or services
          </Alert>
        )}
        <div className="form-submit">
          <Row>
            <Col md={3} style={{lineHeight: '48px'}}>
              <Link
                href={{
                  pathname: '/reporter/user-dashboard'
                }}
              >
                Save &amp; Exit
              </Link>
            </Col>
            <Col className="form-nav" md={9} style={{textAlign: 'right'}}>
              {ciipApplicationWizardByFormId?.formPosition > 0 && (
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
        {globalFormStyles}
      </style>
    </div>
  );
};

export default createFragmentContainer(FormComponent, {
  query: graphql`
    fragment Form_query on Query
      @argumentDefinitions(formResultId: {type: "ID!"}) {
      ...FuelField_query
      ...FuelRowIdField_query
      ...ProductField_query
      ...ProductRowIdField_query
      ...EmissionCategoryRowIdField_query
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
