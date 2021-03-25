import React, {useState, useEffect} from 'react';
import {Button, Card, Collapse, Col, Row} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm, {AjvError, ErrorSchema} from '@rjsf/core';
import {FormJson} from 'next-env';
import {ApplicationDetailsCardItem_formResult} from '__generated__/ApplicationDetailsCardItem_formResult.graphql';
import {ApplicationDetailsCardItem_query} from '__generated__/ApplicationDetailsCardItem_query.graphql';
import diff from 'deep-diff';
import customFields from 'components/Application/ApplicationDetailsCardItemCustomFields';
import SummaryFormArrayFieldTemplate from 'containers/Forms/SummaryFormArrayFieldTemplate';
import SummaryFormFieldTemplate from 'containers/Forms/SummaryFormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import {customTransformErrors} from 'functions/customTransformErrors';

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
  // Boolean indicates whether this component is being rendered in a review page or not
  review: boolean;
  // Boolean indicates whether or not to show the diff between selected versions
  showDiff: boolean;
  // Boolean indicates whether or not to liveValidate the results (true when rendered by the summary component)
  liveValidate: boolean;
  setHasErrors?: (...args: any[]) => void;
}

/*
 * The ApplicationDetails renders a summary of the data submitted in the application
 */
export const ApplicationDetailsCardItemComponent: React.FunctionComponent<Props> = ({
  formResult,
  diffFromResults,
  diffToResults,
  query,
  review,
  showDiff,
  liveValidate,
  setHasErrors
}) => {
  const {formJsonByFormId} = formResult;
  const {formJson} = formJsonByFormId;
  const {schema, uiSchema, customFormats} = formJson as FormJson;

  const formIdPrefix = `${formJsonByFormId.name
    .toLowerCase()
    .replace(' ', '-')}`;

  const transformErrors = (errors: AjvError[]) => {
    return customTransformErrors(errors, formJson);
  };

  const handleChange = (_formData, errorSchema: ErrorSchema) => {
    if (setHasErrors) {
      if (errorSchema?.__errors) {
        setHasErrors(true);
      } else {
        setHasErrors(false);
      }
    }
  };

  // Expands or collapses the form_result card
  const [isOpen, setIsOpen] = useState(false);

  let diffTo;
  // Select the correct form result to diff to by matching formJson slugs
  diffToResults.forEach((result) => {
    if (result.node.formJsonByFormId.slug === formJsonByFormId.slug)
      diffTo = result;
  });

  const [idDiffMap, setIdDiffMap] = useState<
    Record<string, {lhs: any; rhs: any}>
  >({});
  const [formData, setFormData] = useState(
    review ? diffTo.node.formResult : formResult.formResult
  );
  // The array of paths to each difference between diffFrom result & diffTo result (each path matches up with idSchema)
  useEffect(() => {
    const newIdDiffMap: Record<string, {lhs: any; rhs: any}> = {};
    let newFormData = Array.isArray(formData) ? [...formData] : {...formData};
    if (diffFromResults && showDiff) {
      let diffFrom;
      // Select the correct form result to diff from by matching formJson slugs
      diffFromResults.forEach((result) => {
        if (
          diffFromResults.length > 0 &&
          result.node.formJsonByFormId.slug === formJsonByFormId.slug
        ) {
          diffFrom = result.node.formResult;
        }
      });

      const lhs = diffFrom;
      const rhs = diffTo.node.formResult;
      const differences = diff(lhs, rhs);

      if (differences) {
        // Populate the diffPathArray and diffArray
        differences.forEach((difference) => {
          if (difference.kind === 'A') {
            // Array differences
            const arrayElementPath = [
              formIdPrefix,
              ...(difference.path ?? []),
              difference.index
            ].join('_');
            if (difference.item.kind === 'N') {
              // Added an element to the array
              Object.keys(difference.item.rhs).forEach((key) => {
                newIdDiffMap[`${arrayElementPath}_${key}`] = {
                  lhs: null,
                  rhs: difference.item.rhs[key]
                };
              });
            } else if (difference.item.kind === 'D') {
              console.log(difference);
              const deletedItem = {};
              // Deleted an element from the array
              Object.keys(difference.item.lhs).forEach((key) => {
                deletedItem[key] = null;
                newIdDiffMap[`${arrayElementPath}_${key}`] = {
                  lhs: difference.item.lhs[key],
                  rhs: null
                };
              });
              if (Array.isArray(newFormData) && !difference.path) {
                newFormData = [
                  ...newFormData.slice(0, difference.index),
                  difference.item.lhs,
                  ...newFormData.slice(difference.index)
                ];
              }
            }
          } else if (difference.path) {
            const {lhs, rhs} = difference;
            newIdDiffMap[[formIdPrefix, ...difference.path].join('_')] = {
              lhs,
              rhs
            };
          }
        });
      }
    }
    setFormData(newFormData);
    setIdDiffMap(newIdDiffMap);
  }, [
    formResult.formJsonByFormId.slug,
    formResult.formResult,
    diffFromResults,
    showDiff
  ]);

  const classTag = formJsonByFormId.slug;
  // Override submit button for each form with an empty fragment
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const buttonOverride = <></>;

  return (
    <Card
      style={{width: '100%', marginBottom: '10px'}}
      className={`${classTag} summary-card`}
    >
      <Card.Header className="summary-form-header">
        <Row>
          <Col md={6}>
            <h2>{formJsonByFormId.name}</h2>
          </Col>
          <Col md={1} style={{textAlign: 'right'}}>
            <Button
              aria-label="toggle-card-open"
              title="expand or collapse the card"
              variant="outline-dark"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? '+' : '-'}
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
            onChange={handleChange}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            formData={formData}
            formContext={{
              query,
              showDiff,
              idDiffMap
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
  `
});
