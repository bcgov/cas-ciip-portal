import React, { useState, useMemo } from "react";
import { Button, Card, Collapse, Col, Row } from "react-bootstrap";
import { createFragmentContainer, graphql } from "react-relay";
import JsonSchemaForm, { AjvError } from "@rjsf/core";
import type { FormJson } from "types";
import { ApplicationDetailsCardItem_formResult } from "__generated__/ApplicationDetailsCardItem_formResult.graphql";
import { ApplicationDetailsCardItem_query } from "__generated__/ApplicationDetailsCardItem_query.graphql";
import customBasicFields from "components/Application/ApplicationDetailsCardItemCustomFields";
import SummaryFormArrayFieldTemplate from "containers/Forms/SummaryFormArrayFieldTemplate";
import SummaryFormFieldTemplate from "containers/Forms/SummaryFormFieldTemplate";
import FormObjectFieldTemplate from "containers/Forms/FormObjectFieldTemplate";
import { customTransformErrors } from "functions/customTransformErrors";
import jsonSchemaDiff from "lib/jsonSchemaDiff";
import FuelRowIdField from "containers/Forms/FuelRowIdField";
import FuelField from "containers/Forms/FuelField";
import EmissionCategoryRowIdField from "containers/Forms/EmissionCategoryRowIdField";
import NaicsField from "containers/Forms/NaicsField";
import ProductField from "containers/Forms/ProductField";
import ProductRowIdField from "containers/Forms/ProductRowIdField";
import EmissionField from "containers/Forms/EmissionField";

interface Props {
  // The form_result used by the fragment
  formResult: ApplicationDetailsCardItem_formResult;
  /** Optional prop (used in review-application only).
      An array of form results from the version that has been selected to be diffed from (older version) default: current version - 1 */
  diffFromResults?: any;
  /** Optional prop (used in review-application only).
      An array of form results from the version that has been selected to be diffed To (newer version) default: current version */
  diffToResults?: any;
  // The query prop used by the fragment
  query: ApplicationDetailsCardItem_query;
  // Boolean indicates whether or not to show the diff between selected versions
  showDiff: boolean;
  // Boolean indicates whether or not to liveValidate the results (true when rendered by the summary component)
  liveValidate: boolean;
}

/*
 * The ApplicationDetails renders a summary of the data submitted in the application
 */
export const ApplicationDetailsCardItemComponent: React.FunctionComponent<Props> = ({
  formResult,
  diffFromResults,
  diffToResults,
  query,
  showDiff,
  liveValidate,
}) => {
  const { formJsonByFormId } = formResult;
  const { formJson } = formJsonByFormId;
  const {
    schema,
    uiSchema,
    customFormats,
    customFormatsErrorMessages,
  } = formJson as FormJson;

  const formIdPrefix = `${formJsonByFormId.name
    .toLowerCase()
    .replace(" ", "-")}`;

  const transformErrors = (errors: AjvError[]) => {
    return customTransformErrors(errors, customFormatsErrorMessages);
  };

  // Expands or collapses the form_result card
  const [isOpen, setIsOpen] = useState(false);

  const { formData, idDiffMap } = useMemo(() => {
    if (!showDiff)
      return { formData: formResult.formResult, idDiffMap: undefined };

    // Select the correct form result to diff to by matching formJson slugs
    const diffTo = diffToResults?.find(
      ({ node }) => node.formJsonByFormId.slug === formJsonByFormId.slug
    )?.node.formResult;

    // Select the correct form result to diff from by matching formJson slugs
    const diffFrom = diffFromResults?.find(
      ({ node }) => node.formJsonByFormId.slug === formJsonByFormId.slug
    )?.node.formResult;

    return jsonSchemaDiff(
      formResult.formResult,
      formIdPrefix,
      diffFrom,
      diffTo
    );
  }, [formResult, diffFromResults, diffToResults, formIdPrefix, showDiff]);

  const classTag = formJsonByFormId.slug;
  // Override submit button for each form with an empty fragment
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const buttonOverride = <></>;

  const customFragmentFields = {
    naics: (props) => <NaicsField query={query} {...props} />,
    product: (props) => (
      <ProductField
        naicsCode={
          formResult.applicationRevisionByApplicationIdAndVersionNumber
            .naicsCode
        }
        query={query}
        {...props}
      />
    ),
    productRowId: (props) => (
      <ProductRowIdField
        naicsCode={
          formResult.applicationRevisionByApplicationIdAndVersionNumber
            .naicsCode
        }
        query={query}
        {...props}
      />
    ),
    emission: (props) => (
      <EmissionField
        totalOnsiteEmissions={
          formResult.applicationRevisionByApplicationIdAndVersionNumber
            .totalCiipEmissions
        }
        {...props}
      />
    ),
    fuel: (props) => <FuelField query={query} {...props} />,
    fuelRowId: (props) => <FuelRowIdField query={query} {...props} />,
    emissionCategoryRowId: (props) => (
      <EmissionCategoryRowIdField query={query} {...props} />
    ),
  };

  const customFields = {
    ...customBasicFields,
    ...customFragmentFields,
  };

  return (
    <Card
      style={{ width: "100%", marginBottom: "10px" }}
      className={`${classTag} summary-card`}
    >
      <Card.Header className="summary-form-header">
        <Row>
          <Col md={6}>
            <h2>{formJsonByFormId.name}</h2>
          </Col>
          <Col md={1} style={{ textAlign: "right" }}>
            <Button
              aria-label="toggle-card-open"
              title="expand or collapse the card"
              variant="outline-dark"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "+" : "-"}
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Collapse in={!isOpen}>
        <Card.Body>
          <JsonSchemaForm
            omitExtraData
            liveOmit
            liveValidate={liveValidate}
            ArrayFieldTemplate={SummaryFormArrayFieldTemplate}
            FieldTemplate={SummaryFormFieldTemplate}
            showErrorList={false}
            fields={customFields}
            customFormats={customFormats}
            transformErrors={transformErrors}
            schema={schema}
            idPrefix={formIdPrefix}
            uiSchema={uiSchema}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            formData={formData}
            formContext={{
              query,
              showDiff,
              idDiffMap,
            }}
          >
            {buttonOverride}
          </JsonSchemaForm>
        </Card.Body>
      </Collapse>
      <style jsx global>{`
        h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
          line-height: 1.2;
        }
        .diffFrom {
          background-color: rgba(243, 76, 96, 0.3);
        }
        .diffTo {
          background-color: rgba(70, 241, 118, 0.3);
        }
        .has-error .summary-item svg,
        .has-error .summary-item .error-detail .text-danger {
          color: #c70012 !important;
        }
        .summary-form-header > .row {
          justify-content: space-between;
        }
        @media print {
          button,
          .btn {
            display: none !important;
          }
        }
      `}</style>
    </Card>
  );
};

export default createFragmentContainer(ApplicationDetailsCardItemComponent, {
  formResult: graphql`
    fragment ApplicationDetailsCardItem_formResult on FormResult {
      formResult
      formJsonByFormId {
        name
        slug
        formJson
      }
      applicationRevisionByApplicationIdAndVersionNumber {
        totalCiipEmissions
        naicsCode {
          ...ProductRowIdField_naicsCode
          ...ProductField_naicsCode
        }
      }
    }
  `,
  query: graphql`
    fragment ApplicationDetailsCardItem_query on Query {
      ...NaicsField_query
      ...ProductField_query
      ...ProductRowIdField_query
      ...FuelField_query
      ...FuelRowIdField_query
      ...EmissionCategoryRowIdField_query
    }
  `,
});
