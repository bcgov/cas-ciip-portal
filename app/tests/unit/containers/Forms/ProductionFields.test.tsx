import React from 'react';
import {shallow} from 'enzyme';
import {ProductFieldComponent} from 'containers/Forms/ProductField';
import productionSchema from 'schema/data/prod/form_json/production.json';
import {JSONSchema7} from 'json-schema';
import {getDefaultRegistry} from '@rjsf/core/dist/cjs/utils';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import {ProductField_query} from '__generated__/ProductField_query.graphql';

describe('The ProductionFields Component with published product', () => {
  const query: ProductField_query = {
    ' $refType': 'ProductField_query',
    allProducts: {
      edges: [
        {
          node: {
            rowId: 1,
            units: 'bar',
            productState: 'PUBLISHED',
            requiresEmissionAllocation: true,
            requiresProductAmount: true
          }
        }
      ]
    }
  };

  const idSchema: any = {$id: 'product_0'};
  const props = {
    schema: productionSchema.schema.definitions.product as JSONSchema7,
    uiSchema: productionSchema.uiSchema,
    idSchema,
    autofocus: false,
    disabled: false,
    errorSchema: null,
    formContext: {},
    readonly: false,
    required: false,
    registry: {
      ...getDefaultRegistry(),
      ArrayFieldTemplate: FormArrayFieldTemplate,
      ObjectFieldTemplate: FormObjectFieldTemplate,
      FieldTemplate: FormFieldTemplate
    } as any,

    name: 'product',
    query,
    formData: {
      productRowId: 1,
      productUnits: 'bar',
      productEmissions: 123,
      productAmount: 456,
      requiresEmissionAllocation: true
    },
    onChange: jest.fn(),
    onBlur: jest.fn()
  };

  it('should match the snapshot when rendering a product', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('The ProductionFields Component with archived product', () => {
  const query: ProductField_query = {
    ' $refType': 'ProductField_query',
    allProducts: {
      edges: [
        {
          node: {
            rowId: 1,
            units: 'bar',
            productState: 'ARCHIVED',
            requiresEmissionAllocation: true,
            requiresProductAmount: true
          }
        }
      ]
    }
  };

  const idSchema: any = {$id: 'product_0'};
  const props = {
    schema: productionSchema.schema.definitions.product as JSONSchema7,
    uiSchema: productionSchema.uiSchema,
    idSchema,
    autofocus: false,
    disabled: false,
    errorSchema: null,
    formContext: {},
    readonly: false,
    required: false,
    registry: {
      ...getDefaultRegistry(),
      ArrayFieldTemplate: FormArrayFieldTemplate,
      ObjectFieldTemplate: FormObjectFieldTemplate,
      FieldTemplate: FormFieldTemplate
    } as any,

    name: 'product',
    query,
    formData: {
      productRowId: 1,
      productUnits: 'bar',
      productEmissions: 123,
      productAmount: 456,
      requiresEmissionAllocation: true
    },
    onChange: jest.fn(),
    onBlur: jest.fn()
  };

  it('should match the snapshot when rendering an archived product', () => {
    const wrapper = shallow(<ProductFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
