import React from 'react';
import {shallow} from 'enzyme';
import AddCommentField from 'components/Forms/AddCommentField';
import {JSONSchema7TypeName} from 'json-schema';

describe('The AddCommentField component', () => {
  const defaultProps = {
    schema: {
      type: 'string' as JSONSchema7TypeName
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
      <AddCommentField formData="Some text" {...defaultProps} />
    );
    // Expand the field to show the text area
    wrapper.find('Button').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });
});
