import React, {useState, useMemo} from 'react';
import {Button, Card, Collapse, Col, Row, Form} from 'react-bootstrap';
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
  formResult: ApplicationDetailsCardItem_formResult;
  previousFormResults?: any;
  query: ApplicationDetailsCardItem_query;
}

/*
 * The ApplicationDetails renders a summary of the data submitted in the application
 */
export const ApplicationDetailsCardItemComponent: React.FunctionComponent<Props> = ({
  formResult,
  previousFormResults,
  query
}) => {
  const {formJsonByFormId} = formResult;
  const {formJson} = formJsonByFormId;
  const {schema, uiSchema, customFormats} = formJson as FormJson;

  const [isOpen, setIsOpen] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  const diffPathArray = [];
  const diffArray = [];
  useMemo(() => {
    if (previousFormResults && showDiff) {
      let previousFormResult;
      previousFormResults.forEach(result => {
        if (
          previousFormResults.length > 0 &&
          result.node.formJsonByFormId.slug === formResult.formJsonByFormId.slug
        ) {
          previousFormResult = result.node.formResult;
        }
      });

      const lhs = previousFormResult;
      const rhs = formResult.formResult;
      const differences = diff(lhs, rhs);

      if (differences) {
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
    previousFormResults,
    showDiff
  ]);

  const handleEnums = (props, isCurrent, prevValue) => {
    if (props.schema.enum && props.schema.enumNames) {
      // TODO: needs a fix on jsonschema types (missing enumNames)
      const enumIndex = isCurrent
        ? props.schema.enum.indexOf(props.formData)
        : props.schema.enum.indexOf(prevValue);
      if (enumIndex === -1) return props.formData;
      return props.schema.enumNames[enumIndex];
    }

    if (isCurrent) return props.formData;

    return prevValue;
  };

  const CUSTOM_FIELDS: Record<
    string,
    React.FunctionComponent<FieldProps>
  > = customFields(showDiff, diffPathArray, diffArray, handleEnums);
  const classTag = formJsonByFormId.slug;
  return (
    <Card
      style={{width: '100%', marginBottom: '10px'}}
      className={`${classTag} summary-card`}
    >
      <Card.Header>
        <Row>
          <Col md={6}>
            <h4>{formJsonByFormId.name}</h4>
          </Col>
          <Col md={2}>
            {previousFormResults ? (
              <Form.Check
                label="Show Diff?"
                checked={showDiff}
                type="checkbox"
                onChange={() => setShowDiff(!showDiff)}
              />
            ) : null}
          </Col>
          <Col md={{span: 2, offset: 1}}>
            <ApplicationReviewContainer
              formName={formJsonByFormId.name}
              formResultId={formResult.id}
              formResultStatus={
                formResult
                  .formResultStatusesByApplicationIdAndVersionNumberAndFormId
                  .edges[
                  formResult
                    .formResultStatusesByApplicationIdAndVersionNumberAndFormId
                    .edges.length - 1
                ].node
              }
            />
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
            ArrayFieldTemplate={SummaryFormArrayFieldTemplate}
            FieldTemplate={SummaryFormFieldTemplate}
            showErrorList={false}
            fields={CUSTOM_FIELDS}
            customFormats={customFormats}
            schema={schema}
            uiSchema={uiSchema}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            formData={formResult.formResult}
            formContext={{
              query,
              showDiff,
              diffPathArray,
              diffArray
            }}
          >
            {/* Over-ride submit button for each form with an empty fragment */}
            <></>
          </JsonSchemaForm>
        </Card.Body>
      </Collapse>
    </Card>
  );
};

export default createFragmentContainer(ApplicationDetailsCardItemComponent, {
  formResult: graphql`
    fragment ApplicationDetailsCardItem_formResult on FormResult {
      id
      formResult
      formJsonByFormId {
        name
        slug
        formJson
      }
      formResultStatusesByApplicationIdAndVersionNumberAndFormId {
        edges {
          node {
            ...ApplicationReviewContainer_formResultStatus
          }
        }
      }
    }
  `,
  query: graphql`
    fragment ApplicationDetailsCardItem_query on Query {
      ...ProductionFields_query
    }
  `
});
