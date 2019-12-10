import React, {useState, useCallback} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import ErrorList from 'components/Forms/ErrorList';

import {createFragmentContainer, graphql} from 'react-relay';
import {ProductionFields_query} from 'ProductionFields_query.graphql';
import {JSONSchema6} from 'json-schema';
import {FormJson} from 'next-env';

interface Props extends FieldProps {
  formData: {
    productRowId?: number;
    quantity?: number;
    productUnits?: string;
    allocationFactor?: number;
    additionalData?: any;
  };
  query: ProductionFields_query;
}

/**
 * Displays the information related to a product, and loads the additional data schema for products that need it.
 * By using the registry (which contains, for instance, the form's FieldTemplate and StringField)
 * this allows for this component to be reused in both the Form and the ApplicationDetailsCardItem components.
 * It will either render inputs or the values based on what is defined in the current jsonschema form registry.
 */
export const ProductionFieldsComponent: React.FunctionComponent<Props> = ({
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

  const handleProductChange = (productRowId: number) => {
    const productUnits = query.allProducts.edges.find(
      ({node}) => node.rowId === productRowId
    )?.node.units;
    onChange({
      ...formData,
      productRowId,
      productUnits,
      additionalData: {productUnits}
    });
  };

  const handleQuantityChange = quantity => {
    onChange({
      ...formData,
      quantity
    });
  };

  const handleAllocationFactorChange = allocationFactor => {
    onChange({
      ...formData,
      allocationFactor
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

  const handleProductUnitsChange = () => {
    throw new Error('Product units cannot be changed');
  };

  const getAdditionalDataSchema = useCallback(() => {
    return query.allProducts.edges.find(
      ({node}) => node.rowId === formData.productRowId
    )?.node?.productFormByProductFormId?.productFormSchema as FormJson;
  }, [formData.productRowId, query.allProducts.edges]);

  const [productFieldSchema] = useState({
    ...(schema.properties.productRowId as JSONSchema6),
    enum: query.allProducts.edges.map(({node}) => node.rowId),
    enumNames: query.allProducts.edges.map(({node}) => node.name)
  });

  return (
    <>
      <FieldTemplate
        required
        hidden={false}
        id="product.productRowId"
        classNames="form-group field field-string"
        label={productFieldSchema.title}
        schema={productFieldSchema}
        uiSchema={uiSchema.product || {}}
        formContext={formContext}
        errors={
          <ErrorList errors={errorSchema?.productRowId?.__errors as any} />
        }
      >
        <registry.fields.StringField
          required
          disabled={false}
          readonly={false}
          schema={productFieldSchema}
          uiSchema={uiSchema.productRowId}
          formData={formData.productRowId}
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
        help={uiSchema.allocationFactor?.['ui:help']}
        errors={
          <ErrorList errors={errorSchema?.allocationFactor?.__errors as any} />
        }
      >
        <registry.fields.NumberField
          required
          schema={schema.properties.allocationFactor as JSONSchema6}
          uiSchema={uiSchema.allocationFactor}
          formData={formData.allocationFactor}
          autofocus={autofocus}
          idSchema={idSchema}
          registry={registry}
          errorSchema={errorSchema?.allocationFactor}
          formContext={formContext}
          disabled={disabled}
          readonly={readonly}
          name="allocationFactor"
          onChange={handleAllocationFactorChange}
        />
      </FieldTemplate>
      {!getAdditionalDataSchema() && (
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
            errors={
              <ErrorList errors={errorSchema?.quantity?.__errors as any} />
            }
          >
            <registry.fields.NumberField
              required
              schema={schema.properties.quantity as JSONSchema6}
              uiSchema={uiSchema.quantity}
              formData={formData.quantity}
              autofocus={autofocus}
              idSchema={idSchema}
              registry={registry}
              errorSchema={errorSchema?.quantity}
              formContext={formContext}
              disabled={disabled}
              readonly={readonly}
              name="quantity"
              onChange={handleQuantityChange}
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
            errors={
              <ErrorList errors={errorSchema?.productUnits?.__errors as any} />
            }
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
              name="productUnits"
              onChange={handleProductUnitsChange}
            />
          </FieldTemplate>
        </>
      )}
      {getAdditionalDataSchema() && (
        <registry.fields.ObjectField
          required
          schema={getAdditionalDataSchema().schema}
          uiSchema={getAdditionalDataSchema().uiSchema}
          formData={formData.additionalData}
          autofocus={autofocus}
          idSchema={idSchema}
          registry={registry}
          errorSchema={errorSchema?.additionalData}
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

export default createFragmentContainer(ProductionFieldsComponent, {
  query: graphql`
    fragment ProductionFields_query on Query {
      allProducts(condition: {state: "active"}) {
        edges {
          node {
            rowId
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
