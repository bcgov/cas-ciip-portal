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

  if (formJsonByFormId.slug === 'emission') return null;

  const extensibleUISchema = JSON.parse(JSON.stringify(uiSchema));
  if (review) {
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

    const iterate = (obj, iteratedPathArray, difference, originalPathArray) => {
      let key = iteratedPathArray[0];
      if (difference.lhs === undefined) difference.lhs = 'NO DATA ENTERED';
      if (difference.lhs === '') difference.lhs += 'NO DATA ENTERED';
      if (typeof key === 'number') {
        if (difference.kind === 'N') difference.lhs = 'NO DATA ENTERED';
        key = iteratedPathArray[1];

        if (typeof obj.items[key] === 'object' && iteratedPathArray.length > 2)
          iterate(
            obj.items[key],
            iteratedPathArray.slice(1),
            difference,
            originalPathArray
          );
        else {
          Object.assign(obj.items, {
            [key]: {
              'ui:previousPath': originalPathArray,
              'ui:previous': difference.lhs
            }
          });
        }
      } else if (typeof obj[key] === 'object' && iteratedPathArray.length > 1) {
        iterate(
          obj[key],
          iteratedPathArray.slice(1),
          difference,
          originalPathArray
        );
      } else if (formJsonByFormId.slug === 'admin') {
        Object.assign(obj, {
          [key]: {
            'ui:previous': difference.lhs
          }
        });
      } else {
        Object.assign(obj, {
          [key]: {
            'ui:previous': difference.lhs,
            'ui:previousPath': originalPathArray
          }
        });
      }
    };

    if (differences) {
      differences.forEach(difference => {
        const pathArray = [];
        if (difference.path) {
          difference.path.forEach(pathItem => {
            pathArray.push(pathItem);
          });
          const extensibleDifference = JSON.parse(JSON.stringify(difference));
          iterate(
            extensibleUISchema,
            pathArray,
            extensibleDifference,
            pathArray
          );
        }
      });
    }
  }

  function arraysAreEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;

    for (const [i, element] of a.entries()) {
      if (element !== b[i]) return false;
    }

    return true;
  }

  const handleEnums = (props, isCurrent) => {
    if (props.schema.enum && props.schema.enumNames) {
      // TODO: needs a fix on jsonschema types (missing enumNames)

      const enumIndex = isCurrent
        ? props.schema.enum.indexOf(props.formData)
        : props.schema.enum.indexOf(props.uiSchema['ui:previous']);
      if (enumIndex === -1) return props.formData;
      return props.schema.enumNames[enumIndex];
    }

    if (isCurrent) return props.formData;

    return props.uiSchema['ui:previous'];
  };

  const CUSTOM_FIELDS: Record<string, React.FunctionComponent<FieldProps>> = {
    TitleField: props => <h3>{props.title}</h3>,
    StringField: props => {
      if (props.uiSchema && props.uiSchema['ui:previousPath']) {
        const field =
          props.uiSchema['ui:previousPath'][
            props.uiSchema['ui:previousPath'].length - 1
          ];
        let idString: any;
        const hasIdSchemaProperty = Object.prototype.hasOwnProperty.call(
          props.idSchema,
          field
        );
        if (hasIdSchemaProperty) {
          idString = props.idSchema[field].$id.replace(/^\D+/g, '');
        } else {
          idString = props.idSchema.$id.replace(/^root_/g, '');
        }

        const idArray: [any] = idString.split('_');
        idArray.forEach((item, index) => {
          const numberItem = parseInt(item, 10);
          if (Number.isInteger(numberItem)) {
            idArray[index] = parseInt(item, 10);
          }
        });
        if (
          showDiff &&
          arraysAreEqual(idArray, props.uiSchema['ui:previousPath'])
        ) {
          const prevValue = handleEnums(props, false);
          const currentValue = handleEnums(props, true);
          return (
            <>
              <span style={{backgroundColor: '#ffeef0'}}>{prevValue}</span>
              &nbsp;---&gt;&nbsp;
              <span style={{backgroundColor: '#e6ffed'}}>
                {props.formData ? currentValue : <i>[No Data Entered]</i>}
              </span>
            </>
          );
        }
      } else if (showDiff && props.uiSchema && props.uiSchema['ui:previous']) {
        const prevValue = handleEnums(props, false);
        const currentValue = handleEnums(props, true);

        return (
          <>
            <span style={{backgroundColor: '#ffeef0'}}>{prevValue}</span>
            &nbsp;---&gt;&nbsp;
            <span style={{backgroundColor: '#e6ffed'}}>
              {currentValue ? currentValue : <i>[No Data Entered]</i>}
            </span>
          </>
        );
      }

      if (
        props.formData === null ||
        props.formData === undefined ||
        props.formData === ''
      )
        return <i>[No Data Entered]</i>;

      const value = handleEnums(props, true);

      return value;
    },
    BooleanField: ({formData, uiSchema}) => {
      if (showDiff && uiSchema && uiSchema['ui:previous'] !== undefined) {
        return (
          <>
            <span style={{backgroundColor: '#ffeef0'}}>
              {uiSchema['ui:previous'] ? 'Yes' : 'No'}
            </span>
            &nbsp;---&gt;&nbsp;
            <span style={{backgroundColor: '#e6ffed'}}>
              {formData ? 'Yes' : 'No'}
            </span>
          </>
        );
      }

      return <>{formData ? 'Yes' : 'No'} </>;
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
