import {NaicsFieldComponent} from 'containers/Forms/NaicsField';
import {mount} from 'enzyme';
import React from 'react';
import {NaicsField_query} from '__generated__/NaicsField_query.graphql';
import {createDefaultJsonSchemaFormProps} from 'tests/json-schema-utils';

describe('The Naics Field custom field', () => {
  const testQuery: NaicsField_query = {
    ' $refType': 'NaicsField_query',
    naicsCodes: {
      edges: [
        {
          node: {
            naicsCode: '111111',
            naicsDescription: 'Javascript'
          }
        },
        {
          node: {
            naicsCode: '222222',
            naicsDescription: 'Typescript'
          }
        }
      ]
    }
  };

  const initialProps = {
    ...createDefaultJsonSchemaFormProps(),
    query: testQuery
  };

  it('Displays the list of returned NAICS codes as a dropdown', () => {
    const props = {
      ...initialProps,
      formData: ''
    };

    const componentUnderTest = mount(<NaicsFieldComponent {...props} />);
    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Displays (<code> - <description>) when the form data contains a 6-digit NAICS code', () => {
    const props = {
      ...initialProps,
      formData: '222222'
    };

    const componentUnderTest = mount(<NaicsFieldComponent {...props} />);
    expect(componentUnderTest).toMatchSnapshot();
  });

  it("Displays an alert if the current form data doesn't contain an allowed NAICS code", () => {
    const props = {
      ...initialProps,
      formData: '1234'
    };

    const componentUnderTest = mount(<NaicsFieldComponent {...props} />);
    expect(componentUnderTest).toMatchSnapshot();
  });
});
