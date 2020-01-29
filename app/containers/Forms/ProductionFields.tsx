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
  productionAllocationFactor?: number;
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
      productionAllocationFactor: productionAllocationFactorSchema,
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
   * Updates the product's productionAllocationFactor.
   * Unless the product has an additional data schema that defines a calculatedPayementAllocationFactor,
   * sets the paymentAllocationFactor to be the same value
   * @param productionAllocationFactor
   */
  const handleProductionAllocationFactorChange = productionAllocationFactor => {
    const paymentAllocationFactor = additionalDataSchema?.schema.properties
      .calculatedPaymentAllocationFactor
      ? formData.paymentAllocationFactor
      : productionAllocationFactor;
    onChange({
      ...formData,
      productionAllocationFactor,
      paymentAllocationFactor
    });
  };

  /**
   * Updates the product's additional data. In addition:
   *  - if the additionalDataSchema defines a calculatedQuantity property,
   *    the product's quantity is set to match that value;
   *  - if the additionalDataSchema defines a calculatedProductionAllocationFactor property,
   *    the product's productionAllocationFactor is set to match that value;
   *  - if the additionalDataSchema defines a calculatedPaymentAllocationFactor property,
   *    the product's paymentAllocationFactor is set to match that value,
   *    otherwise it is set to match the productionAllocationFactor.
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

    if (
      additionalDataSchema.schema.properties
        .calculatedProductionAllocationFactor
    ) {
      data.productionAllocationFactor =
        additionalData.calculatedProductionAllocationFactor;
    }

    if (
      additionalDataSchema.schema.properties.calculatedPaymentAllocationFactor
    ) {
      data.paymentAllocationFactor =
        additionalData.calculatedPaymentAllocationFactor;
    } else {
      data.paymentAllocationFactor = data.productionAllocationFactor;
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

  const renderProductionAllocationFactor =
    !additionalDataSchema ||
    !additionalDataSchema.schema.properties
      .calculatedProductionAllocationFactor;

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
          errorSchema={errorSchema}
          formContext={formContext}
          name="product"
          onChange={handleProductChange}
        />
      </FieldTemplate>
      {renderProductionAllocationFactor && (
        <FieldTemplate
          required
          hidden={false}
          id="product.productionAllocationFactor"
          classNames="form-group field field-number"
          label={productionAllocationFactorSchema.title}
          schema={productionAllocationFactorSchema}
          uiSchema={uiSchema.productionAllocationFactor || {}}
          formContext={formContext}
          help={uiSchema.productionAllocationFactor?.['ui:help']}
          errors={
            <ErrorList
              errors={errorSchema?.productionAllocationFactor?.__errors as any}
            />
          }
        >
          <registry.fields.NumberField
            required
            schema={productionAllocationFactorSchema}
            uiSchema={uiSchema.productionAllocationFactor}
            formData={formData.productionAllocationFactor}
            autofocus={autofocus}
            idSchema={idSchema.productionAllocationFactor as IdSchema}
            registry={registry}
            errorSchema={errorSchema?.productionAllocationFactor}
            formContext={formContext}
            disabled={disabled}
            readonly={readonly}
            name="allocationFactor"
            onChange={handleProductionAllocationFactorChange}
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
              onChange={handleProductUnitsChange}
            />
          </FieldTemplate>
        </>
      )}
      <FieldTemplate
        required={schema.required.includes(
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
          required={schema.required.includes(
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
          onChange={handleImportedElectricityAllocationFactorChange}
        />
      </FieldTemplate>
      <FieldTemplate
        required={schema.required.includes('importedHeatAllocationFactor')}
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
          required={schema.required.includes('importedHeatAllocationFactor')}
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
