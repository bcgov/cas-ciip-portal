import React, {useState} from 'react';
import {Button, Card, Collapse, Col, Row} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import JsonSchemaForm, {FieldProps} from 'react-jsonschema-form';
import {FormJson} from 'next-env';
import ProductionFields from 'containers/Forms/ProductionFields';
import {ApplicationDetailsCardItem_formResult} from '__generated__/ApplicationDetailsCardItem_formResult.graphql';
import {ApplicationDetailsCardItem_query} from '__generated__/ApplicationDetailsCardItem_query.graphql';
import SummaryFormArrayFieldTemplate from '../Forms/SummaryFormArrayFieldTemplate';
import SummaryFormFieldTemplate from '../Forms/SummaryFormFieldTemplate';
import SummaryEmissionGasFields from '../Forms/SummaryEmissionGasFields';
import SummaryEmissionSourceFields from '../Forms/SummaryEmissionSourceFields';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';

interface Props {
  formResult: ApplicationDetailsCardItem_formResult;
  query: ApplicationDetailsCardItem_query;
}

/*
 * The ApplicationDetails renders a summary of the data submitted in the application
 */
export const ApplicationDetailsCardItemComponent: React.FunctionComponent<Props> = ({
  formResult,
  query
}) => {
  const {formJsonByFormId} = formResult;
  const {formJson} = formJsonByFormId;
  const {schema, uiSchema, customFormats} = formJson as FormJson;

  const [isOpen, setIsOpen] = useState(false);

  const CUSTOM_FIELDS: Record<string, React.FunctionComponent<FieldProps>> = {
    TitleField: props => <h3>{props.title}</h3>,
    StringField: ({formData, schema}) => {
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
          <Col md={{span: 1, offset: 5}} style={{textAlign: 'right'}}>
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
            formContext={{query}}
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
