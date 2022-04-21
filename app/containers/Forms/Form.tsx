import React, { useEffect, useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IChangeEvent, ErrorSchema, AjvError } from "@rjsf/core";
import JsonSchemaForm from "components/Forms/Form";
import { Form_query } from "Form_query.graphql";
import { Button, Row, Col, Alert } from "react-bootstrap";
import globalFormStyles from "./FormSharedStyles";
import Link from "next/link";
import type { FormJson } from "types";
import SearchDropdownWidget from "components/Forms/SearchDropdownWidget";
import FormObjectFieldTemplate from "./FormObjectFieldTemplate";
import FormFieldTemplate from "./FormFieldTemplate";
import FormArrayFieldTemplate from "./FormArrayFieldTemplate";
import FuelFields from "./FuelField";
import EmissionGasFields from "./EmissionGasFields";
import EmissionSourceFields from "./EmissionSourceFields";
import ProductsArrayField from "./ProductsArrayField";
import ProductField from "./ProductField";
import EmissionField from "./EmissionField";
import ProductRowIdField from "./ProductRowIdField";
import FuelRowIdField from "./FuelRowIdField";
import NumberField from "./NumberField";
import EmissionCategoryRowIdField from "./EmissionCategoryRowIdField";
import AddCommentField from "components/Forms/AddCommentField";
import { customTransformErrors } from "functions/customTransformErrors";
import SavingIndicator from "components/helpers/SavingIndicator";
import NaicsField from "./NaicsField";
import productFieldValidation from "./validation/productFieldValidation";
import MissingProductsComponent from "components/product/MissingProductsComponent";
import { Form_ciipFormResult } from "Form_ciipFormResult.graphql";

interface Props {
  query: Form_query;
  ciipFormResult: Form_ciipFormResult;
  onComplete: (e: IChangeEvent) => void;
  onValueChanged?: (e: IChangeEvent, es?: ErrorSchema) => void;
  isSaved: boolean;
}

const CUSTOM_FIELDS = {
  naics: (props) => <NaicsField query={props.formContext.query} {...props} />,
  fuel: (props) => <FuelFields query={props.formContext.query} {...props} />,
  emissionSource: EmissionSourceFields,
  emissionGas: EmissionGasFields,
  ProductsArrayField: (props) => (
    <ProductsArrayField
      naicsProducts={
        props.formContext.ciipFormResult.applicationByApplicationId
          .latestDraftRevision.naicsCode
      }
      {...props}
    />
  ),
  product: (props) => (
    <ProductField
      naicsCode={
        props.formContext.ciipFormResult.applicationByApplicationId
          .latestDraftRevision.naicsCode
      }
      query={props.formContext.query}
      {...props}
    />
  ),
  emission: (props) => (
    <EmissionField
      query={props.formContext.query}
      totalOnsiteEmissions={
        props.formContext.ciipFormResult.applicationByApplicationId
          .latestDraftRevision.totalCiipEmissions
      }
      {...props}
    />
  ),
  productRowId: (props) => (
    <ProductRowIdField
      naicsCode={
        props.formContext.ciipFormResult.applicationByApplicationId
          .latestDraftRevision.naicsCode
      }
      query={props.formContext.query}
      {...props}
    />
  ),
  fuelRowId: (props) => (
    <FuelRowIdField query={props.formContext.query} {...props} />
  ),
  emissionCategoryRowId: (props) => (
    <EmissionCategoryRowIdField query={props.formContext.query} {...props} />
  ),
  NumberField,
  AddCommentField,
};

export const FormComponent: React.FunctionComponent<Props> = ({
  query,
  ciipFormResult,
  isSaved,
  onComplete,
  onValueChanged,
}) => {
  const [hasErrors, setHasErrors] = useState(false);
  useEffect(() => {
    setHasErrors(false);
  }, [ciipFormResult?.id]);

  if (!ciipFormResult) return null;
  const {
    formJsonByFormId: { name, formJson, ciipApplicationWizardByFormId },
    formResult,
  } = ciipFormResult;
  const {
    schema,
    uiSchema,
    customFormats,
    customFormatsErrorMessages,
  } = formJson as FormJson;

  const transformErrors = (errors: AjvError[]) => {
    return customTransformErrors(errors, customFormatsErrorMessages);
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
    errors = productFieldValidation(formData, errors);
    return errors;
  };

  const formClass = uiSchema?.["ui:className"] || "";

  return (
    <div className={formClass}>
      <Alert variant="info">
        Note: Your form input will be saved automatically as you type.
      </Alert>
      <div className="card">
        <div className="card-header">
          <Row>
            <Col md={8}>
              <h1>{name}</h1>
            </Col>
            <Col md={4}>
              <SavingIndicator
                isSaved={isSaved}
                style={{ lineHeight: "2.25em" }}
              />
            </Col>
          </Row>
        </div>
        <Row style={{ padding: "0 2em 2em 2em" }}>
          <Col md={12}>
            {hasErrors && (
              <div className="errors">Please correct the errors below.</div>
            )}
            <MissingProductsComponent formResult={formResult} query={query} />
            <JsonSchemaForm
              noHtml5Validate
              validate={customValidation}
              showErrorList={false}
              ArrayFieldTemplate={FormArrayFieldTemplate}
              FieldTemplate={FormFieldTemplate}
              formContext={{ query, ciipFormResult }}
              formData={formResult}
              fields={CUSTOM_FIELDS}
              widgets={{ SearchWidget: SearchDropdownWidget }}
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
                  Please refer to the guidance documents to calculate the
                  emission allocations for each product or service, and ensure
                  that you report all the necessary product or services
                </Alert>
              )}
              <Button size="lg" variant="primary" type="submit">
                Save &amp; Continue
              </Button>
              <Link
                passHref
                href={{
                  pathname: "/reporter",
                }}
              >
                <Button
                  variant="outline-secondary"
                  className="exit-button"
                  style={{ background: "white" }}
                  size="lg"
                >
                  Save &amp; Exit
                </Button>
              </Link>
            </JsonSchemaForm>
          </Col>
        </Row>
      </div>
      <style jsx global>
        {globalFormStyles}
      </style>
      <style jsx>{`
        .card {
          border-color: #a4a4a4;
          background-color: #f4f4f4;
        }
        .card-header {
          background-color: #036;
          color: #fff;
        }
        .card-header h1 {
          margin-bottom: 0;
          font-size: 30px;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default createFragmentContainer(FormComponent, {
  query: graphql`
    fragment Form_query on Query {
      ...NaicsField_query
      ...FuelField_query
      ...FuelRowIdField_query
      ...ProductField_query
      ...ProductRowIdField_query
      ...EmissionCategoryRowIdField_query
      products: allProducts(condition: { productState: PUBLISHED }) {
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
  `,
  ciipFormResult: graphql`
    fragment Form_ciipFormResult on FormResult {
      id
      formResult
      formJsonByFormId {
        name
        formJson
        ciipApplicationWizardByFormId {
          formPosition
        }
      }
      applicationByApplicationId {
        latestDraftRevision {
          totalCiipEmissions
          naicsCode {
            ...ProductRowIdField_naicsCode
            ...ProductField_naicsCode
            ...ProductsArrayField_naicsProducts
          }
        }
      }
    }
  `,
});
