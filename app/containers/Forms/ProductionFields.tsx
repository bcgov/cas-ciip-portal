import React, {useMemo} from 'react';
import {FieldProps, IdSchema} from 'react-jsonschema-form';
import ErrorList from 'components/Forms/ErrorList';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductionFields_query} from 'ProductionFields_query.graphql';
import {JSONSchema6} from 'json-schema';

interface FormData {
  productRowId?: number;
  quantity?: number;
  productUnits?: string;
  productEmissions?: number;
  requiresEmissionAllocation?: boolean;
}

interface Props extends FieldProps<FormData> {
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
  // Not using the types defined in @types/react-jsonschema-form as they are out of date

  const {
    properties: {
      productEmissions: productEmissionsSchema,
      quantity: quantitySchema,
      productUnits: productUnitsSchema
    }
  } = schema as {properties: Record<string, JSONSchema6>};
  const handleProductChange = (productRowId: number) => {
    const product = query.allProducts.edges.find(
      ({node}) => node.rowId === productRowId
    )?.node;
    onChange({
      ...formData,
      productRowId,
      productUnits: product?.units,
      requiresEmissionAllocation: product?.requiresEmissionAllocation
    });
  };

  const handleQuantityChange = quantity => {
    onChange({
      ...formData,
      quantity
    });
  };

  /**
   * Updates the product's productEmissions.
   * @param productEmissions
   */
  const handleProductEmissionsChange = productEmissions => {
    onChange({
      ...formData,
      productEmissions
    });
  };

  const handleProductUnitsChange = () => {
    throw new Error('Product units cannot be changed');
  };

  const productRowIdSchema = useMemo(
    () => ({
      ...(schema.properties.productRowId as JSONSchema6),
      enum: query.allProducts.edges.map(({node}) => node.rowId),
      enumNames: query.allProducts.edges.map(({node}) => node.name)
    }),
    [query.allProducts.edges, schema.properties.productRowId]
  );

  return (
    <>
      <FieldTemplate
        required
        hidden={false}
        id="product.productRowId"
        classNames="form-group field field-string"
        label={productRowIdSchema.title}
        schema={productRowIdSchema}
        uiSchema={uiSchema.productRowId || {}}
        formContext={formContext}
        errors={
          <ErrorList errors={errorSchema?.productRowId?.__errors as any} />
        }
      >
        <registry.fields.StringField
          required
          disabled={false}
          readonly={false}
          schema={productRowIdSchema}
          uiSchema={uiSchema.productRowId}
          formData={formData.productRowId}
          autofocus={autofocus}
          idSchema={idSchema.productRowId}
          registry={registry}
          errorSchema={errorSchema?.productRowId}
          formContext={formContext}
          name="product"
          onBlur={null}
          onChange={handleProductChange}
        />
      </FieldTemplate>
      {formData?.requiresEmissionAllocation && (
        <FieldTemplate
          required
          hidden={false}
          id="product.productEmissions"
          classNames="form-group field field-number"
          label={productEmissionsSchema.title}
          schema={productEmissionsSchema}
          uiSchema={uiSchema.productEmissions || {}}
          formContext={formContext}
          help={uiSchema.productEmissions?.['ui:help']}
          errors={
            <ErrorList
              errors={errorSchema?.productEmissions?.__errors as any}
            />
          }
        >
          <registry.fields.NumberField
            required
            schema={productEmissionsSchema}
            uiSchema={uiSchema.productEmissions}
            formData={formData.productEmissions}
            autofocus={autofocus}
            idSchema={idSchema.productEmissions as IdSchema}
            registry={registry}
            errorSchema={errorSchema?.productEmissions}
            formContext={formContext}
            disabled={disabled}
            readonly={readonly}
            name="allocationFactor"
            onBlur={null}
            onChange={handleProductEmissionsChange}
          />
        </FieldTemplate>
      )}
      <>
        <FieldTemplate
          required
          hidden={false}
          id="product.quantity"
          classNames="form-group field field-number"
          label={quantitySchema.title}
          schema={quantitySchema}
          uiSchema={uiSchema.quantity || {}}
          formContext={formContext}
          errors={<ErrorList errors={errorSchema?.quantity?.__errors as any} />}
        >
          <registry.fields.NumberField
            required
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
            name="quantity"
            onBlur={null}
            onChange={handleQuantityChange}
          />
        </FieldTemplate>
        <FieldTemplate
          required={false}
          hidden={false}
          id="product.productUnits"
          classNames="form-group field field-string"
          label={productUnitsSchema.title}
          schema={productUnitsSchema}
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
            schema={productUnitsSchema}
            uiSchema={uiSchema.productUnits}
            formData={formData.productUnits}
            autofocus={autofocus}
            idSchema={idSchema.productUnits as IdSchema}
            registry={registry}
            errorSchema={errorSchema}
            formContext={formContext}
            name="productUnits"
            onBlur={null}
            onChange={handleProductUnitsChange}
          />
        </FieldTemplate>
      </>
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
            requiresEmissionAllocation
          }
        }
      }
    }
  `
});
