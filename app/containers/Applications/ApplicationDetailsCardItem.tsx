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

  let previousFormResult;
  previousFormResults.forEach(result => {
    if (
      previousFormResults.length > 0 &&
      result.node.formJsonByFormId.slug === formResult.formJsonByFormId.slug
    ) {
      previousFormResult = result.node.formResult;
    }
  });

  const rhs = previousFormResult;
  const lhs = formResult.formResult;
  const differences = diff(lhs, rhs);

  const extensibleUISchema = JSON.parse(JSON.stringify(uiSchema));

  const iterate = (obj, pathArray, previousValue) => {
    const key = pathArray[0];
    if (typeof obj[key] === 'object') {
      iterate(obj[key], pathArray.slice(1), previousValue);
    } else {
      Object.assign(obj, {
        [key]: {
          'ui:previous': previousValue
        }
      });
    }
  };

  if (differences) {
    differences.forEach(difference => {
      const pathArray = [];
      difference.path.forEach(pathItem => {
        pathArray.push(pathItem);
      });
      iterate(extensibleUISchema, pathArray, difference.rhs);
    });
  }

  const CUSTOM_FIELDS: Record<string, React.FunctionComponent<FieldProps>> = {
    TitleField: props => <h3>{props.title}</h3>,
    StringField: ({formData, schema, uiSchema}) => {
      if (showDiff && uiSchema && uiSchema['ui:previous']) {
        return (
          <>
            <span style={{backgroundColor: '#ffeef0'}}>
              {uiSchema['ui:previous']}
            </span>
            &nbsp;---&gt;&nbsp;
            <span style={{backgroundColor: '#e6ffed'}}>
              {formData ? formData : <i>[No Data Entered]</i>}
            </span>
          </>
        );
      }

      if (formData === null || formData === undefined)
        return <i>[No Data Entered]</i>;

      if (schema.enum && (schema as any).enumNames) {
        // TODO: needs a fix on jsonschema types (missing enumNames)
        const enumIndex = schema.enum.indexOf(formData);
        if (enumIndex === -1) return formData;
        return (schema as any).enumNames[enumIndex];
      }

      return formData;
    },
    BooleanField: props => <> {props.formData ? 'Yes' : 'No'}</>,
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
            <Form.Check
              label="Show Diff?"
              checked={showDiff}
              type="checkbox"
              onChange={() => setShowDiff(!showDiff)}
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
            uiSchema={extensibleUISchema}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            formData={formResult.formResult}
            formContext={{query, showDiff}}
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
