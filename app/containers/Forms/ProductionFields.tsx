import React, {useState, useEffect} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {createFragmentContainer, graphql} from 'react-relay';
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

  const handleProductChange = (product: string) => {
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

  const [productFieldSchema] = useState<JSONSchema6>({
    ...(schema.properties.product as JSONSchema6),
    enum: query.allProducts.edges.map(({node}) => node.name)
  });

  return (
    <>
      <FieldTemplate
        required
        hidden={false}
        id="product.product"
        classNames="form-group field field-string"
        label={productFieldSchema.title}
        schema={productFieldSchema}
        uiSchema={uiSchema.product || {}}
        formContext={formContext}
      >
        <registry.fields.StringField
          required
          disabled={false}
          readonly={false}
          schema={productFieldSchema}
          uiSchema={uiSchema.product}
          formData={formData.product}
          autofocus={autofocus}
          idSchema={idSchema}
          registry={registry}
          errorSchema={errorSchema}
          formContext={formContext}
          name="product"
          onChange={handleProductChange}
        />
      </FieldTemplate>
      <FieldTemplate
        required
        hidden={false}
        id="product.allocationFactor"
        classNames="form-group field field-number"
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
          <FieldTemplate
            required
            hidden={false}
            id="product.quantity"
            classNames="form-group field field-number"
            label={(schema.properties.quantity as JSONSchema6).title}
            schema={schema.properties.quantity as JSONSchema6}
            uiSchema={uiSchema.quantity || {}}
            formContext={formContext}
          >
            <registry.fields.NumberField
              required
              schema={schema.properties.quantity as JSONSchema6}
              uiSchema={uiSchema.quantity}
              formData={formData.quantity}
              autofocus={autofocus}
              idSchema={idSchema}
              registry={registry}
              errorSchema={errorSchema}
              formContext={formContext}
              disabled={disabled}
              readonly={readonly}
              name="quantity"
              onChange={quantity => {
                onChange({
                  ...formData,
                  quantity
                });
              }}
            />
          </FieldTemplate>
          <FieldTemplate
            required={false}
            hidden={false}
            id="product.productUnits"
            classNames="form-group field field-string"
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
