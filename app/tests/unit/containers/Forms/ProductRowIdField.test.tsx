import React from 'react';
import {shallow} from 'enzyme';
import {ProductRowIdFieldComponent} from 'containers/Forms/ProductRowIdField';
import productionSchema from 'schema/data/prod/form_json/production.json';
import {JSONSchema7} from 'json-schema';
import {getDefaultRegistry} from '@rjsf/core/dist/cjs/utils';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import {ProductRowIdField_query} from '__generated__/ProductRowIdField_query.graphql';
import {ProductRowIdField_naicsCode} from '__generated__/ProductRowIdField_naicsCode.graphql';

describe('The ProductionRowIdField Component with published product matched to a naics code', () => {
  const query: ProductRowIdField_query = {
    ' $refType': 'ProductRowIdField_query',
    published: {
      edges: [
        {
          node: {
            rowId: 1,
            productName: 'foo',
            productState: 'PUBLISHED',
            isEnergyProduct: false
          }
        },
        {
          node: {
            rowId: 2,
            productName: 'dontrenderme',
            productState: 'PUBLISHED',
            isEnergyProduct: false
          }
        }
      ]
    },
    archived: {
      edges: [
        {
          node: {
            rowId: 3,
            productName: 'bar',
            productState: 'ARCHIVED'
          }
        }
      ]
    }
  };
  const naicsCode: ProductRowIdField_naicsCode = {
    ' $refType': 'ProductRowIdField_naicsCode',
    id: 'abc',
    productsByNaicsCode: {
      edges: [
        {
          node: {
            rowId: 1,
            productName: 'foo',
            productState: 'PUBLISHED'
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
    naicsCode,
    formData: 1,
    onChange: jest.fn(),
    onBlur: jest.fn()
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain the products in productsByNaicsCode when passed a naicsCode', () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper.find('StringField').prop('schema' as any).enumNames[0]).toBe(
      'foo'
    );
  });

  it('should not contain the products not in productsByNaicsCode when passed a naicsCode', () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper.find('StringField').prop('schema' as any).enumNames[1]).toBe(
      undefined
    );
  });
});

describe('The ProductionRowIdField Component with archived product', () => {
  const query: ProductRowIdField_query = {
    ' $refType': 'ProductRowIdField_query',
    published: {
      edges: []
    },
    archived: {
      edges: [
        {
          node: {
            rowId: 1,
            productName: 'bar',
            productState: 'ARCHIVED'
          }
        }
      ]
    }
  };
  const naicsCode: ProductRowIdField_naicsCode = {
    ' $refType': 'ProductRowIdField_naicsCode',
    id: 'abc',
    productsByNaicsCode: {
      edges: []
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
    naicsCode,
    formData: 1,
    onChange: jest.fn(),
    onBlur: jest.fn()
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the product name in an input group', () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper.find('InputGroup').text()).toBe('bar');
  });
});

describe('The ProductionFields Component without naics code', () => {
  const query: ProductRowIdField_query = {
    ' $refType': 'ProductRowIdField_query',
    published: {
      edges: [
        {
          node: {
            rowId: 1,
            productName: 'foo',
            productState: 'PUBLISHED',
            isEnergyProduct: false
          }
        },
        {
          node: {
            rowId: 1,
            productName: 'dontrenderme',
            productState: 'PUBLISHED',
            isEnergyProduct: false
          }
        }
      ]
    },
    archived: {
      edges: [
        {
          node: {
            rowId: 2,
            productName: 'bar',
            productState: 'ARCHIVED'
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
    naicsCode: null,
    formData: 1,
    onChange: jest.fn(),
    onBlur: jest.fn()
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the product name in an input group', () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper.find('InputGroup').text()).toBe('foo');
  });
});
