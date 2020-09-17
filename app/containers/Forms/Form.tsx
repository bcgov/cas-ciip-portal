import React, {useState} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {IChangeEvent, ErrorSchema, AjvError} from 'react-jsonschema-form';
import JsonSchemaForm from 'components/Forms/Form';
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
import ProblemReportField from 'components/Forms/ProblemReportField';
import {customTransformErrors} from 'functions/customTransformErrors';
import SavingIndicator from 'components/helpers/SavingIndicator';

interface Props {
  query: Form_query;
  onComplete: (e: IChangeEvent) => void;
  onValueChanged?: (e: IChangeEvent, es?: ErrorSchema) => void;
  isSaved: boolean;
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
  NumberField,
  ProblemReportField
};

export const FormComponent: React.FunctionComponent<Props> = ({
  query,
  isSaved,
  onComplete,
  onValueChanged
}) => {
  const [hasErrors, setHasErrors] = useState(false);
  const {result} = query || {};
  const {
    formJsonByFormId: {name, formJson, ciipApplicationWizardByFormId},
    formResult
  } = result || {formJsonByFormId: {}};
  if (!result) return null;
  const {schema, uiSchema, customFormats} = formJson as FormJson;

  const transformErrors = (errors: AjvError[]) => {
    return customTransformErrors(errors, formJson);
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
    let hasRequirePurchasedElectricity = false;
    let hasRequirePurchasedHeat = false;
    let hasRequireExportedElectricity = false;
    let hasRequireExportedHeat = false;
    let hasRequireGeneratedElectricity = false;
    let hasRequireGeneratedHeat = false;
    let hasRequireEmissionsFromEios = false;
    let nonEnergyProductCount = 0;
    const energyProductsReported = [];
    const productsInConflict = [];
    if (formData[0]?.productRowId) {
      formData.forEach((product, index: number) => {
        if (product.requiresEmissionAllocation === false)
          hasFalseRequiresEmissionAllocation = true;
        if (product.isEnergyProduct === false) {
          nonEnergyProductCount++;
          productsInConflict.push(index + 1);
        } else {
          energyProductsReported.push(product.productRowId);
        }

        if (product.addPurchasedElectricityEmissions === true)
          hasRequirePurchasedElectricity = true;
        if (product.addPurchasedHeatEmissions === true)
          hasRequirePurchasedHeat = true;
        if (product.subtractExportedElectricityEmissions === true)
          hasRequireExportedElectricity = true;
        if (product.subtractExportedHeatEmissions === true)
          hasRequireExportedHeat = true;
        if (product.subtractGeneratedElectricityEmissions === true)
          hasRequireGeneratedElectricity = true;
        if (product.subtractGeneratedHeatEmissions === true)
          hasRequireGeneratedHeat = true;
        if (product.addEmissionsFromEios === true)
          hasRequireEmissionsFromEios = true;
      });
    }

    if (hasFalseRequiresEmissionAllocation && nonEnergyProductCount > 1)
      errors['0'].addError(
        `Products: ${productsInConflict.join(
          ','
        )} cannot be reported together as at least one of these products does not require manual allocation of emissions.`
      );

    if (hasRequirePurchasedElectricity && !energyProductsReported.includes(3))
      errors['0'].addError(
        'Purchased Electricity is a required product based on the products you have reported, please refer to the guidance document'
      );

    if (hasRequirePurchasedHeat && !energyProductsReported.includes(4))
      errors['0'].addError(
        'Purchased Heat is a required product based on the products you have reported, please refer to the guidance document'
      );

    if (hasRequireExportedElectricity && !energyProductsReported.includes(1))
      errors['0'].addError(
        'Sold Electricity is a required product based on the products you have reported, please refer to the guidance document'
      );

    if (hasRequireExportedHeat && !energyProductsReported.includes(2))
      errors['0'].addError(
        'Sold Heat is a required product based on the products you have reported, please refer to the guidance document'
      );

    if (hasRequireGeneratedElectricity && !energyProductsReported.includes(5))
      errors['0'].addError(
        'Generated Electricity is a required product based on the products you have reported, please refer to the guidance document'
      );

    if (hasRequireGeneratedHeat && !energyProductsReported.includes(6))
      errors['0'].addError(
        'Generated Heat is a required product based on the products you have reported, please refer to the guidance document'
      );

    if (hasRequireEmissionsFromEios && !energyProductsReported.includes(7))
      errors['0'].addError(
        'Emissions from EIOs is a required product based on the products you have reported, please refer to the guidance document'
      );

    return errors;
  };

  const formClass = uiSchema?.['ui:className'] || '';

  const getMissingProducts = () => {
    if (formResult[0]?.productRowId) {
      const reportedProducts = formResult.map((r) => r.productRowId);
      const missingProducts = [];

      reportedProducts.forEach((productId) => {
        const product = query.products.edges.find(
          ({node}) => node.rowId === productId
        )?.node;
        if (product?.linkedProduct?.edges?.length > 0) {
          product.linkedProduct.edges.forEach((edge) => {
            if (!reportedProducts.includes(edge.node.linkedProductId)) {
              missingProducts.push({
                linkId: edge.node.rowId,
                product: product.productName,
                missingLink: edge.node.productName
              });
            }
          });
        }
      });
      return missingProducts;
    }
  };

  const showMissingProducts = () => {
    const missingProducts = getMissingProducts();
    if (!missingProducts) return null;
    const renderMissingProducts = missingProducts.map((missingObj) => (
      <Alert key={missingObj.linkId} variant="warning">
        {missingObj.product} requires reporting of: {missingObj.missingLink}
      </Alert>
    ));
    if (missingProducts.length === 0) return null;
    return (
      <>
        <Alert variant="warning">
          <h5>Some required products are missing from your application:</h5>
        </Alert>
        {renderMissingProducts}
      </>
    );
  };

  return (
    <div className={formClass}>
      <Alert variant="info">
        Note: Your form input will be saved automatically as you type.
      </Alert>
      <Row>
        <Col md={8}>
          <h1 className="form-title">{name}</h1>
        </Col>
        <Col md={4}>
          <SavingIndicator isSaved={isSaved} />
        </Col>
      </Row>

      {hasErrors && (
        <div className="errors">Please correct the errors below.</div>
      )}
      {showMissingProducts()}
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
          <Row className="form-nav">
            <Button size="lg" variant="primary" type="submit">
              Save &amp; Continue
            </Button>
            <Link
              href={{
                pathname: '/reporter'
              }}
            >
              <Button
                variant="outline-secondary"
                className="exit-button"
                style={{background: 'white'}}
                size="lg"
              >
                Save &amp; Exit
              </Button>
            </Link>
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
      products: allProducts(condition: {productState: PUBLISHED}) {
        edges {
          node {
            rowId
            productName
            linkedProduct {
              edges {
                node {
                  rowId
                  productName
                  linkedProductId
                }
              }
            }
          }
        }
      }
    }
  `
});
