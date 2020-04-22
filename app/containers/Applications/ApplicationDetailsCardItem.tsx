import React, {useState, useMemo} from 'react';
import {Button, Card, Collapse, Col, Row} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm, {FieldProps} from 'react-jsonschema-form';
import {FormJson} from 'next-env';
import {ApplicationDetailsCardItem_formResult} from '__generated__/ApplicationDetailsCardItem_formResult.graphql';
import {ApplicationDetailsCardItem_query} from '__generated__/ApplicationDetailsCardItem_query.graphql';
import diff from 'deep-diff';
import customFields from 'components/Application/ApplicationDetailsCardItemCustomFields';
import SummaryFormArrayFieldTemplate from 'containers/Forms/SummaryFormArrayFieldTemplate';
import SummaryFormFieldTemplate from 'containers/Forms/SummaryFormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import ApplicationReviewContainer from './ApplicationReviewContainer';

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

  // Expands or collapses the form_result card
  const [isOpen, setIsOpen] = useState(false);

  // The array of paths to each difference between diffFrom result & diffTo result (each path matches up with idSchema)
  const diffPathArray = [];
  // The array of differences
  const diffArray = [];
  // If the diffFrom result is empty, there is no path. This flag gives us control over what to show in the diff in that case.
  let previousIsEmpty = false;

  let diffTo;
  // Select the correct form result to diff to by matching formJson slugs
  diffToResults.forEach(result => {
    if (result.node.formJsonByFormId.slug === formJsonByFormId.slug)
      diffTo = result;
  });

  useMemo(() => {
    if (diffFromResults && showDiff) {
      let diffFrom;
      // Select the correct form result to diff from by matching formJson slugs
      diffFromResults.forEach(result => {
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

      // These are the default values for empty form results. If the form results for the diffFrom are empty, set the previousIsEmpty flag
      if (
        JSON.stringify(diffFrom) === '[]' ||
        JSON.stringify(diffFrom) === '{}' ||
        JSON.stringify(diffFrom) === '[{}]'
      ) {
        previousIsEmpty = true;
      } else if (differences) {
        // Populate the diffPathArray and diffArray
        differences.forEach(difference => {
          if (difference.path) {
            diffPathArray.push(difference.path.join('_'));
            diffArray.push(difference.lhs);
          }
        });
      }
    }
  }, [
    diffArray,
    diffPathArray,
    formResult.formJsonByFormId.slug,
    formResult.formResult,
    diffFromResults,
    showDiff
  ]);

  // Some formData values are numbers that map to enums, this function uses the number values to return the enum names stored in the schema
  const handleEnums = (props, isCurrent, prevValue) => {
    if (props.schema.enum && props.schema.enumNames) {
      // TODO: needs a fix on jsonschema types (missing enumNames)
      const enumIndex = isCurrent
        ? props.schema.enum.indexOf(props.formData)
        : props.schema.enum.indexOf(prevValue);
      if (enumIndex === -1 && isCurrent) return props.formData;
      if (enumIndex === -1 && !isCurrent) return '[No Data Entered]';
      return props.schema.enumNames[enumIndex];
    }

    if (isCurrent) return props.formData;

    return prevValue;
  };

  const CUSTOM_FIELDS: Record<
    string,
    React.FunctionComponent<FieldProps>
  > = customFields(
    showDiff,
    diffPathArray,
    diffArray,
    handleEnums,
    previousIsEmpty,
    setHasErrors
  );
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
            <h4>{formJsonByFormId.name}</h4>
          </Col>
          {review ? (
            <Col md={{span: 2, offset: 3}}>
              <ApplicationReviewContainer
                formName={formJsonByFormId.name}
                formResultId={formResult.id}
                formResultStatus={formResult.formResultStatuses}
                versionNumber={formResult.versionNumber}
              />
            </Col>
          ) : null}
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
            fields={CUSTOM_FIELDS}
            customFormats={customFormats}
            schema={schema}
            uiSchema={uiSchema}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            formData={review ? diffTo.node.formResult : formResult.formResult}
            formContext={{
              query,
              showDiff,
              diffPathArray,
              diffArray,
              previousIsEmpty
            }}
          >
            {buttonOverride}
          </JsonSchemaForm>
        </Card.Body>
      </Collapse>
      <style jsx global>{`
        .diffFrom {
          background-color: rgba(243, 76, 96, 0.3);
        }
        .diffTo {
          background-color: rgba(70, 241, 118, 0.3);
        }
        .summary-form-header > .row {
          justify-content: space-between;
        }
      `}</style>
    </Card>
  );
};

export default createFragmentContainer(ApplicationDetailsCardItemComponent, {
  formResult: graphql`
    fragment ApplicationDetailsCardItem_formResult on FormResult {
      id
      formResult
      versionNumber
      formJsonByFormId {
        name
        slug
        formJson
      }
      formResultStatuses {
        ...ApplicationReviewContainer_formResultStatus
      }
    }
  `,
  query: graphql`
    fragment ApplicationDetailsCardItem_query on Query {
      ...ProductField_query
      ...ProductRowIdField_query
      ...FuelField_query
      ...FuelRowIdField_query
    }
  `
});
