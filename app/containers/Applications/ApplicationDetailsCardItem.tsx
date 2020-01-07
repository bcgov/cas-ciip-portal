import React, {useState} from 'react';
import {Button, Card, Collapse, Col, Row, Form} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm, {FieldProps} from 'react-jsonschema-form';
import {FormJson} from 'next-env';
import ProductionFields from 'containers/Forms/ProductionFields';
import {ApplicationDetailsCardItem_formResult} from '__generated__/ApplicationDetailsCardItem_formResult.graphql';
import {ApplicationDetailsCardItem_query} from '__generated__/ApplicationDetailsCardItem_query.graphql';
import diff from 'deep-diff';
import SummaryFormArrayFieldTemplate from '../Forms/SummaryFormArrayFieldTemplate';
import SummaryFormFieldTemplate from '../Forms/SummaryFormFieldTemplate';
import SummaryEmissionGasFields from '../Forms/SummaryEmissionGasFields';
import SummaryEmissionSourceFields from '../Forms/SummaryEmissionSourceFields';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';

interface Props {
  formResult: ApplicationDetailsCardItem_formResult;
  previousFormResults?: any;
  query: ApplicationDetailsCardItem_query;
  review: boolean;
}

/*
 * The ApplicationDetails renders a summary of the data submitted in the application
 */
export const ApplicationDetailsCardItemComponent: React.FunctionComponent<Props> = ({
  formResult,
  previousFormResults,
  query,
  review
}) => {
  const {formJsonByFormId} = formResult;
  const {formJson} = formJsonByFormId;
  const {schema, uiSchema, customFormats} = formJson as FormJson;

  const [isOpen, setIsOpen] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  const diffPathArray = [];
  const diffArray = [];

  const extensibleUISchema = JSON.parse(JSON.stringify(uiSchema));
  if (review && previousFormResults) {
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

  const CUSTOM_FIELDS: Record<string, React.FunctionComponent<FieldProps>> = {
    TitleField: props => <h3>{props.title}</h3>,
    StringField: props => {
      let prevValue;
      let hasDiff = false;
      if (showDiff) {
        hasDiff = diffPathArray.includes(
          props.idSchema.$id.replace(/^root_/g, '')
        );
        prevValue =
          diffArray[
            diffPathArray.indexOf(props.idSchema.$id.replace(/^root_/g, ''))
          ];
        if (hasDiff) {
          prevValue = handleEnums(props, false, prevValue);
          const currentValue = handleEnums(props, true, prevValue);

          return (
            <>
              <span style={{backgroundColor: '#ffeef0'}}>
                {prevValue ? prevValue : <i>[No Data Entered]</i>}
              </span>
              &nbsp;---&gt;&nbsp;
              <span style={{backgroundColor: '#e6ffed'}}>
                {currentValue ? currentValue : <i>[No Data Entered]</i>}
              </span>
            </>
          );
        }
      }

      if (
        props.formData === null ||
        props.formData === undefined ||
        props.formData === ''
      )
        return <i>[No Data Entered]</i>;

      const value = handleEnums(props, true, prevValue);
      return value;
    },
    BooleanField: props => {
      const hasDiff = diffPathArray.includes(
        props.idSchema.$id.replace(/^root_/g, '')
      );

      if (showDiff && hasDiff) {
        const prevValue =
          diffArray[
            diffPathArray.indexOf(props.idSchema.$id.replace(/^root_/g, ''))
          ];
        return (
          <>
            <span style={{backgroundColor: '#ffeef0'}}>
              {prevValue ? 'Yes' : 'No'}
            </span>
            &nbsp;---&gt;&nbsp;
            <span style={{backgroundColor: '#e6ffed'}}>
              {props.formData ? 'Yes' : 'No'}
            </span>
          </>
        );
      }

      return <>{props.formData ? 'Yes' : 'No'} </>;
    },
    emissionSource: props => <SummaryEmissionSourceFields {...props} />,
    emissionGas: props => <SummaryEmissionGasFields {...props} />,
    production: props => (
      <ProductionFields query={props.formContext.query} {...props} />
    )
  };
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
          <Col md={{span: 2, offset: 3}}>
            {review ? (
              <Form.Check
                label="Show Diff?"
                checked={showDiff}
                type="checkbox"
                onChange={() => setShowDiff(!showDiff)}
              />
            ) : null}
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
            uiSchema={extensibleUISchema}
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
      ...ProductionFields_query
    }
  `
});
