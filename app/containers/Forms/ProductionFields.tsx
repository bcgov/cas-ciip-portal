import React, {useMemo} from 'react';
import {FieldProps, IdSchema} from 'react-jsonschema-form';
import {toIdSchema} from 'react-jsonschema-form/lib/utils';
import ErrorList from 'components/Forms/ErrorList';
import {createFragmentContainer, graphql} from 'react-relay';
import {ProductionFields_query} from 'ProductionFields_query.graphql';
import {JSONSchema6} from 'json-schema';
import {FormJson} from 'next-env';

interface FormData {
  productRowId?: number;
  quantity?: number;
  productUnits?: string;
  productEmissions?: number;
  paymentAllocationFactor?: number;
  importedElectricityAllocationFactor?: number;
  importedHeatAllocationFactor?: number;
  additionalData?: any;
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
      productUnits: productUnitsSchema,
      importedElectricityAllocationFactor: importedElectricityAllocationFactorSchema,
      importedHeatAllocationFactor: importedHeatAllocationFactorSchema
    }
  } = schema as {properties: Record<string, JSONSchema6>};
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

  const handleImportedElectricityAllocationFactorChange = importedElectricityAllocationFactor => {
    onChange({
      ...formData,
      importedElectricityAllocationFactor
    });
  };

  const handleImportedHeatAllocationFactorChange = importedHeatAllocationFactor => {
    onChange({
      ...formData,
      importedHeatAllocationFactor
    });
  };

  /**
   * Updates the product's productEmissions.
   * Unless the product has an additional data schema that defines a calculatedPayementAllocationFactor,
   * sets the paymentAllocationFactor to be the same value
   * @param productEmissions
   */
  const handleProductEmissionsChange = productEmissions => {
    const paymentAllocationFactor = additionalDataSchema?.schema.properties
      .calculatedPaymentAllocationFactor
      ? formData.paymentAllocationFactor
      : productEmissions;
    onChange({
      ...formData,
      productEmissions,
      paymentAllocationFactor
    });
  };

  /**
   * Updates the product's additional data. In addition:
   *  - if the additionalDataSchema defines a calculatedQuantity property,
   *    the product's quantity is set to match that value;
   *  - if the additionalDataSchema defines a calculatedproductEmissions property,
   *    the product's productEmissions is set to match that value;
   *  - if the additionalDataSchema defines a calculatedPaymentAllocationFactor property,
   *    the product's paymentAllocationFactor is set to match that value,
   *    otherwise it is set to match the productEmissions.
   * @param additionalData
   */
  const handleAdditionalFieldsChange = (additionalData: any) => {
    const data = {
      ...formData,
      additionalData
    };

    if (additionalDataSchema.schema.properties.calculatedQuantity) {
      data.quantity = additionalData.calculatedQuantity;
    }

    if (additionalDataSchema.schema.properties.calculatedproductEmissions) {
      data.productEmissions = additionalData.calculatedproductEmissions;
    }

    if (
      additionalDataSchema.schema.properties.calculatedPaymentAllocationFactor
    ) {
      data.paymentAllocationFactor =
        additionalData.calculatedPaymentAllocationFactor;
    } else {
      data.paymentAllocationFactor = data.productEmissions;
    }

    onChange(data);
  };

  const handleProductUnitsChange = () => {
    throw new Error('Product units cannot be changed');
  };

  const additionalDataSchema = useMemo(() => {
    return query.allProducts.edges.find(
      ({node}) => node.rowId === formData.productRowId
    )?.node?.productFormByProductFormId?.productFormSchema as FormJson;
  }, [formData.productRowId, query.allProducts.edges]);

  const additionalDataIdSchema = useMemo(() => {
    if (!additionalDataSchema) return undefined;
    return toIdSchema(
      additionalDataSchema.schema,
      idSchema.additionalData.$id,
      null,
      formData.additionalData,
      idSchema.additionalData.$id
    );
  }, [
    additionalDataSchema,
    formData.additionalData,
    idSchema.additionalData.$id
  ]);

  const productRowIdSchema = useMemo(
    () => ({
      ...(schema.properties.productRowId as JSONSchema6),
      enum: query.allProducts.edges.map(({node}) => node.rowId),
      enumNames: query.allProducts.edges.map(({node}) => node.name)
    }),
    [query.allProducts.edges, schema.properties.productRowId]
  );

  const renderQuantity =
    !additionalDataSchema ||
    !additionalDataSchema.schema.properties.calculatedQuantity;

  const renderproductEmissions =
    !additionalDataSchema ||
    !additionalDataSchema.schema.properties.calculatedproductEmissions;

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
          idSchema={idSchema.productRowId as IdSchema}
          registry={registry}
          errorSchema={errorSchema?.productRowId}
          formContext={formContext}
          name="product"
          onBlur={null}
          onChange={handleProductChange}
        />
      </FieldTemplate>
      {renderproductEmissions && (
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
      {renderQuantity && (
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
            errors={
              <ErrorList errors={errorSchema?.quantity?.__errors as any} />
            }
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
      )}
      <FieldTemplate
        required={schema?.required?.includes(
          'importedElectricityAllocationFactor'
        )}
        hidden={false}
        id="product.importedElectricityAllocationFactor"
        classNames="form-group field field-number"
        label={importedElectricityAllocationFactorSchema.title}
        schema={importedElectricityAllocationFactorSchema}
        uiSchema={uiSchema.importedElectricityAllocationFactor || {}}
        formContext={formContext}
        help={uiSchema.importedElectricityAllocationFactor?.['ui:help']}
        errors={
          <ErrorList
            errors={
              errorSchema?.importedElectricityAllocationFactor?.__errors as any
            }
          />
        }
      >
        <registry.fields.NumberField
          required={schema?.required?.includes(
            'importedElectricityAllocationFactor'
          )}
          schema={importedElectricityAllocationFactorSchema}
          uiSchema={uiSchema.importedElectricityAllocationFactor}
          formData={formData.importedElectricityAllocationFactor}
          autofocus={autofocus}
          idSchema={idSchema.importedElectricityAllocationFactor as IdSchema}
          registry={registry}
          errorSchema={errorSchema?.importedElectricityAllocationFactor}
          formContext={formContext}
          disabled={disabled}
          readonly={readonly}
          name="allocationFactor"
          onBlur={null}
          onChange={handleImportedElectricityAllocationFactorChange}
        />
      </FieldTemplate>
      <FieldTemplate
        required={schema?.required?.includes('importedHeatAllocationFactor')}
        hidden={false}
        id="product.importedHeatAllocationFactor"
        classNames="form-group field field-number"
        label={importedHeatAllocationFactorSchema.title}
        schema={importedHeatAllocationFactorSchema}
        uiSchema={uiSchema.importedHeatAllocationFactor || {}}
        formContext={formContext}
        help={uiSchema.importedHeatAllocationFactor?.['ui:help']}
        errors={
          <ErrorList
            errors={errorSchema?.importedHeatAllocationFactor?.__errors as any}
          />
        }
      >
        <registry.fields.NumberField
          required={schema?.required?.includes('importedHeatAllocationFactor')}
          schema={importedHeatAllocationFactorSchema}
          uiSchema={uiSchema.importedHeatAllocationFactor}
          formData={formData.importedHeatAllocationFactor}
          autofocus={autofocus}
          idSchema={idSchema.importedHeatAllocationFactor as IdSchema}
          registry={registry}
          errorSchema={errorSchema?.importedHeatAllocationFactor}
          formContext={formContext}
          disabled={disabled}
          readonly={readonly}
          name="allocationFactor"
          onBlur={null}
          onChange={handleImportedHeatAllocationFactorChange}
        />
      </FieldTemplate>
      {additionalDataSchema && (
        <registry.fields.ObjectField
          required
          schema={additionalDataSchema.schema}
          uiSchema={additionalDataSchema.uiSchema}
          formData={formData.additionalData}
          autofocus={autofocus}
          idSchema={additionalDataIdSchema}
          registry={registry}
          errorSchema={errorSchema?.additionalData}
          formContext={formContext}
          disabled={disabled}
          readonly={readonly}
          name={null}
          help={additionalDataSchema.uiSchema?.['ui:help']}
          onBlur={null}
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
