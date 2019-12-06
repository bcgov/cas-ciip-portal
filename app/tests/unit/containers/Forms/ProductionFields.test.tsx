import React from 'react';
import {shallow} from 'enzyme';
import {ProductionFieldsComponent} from 'containers/Forms/ProductionFields';
import productionSchema from 'schema/data/portal/form_json/production.json';
import {JSONSchema6} from 'json-schema';
import {getDefaultRegistry} from 'react-jsonschema-form/lib/utils';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
describe('The ProductionFields Component', () => {
  const props = {
    schema: productionSchema.schema.definitions.product as JSONSchema6,
    uiSchema: productionSchema.uiSchema,
    idSchema: null,
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
    query: {
      ' $refType': 'ProductionFields_query' as 'ProductionFields_query',
      allProducts: {
        edges: [
          {
            node: {
              name: 'foo',
              units: 'bar',
              productFormByProductFormId: {
                productFormSchema: {
                  schema: {
                    type: 'object',
                    properties: {
                      additionalFoo: {
                        type: 'string'
                      }
                    }
                  },
                  uiSchema: {
                    additionalFoo: {'ui:col-md': 12}
                  }
                }
              }
            }
          },
          {
            node: {
              name: 'simpleFoo',
              units: 'baz',
              productFormByProductFormId: undefined
            }
          }
        ]
      }
    },
    formData: {
      product: 'foo',
      productUnits: 'bar',
      additionalData: {
        additionalFoo: 'foofoo'
      }
    },
    onChange: jest.fn()
  };

  it('should match the snapshot when rendering additional data', () => {
    const wrapper = shallow(<ProductionFieldsComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when rendering a product without additional data', () => {
    const wrapper = shallow(
      <ProductionFieldsComponent
        {...props}
        formData={{product: 'simpleFoo', productUnits: 'baz'}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an ObjectField with the additional data and its schemas', () => {
    const wrapper = shallow(<ProductionFieldsComponent {...props} />);
    const objectField = wrapper.find('ObjectField');
    expect(objectField).toEqual(expect.anything());
    expect(objectField.prop('formData')).toEqual(props.formData.additionalData);
    expect(objectField.prop('schema')).toEqual(
      props.query.allProducts.edges[0].node.productFormByProductFormId
        .productFormSchema.schema
    );
    expect(objectField.prop('uiSchema')).toEqual(
      props.query.allProducts.edges[0].node.productFormByProductFormId
        .productFormSchema.uiSchema
    );
  });
});
