import React from 'react';
import {shallow} from 'enzyme';
import {
  EmissionCategoryRowIdFieldComponent,
  Props
} from 'containers/Forms/EmissionCategoryRowIdField';
import {getDefaultRegistry} from 'react-jsonschema-form/lib/utils';

describe('The EmissionCategoryRowIdField component', () => {
  it('injects the category ids and names in the json schema', () => {
    const idSchema: any = {$id: 'emissionCategoryRowId'}; // TODO: revise type after react-jsonschema-form v2 is used
    const props: Props = {
      name: 'emissionCategoryRowId',
      schema: {
        type: 'number',
        title: 'emission category'
      },
      uiSchema: {},
      idSchema,
      formData: 1,
      errorSchema: null,
      onChange: jest.fn,
      onBlur: jest.fn,
      registry: getDefaultRegistry(),
      formContext: null,
      autofocus: false,
      disabled: false,
      readonly: false,
      required: true,
      query: {
        ' $refType': 'EmissionCategoryRowIdField_query',
        allEmissionCategories: {
          edges: [
            {
              node: {
                rowId: 1,
                displayName: 'cat A'
              }
            },
            {
              node: {
                rowId: 2,
                displayName: 'cat B'
              }
            }
          ]
        }
      }
    };
    const renderedField = shallow(
      <EmissionCategoryRowIdFieldComponent {...props} />
    );
    expect(renderedField).toMatchSnapshot();
    const fieldSchemaProp = renderedField.prop('schema');
    expect(fieldSchemaProp.enum).toHaveLength(2);
    expect(fieldSchemaProp.enumNames).toHaveLength(2);
  });
});
