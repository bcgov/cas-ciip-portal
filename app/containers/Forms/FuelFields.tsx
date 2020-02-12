import React from 'react';
import {FieldProps, IdSchema} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {Form, Col} from 'react-bootstrap';
import {FuelFields_query} from 'FuelFields_query.graphql';
import SearchDropdown from 'components/SearchDropdown';
import {JSONSchema6} from 'json-schema';
import ErrorList from 'components/Forms/ErrorList';

interface Props extends FieldProps {
  query: FuelFields_query;
}

const FuelFields: React.FunctionComponent<Props> = ({
  formData,
  query,
  onChange,
  registry,
  autofocus,
  idSchema,
  errorSchema,
  formContext,
  disabled,
  readonly,
  schema,
  uiSchema
}) => {
  const {
    properties: {quantity: quantitySchema}
  } = schema as {properties: Record<string, JSONSchema6>};

  const {
    FieldTemplate
  }: {
    FieldTemplate: React.FunctionComponent<any>;
  } = registry as any;
  const changeField = (event, key) => {
    onChange({
      ...formData,
      [key]: (event.nativeEvent.target as HTMLInputElement).value
    });
  };

  return (
    <>
      <Col xs={12} md={6}>
        <Form.Group controlId="id.fuelType">
          <Form.Label>Fuel Type</Form.Label>
          <SearchDropdown
            errorSchema={errorSchema}
            placeholder="Select fuel or type to filter..."
            defaultInputValue={formData.fuelType}
            options={query.allFuels.edges.map(({node}) => ({
              id: node.rowId,
              name: node.name
            }))}
            inputProps={{id: 'id.fuelType'}}
            onChange={(items: any[]) => {
              if (items.length > 0) {
                onChange({
                  ...formData,
                  fuelType: items[0].name,
                  fuelUnits: undefined
                });
              }
            }}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={4}>
        <FieldTemplate
          required={schema?.required?.includes('quantity')}
          hidden={false}
          id="fuel.quantity"
          classNames="form-group field field-number"
          label={quantitySchema.title}
          schema={quantitySchema}
          uiSchema={uiSchema.quantity || {}}
          formContext={formContext}
          help={uiSchema.quantity?.['ui:help']}
          errors={<ErrorList errors={errorSchema?.quantity?.__errors as any} />}
        >
          <registry.fields.NumberField
            required={schema?.required?.includes('quantity')}
            schema={quantitySchema}
            uiSchema={uiSchema.quantity}
            formData={formData.quantity}
            autofocus={autofocus}
            idSchema={idSchema.quantity as IdSchema}
            registry={registry}
            errorSchema={errorSchema?.quantity}
            formContext={formContext}
            disabled={disabled}
            readonly={readonly}
            name="fuelQuantity"
            onChange={value =>
              onChange({
                ...formData,
                quantity: value
              })
            }
          />
        </FieldTemplate>
      </Col>
      <Col xs={12} md={2}>
        <Form.Group controlId="id.fuelUnits">
          <Form.Label>Units</Form.Label>
          <Form.Control
            as="select"
            value={formData.fuelUnits}
            isInvalid={Boolean(errorSchema.fuelUnits)}
            onChange={e => changeField(e, 'fuelUnits')}
          >
            <option value="">...</option>
            {query.allFuels.edges
              .filter(({node}) => node.name === formData.fuelType)
              .map(({node}) => (
                <option key={node.name}>{node.units}</option>
              ))}
          </Form.Control>
          <Form.Control.Feedback style={{fontSize: '16px'}} type="invalid">
            <ErrorList errors={errorSchema?.fuelUnits?.__errors as any} />
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col xs={12} md={6}>
        <Form.Group controlId="id.methodology">
          <Form.Label>Methodology</Form.Label>
          <Form.Control
            as="select"
            value={formData.methodology}
            isInvalid={Boolean(errorSchema.methodology)}
            onChange={e => changeField(e, 'methodology')}
          >
            <option value="">...</option>
            {(schema.properties.methodology as any).enum.map((e, i) => (
              <option key={e} value={e}>
                {(schema.properties.methodology as any).enumNames[i]}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback style={{fontSize: '16px'}} type="invalid">
            <ErrorList errors={errorSchema?.methodology?.__errors as any} />
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </>
  );
};

export default createFragmentContainer(FuelFields, {
  query: graphql`
    fragment FuelFields_query on Query {
      allFuels {
        edges {
          node {
            name
            units
            rowId
          }
        }
      }
    }
  `
});
