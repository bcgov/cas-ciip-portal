import React, {useState, useEffect} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {Form, Col, FormControlProps} from 'react-bootstrap';
import {ProductionFields_query} from 'ProductionFields_query.graphql';
import {FormJson} from 'next-env';
import {JSONSchema6} from 'json-schema';

interface Props extends FieldProps {
  query: ProductionFields_query;
}

const ProductionFields: React.FunctionComponent<Props> = ({
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
    FieldTemplate
  }: {
    FieldTemplate: React.FunctionComponent<any>;
  } = registry as any;
  // Not using the types definded in @types/react-jsonschema-form as they are out of date

  const handleProductChange: FormControlProps['onChange'] = e => {
    const product = (e.nativeEvent.target as HTMLSelectElement).value;
    const productUnits = query.allProducts.edges.find(
      ({node}) => node.name === product
    )?.node.units;
    onChange({
      ...formData,
      product,
      productUnits,
      additionalData: {productUnits}
    });
  };

  const handleAdditionalFieldsChange = (additionalData: any) => {
    console.log({
      ...formData,
      additionalData
    });
    // TODO: execute formula here.
    onChange({
      ...formData,
      additionalData
    });
  };

  const [additionalDataSchema, setAdditionalDataSchema] = useState<FormJson>();
  useEffect(() => {
    const product = query.allProducts.edges.find(
      ({node}) => node.name === formData.product
    )?.node;
    setAdditionalDataSchema(
      product?.productFormByProductFormId?.productFormSchema
    );
  }, [query.allProducts.edges, formData.product]);

  return (
    <>
      <Col xs={12} md={8}>
        <Form.Group controlId="id.product">
          <Form.Label>Product or Service</Form.Label>
          <Form.Control
            as="select"
            value={formData.product}
            onChange={handleProductChange}
          >
            <option value="">...</option>
            {query.allProducts.edges.map(({node}) => (
              <option key={node.name}>{node.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <FieldTemplate
        required
        hidden={false}
        id="product.allocationFactor"
        classNames=""
        label={(schema.properties.allocationFactor as JSONSchema6).title}
        schema={schema.properties.allocationFactor as JSONSchema6}
        uiSchema={uiSchema.allocationFactor || {}}
        formContext={formContext}
      >
        <registry.fields.NumberField
          required
          schema={schema.properties.allocationFactor as JSONSchema6}
          uiSchema={uiSchema.allocationFactor}
          formData={formData.allocationFactor}
          autofocus={autofocus}
          idSchema={idSchema}
          registry={registry}
          errorSchema={errorSchema}
          formContext={formContext}
          disabled={disabled}
          readonly={readonly}
          name="allocationFactor"
          onChange={allocationFactor => {
            onChange({
              ...formData,
              allocationFactor
            });
          }}
        />
      </FieldTemplate>
      {!additionalDataSchema && (
        <>
          <Col xs={12} md={6}>
            <Form.Group controlId="id.quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                defaultValue={formData.quantity}
                onChange={e => {
                  onChange({
                    ...formData,
                    quantity: Number(
                      (e.nativeEvent.target as HTMLInputElement).value
                    )
                  });
                }}
              />
            </Form.Group>
          </Col>
          <FieldTemplate
            required={false}
            hidden={false}
            id="product.productUnits"
            classNames=""
            label={(schema.properties.productUnits as JSONSchema6).title}
            schema={schema.properties.productUnits as JSONSchema6}
            uiSchema={uiSchema.productUnits || {}}
            formContext={formContext}
          >
            <registry.fields.StringField
              disabled
              readonly
              required={false}
              schema={schema.properties.productUnits as JSONSchema6}
              uiSchema={uiSchema.productUnits}
              formData={formData.productUnits}
              autofocus={autofocus}
              idSchema={idSchema}
              registry={registry}
              errorSchema={errorSchema}
              formContext={formContext}
              name="units"
              onChange={null}
            />
          </FieldTemplate>
        </>
      )}
      {additionalDataSchema && (
        <registry.fields.ObjectField
          required
          schema={additionalDataSchema.schema}
          uiSchema={additionalDataSchema.uiSchema}
          formData={formData.additionalData}
          autofocus={autofocus}
          idSchema={idSchema}
          registry={registry}
          errorSchema={errorSchema}
          formContext={formContext}
          disabled={disabled}
          readonly={readonly}
          name={null}
          onChange={handleAdditionalFieldsChange}
        />
      )}
    </>
  );
};

export default createFragmentContainer(ProductionFields, {
  query: graphql`
    fragment ProductionFields_query on Query {
      allProducts(condition: {state: "active"}) {
        edges {
          node {
            name
            units
            productFormByProductFormId {
              productFormSchema
            }
          }
        }
      }
    }
  `
});
