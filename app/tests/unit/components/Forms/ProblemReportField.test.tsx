import React from 'react';
import {shallow} from 'enzyme';
import ProblemReportField from 'components/Forms/ProblemReportField';
import {JSONSchema6TypeName} from 'json-schema';

describe('The ProblemReportField component ', () => {
  const defaultProps = {
    schema: {
      type: 'string' as JSONSchema6TypeName
    },
    uiSchema: {},
    idSchema: null,
    errorSchema: {},
    registry: null,
    formContext: {},
    autofocus: false,
    disabled: false,
    required: false,
    readonly: false,
    name: 'comments',
    onChange: jest.fn(),
    onBlur: jest.fn()
  };
  it('Should match the snapshot', () => {
    const wrapper = shallow(
      <ProblemReportField formData="Some text" {...defaultProps} />
    );
    // Expand the field to show the text area
    wrapper.find('Button').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });
});
