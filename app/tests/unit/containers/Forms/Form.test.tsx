import React from 'react';
import {shallow} from 'enzyme';
import {FormComponent} from 'containers/Forms/Form';

describe('The Form Component', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <FormComponent
        query={{
          ' $fragmentRefs': {
            FuelField_query: true,
            FuelRowIdField_query: true,
            ProductField_query: true,
            ProductRowIdField_query: true,
            EmissionCategoryRowIdField_query: true
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
            FuelField_query: true,
            ProductField_query: true,
            FuelRowIdField_query: true,
            ProductRowIdField_query: true,
            EmissionCategoryRowIdField_query: true
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
    expect(wrapper.find('.form-nav').find('Button')).toHaveLength(1);
    expect(wrapper.find('Button').text()).toBe('Next Page');
  });

  it('should not render an alert reminder to check the guidance if no product requires emission allocation', () => {
    const wrapper = shallow(
      <FormComponent
        query={{
          ' $fragmentRefs': {
            FuelField_query: true,
            ProductField_query: true,
            FuelRowIdField_query: true,
            ProductRowIdField_query: true,
            EmissionCategoryRowIdField_query: true
          },
          ' $refType': 'Form_query',
          result: {
            formResult: [{requiresEmissionAllocation: false}],
            formJsonByFormId: {
              formJson: {},
              ciipApplicationWizardByFormId: {
                formPosition: 3
              },
              name: 'Foo'
            }
          }
        }}
        onComplete={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(wrapper.find('Alert')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render alert reminder to check the guidance if any product requires emission allocation', () => {
    const wrapper = shallow(
      <FormComponent
        query={{
          ' $fragmentRefs': {
            FuelField_query: true,
            ProductField_query: true,
            FuelRowIdField_query: true,
            ProductRowIdField_query: true,
            EmissionCategoryRowIdField_query: true
          },
          ' $refType': 'Form_query',
          result: {
            formResult: [{requiresEmissionAllocation: true}],
            formJsonByFormId: {
              formJson: {},
              ciipApplicationWizardByFormId: {
                formPosition: 3
              },
              name: 'Foo'
            }
          }
        }}
        onComplete={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(wrapper.find('Alert')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an alert reminder to report any missing linked products', () => {
    const wrapper = shallow(
      <FormComponent
        query={{
          ' $fragmentRefs': {
            FuelField_query: true,
            ProductField_query: true,
            FuelRowIdField_query: true,
            ProductRowIdField_query: true,
            EmissionCategoryRowIdField_query: true
          },
          ' $refType': 'Form_query',
          result: {
            formResult: [
              {productRowId: 1},
              {requiresEmissionAllocation: false}
            ],
            formJsonByFormId: {
              formJson: {},
              ciipApplicationWizardByFormId: {
                formPosition: 3
              },
              name: 'Foo'
            }
          },
          products: {
            edges: [
              {
                node: {
                  rowId: 1,
                  productName: 'foo',
                  linkedProduct: {
                    edges: [
                      {
                        node: {
                          rowId: 2,
                          productName: 'bar',
                          linkedProductId: 3
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }}
        onComplete={jest.fn()}
        onBack={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Alert').at(2).text()).toContain(
      'requires reporting of: bar'
    );
  });

  /* It('should render the continue and back button on subsequent forms', () => {
    const wrapper = shallow(
      <FormComponent
        query={{
          ' $fragmentRefs': {
            FuelField_query: true,
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
  }); */
});
