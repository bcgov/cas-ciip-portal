import React from 'react';
import {shallow} from 'enzyme';
import {
  EmissionCategoryRowIdFieldComponent,
  Props
} from 'containers/Forms/EmissionCategoryRowIdField';
import {createDefaultJsonSchemaFormProps} from 'tests/json-schema-utils';

describe('The EmissionCategoryRowIdField component', () => {
  it('injects the category ids and names in the json schema', () => {
    const props: Props = {
      ...createDefaultJsonSchemaFormProps(),
      query: {
        ' $refType': 'EmissionCategoryRowIdField_query',
        activeEmissionCategories: {
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
        },
        archivedEmissionCategories: {
          edges: []
        }
      },
      formData: 1,
      name: 'emissionCategoryRowId',
      required: true
    };
    const renderedField = shallow(
      <EmissionCategoryRowIdFieldComponent {...props} />
    );
    expect(renderedField).toMatchSnapshot();
    const fieldSchemaProp = renderedField.prop('schema');
    expect(fieldSchemaProp.enum).toHaveLength(2);
    expect(fieldSchemaProp.enumNames).toHaveLength(2);
  });

  it('Renders an uneditable <span> element if the emission category is archived', () => {
    const props: Props = {
      ...createDefaultJsonSchemaFormProps(),
      query: {
        ' $refType': 'EmissionCategoryRowIdField_query',
        activeEmissionCategories: {
          edges: []
        },
        archivedEmissionCategories: {
          edges: [
            {
              node: {
                rowId: 100,
                displayName: 'Deleted Emission Category'
              }
            }
          ]
        }
      },
      formData: 100,
      name: 'emissionCategoryRowId',
      required: true
    };
    const renderedField = shallow(
      <EmissionCategoryRowIdFieldComponent {...props} />
    );
    expect(renderedField).toMatchSnapshot();
  });
});
