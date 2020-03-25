import React from 'react';
import {shallow} from 'enzyme';
import {FormComponent} from 'containers/Forms/Form';

describe('The Form Component', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <FormComponent
        query={{
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductField_query: true
          },
          ' $refType': 'Form_query',
          result: {
            formResult: {},
            formJsonByFormId: {
              formJson: {},
              ciipApplicationWizardByFormId: {
                formPosition: 1
              },
              name: 'Foo'
            }
          }
        }}
        onComplete={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should only render the continue button on the first form', () => {
    const wrapper = shallow(
      <FormComponent
        query={{
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductField_query: true
          },
          ' $refType': 'Form_query',
          result: {
            formResult: {},
            formJsonByFormId: {
              formJson: {},
              ciipApplicationWizardByFormId: {
                formPosition: 0
              },
              name: 'Foo'
            }
          }
        }}
        onComplete={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('Button').text()).toBe('Continue');
  });

  it('should render the continue and back button on subsequent forms', () => {
    const wrapper = shallow(
      <FormComponent
        query={{
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductField_query: true
          },
          ' $refType': 'Form_query',
          result: {
            formResult: {},
            formJsonByFormId: {
              formJson: {},
              ciipApplicationWizardByFormId: {
                formPosition: Math.ceil(Math.random() * 10)
              },
              name: 'Foo'
            }
          }
        }}
        onComplete={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(wrapper.find('Button')).toHaveLength(2);
    expect(
      wrapper
        .find('Button')
        .find({type: 'submit'})
        .text()
    ).toBe('Continue');
    expect(
      wrapper
        .find('Button')
        .find({variant: 'secondary'})
        .text()
    ).toBe('Back');
  });
});
