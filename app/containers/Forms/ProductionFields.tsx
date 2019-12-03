import React, {useState, useEffect} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
import {Form, Col, FormControlProps} from 'react-bootstrap';
import {ProductionFields_query} from 'ProductionFields_query.graphql';
import {FormJson} from 'next-env';

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
  readonly
}) => {
  const handleProductChange: FormControlProps['onChange'] = e => {
    const product = (e.nativeEvent.target as HTMLSelectElement).value;
    onChange({
      ...formData,
      product,
      productUnits: query.allProducts.edges.find(
        ({node}) => node.name === product
      )?.node.units,
      additionalData: undefined
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
      <Col xs={12} md={4}>
        <Form.Group controlId="id.associatedEmissions">
          <Form.Label>Associated Emissions (tCO2e)</Form.Label>
          <Form.Control
            type="number"
            defaultValue={formData.associatedEmissions}
            onChange={e => {
              onChange({
                ...formData,
                associatedEmissions: Number(
                  (e.nativeEvent.target as HTMLInputElement).value
                )
              });
            }}
          />
        </Form.Group>
      </Col>
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
          <Col xs={12} md={2}>
            &nbsp;{formData.productUnits}
          </Col>
        </>
      )}
      {additionalDataSchema && (
        <Col xs={12} md={12}>
          <registry.fields.SchemaField
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
            name=""
            onChange={handleAdditionalFieldsChange}
          />
        </Col>
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
