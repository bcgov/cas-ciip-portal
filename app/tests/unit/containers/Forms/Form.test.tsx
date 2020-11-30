import React from 'react';
import {shallow} from 'enzyme';
import {FormComponent} from 'containers/Forms/Form';

describe('The Form Component', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
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
              formJson: {schema: {}},
              ciipApplicationWizardByFormId: {
                formPosition: 1
              },
              name: 'Foo'
            }
          },
          products: {
            edges: []
          }
        }}
        onComplete={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the save & continue / save & exit buttons', () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
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
              formJson: {schema: {}},
              ciipApplicationWizardByFormId: {
                formPosition: 0
              },
              name: 'Foo'
            }
          },
          products: {
            edges: []
          }
        }}
        onComplete={jest.fn()}
      />
    );
    expect(wrapper.find('Button')).toHaveLength(2);
    expect(wrapper.find('Button').at(0).text()).toBe('Save & Continue');
    expect(wrapper.find('Button').at(1).text()).toBe('Save & Exit');
  });

  it('should not render an alert reminder to check the guidance if no product requires emission allocation', () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
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
              formJson: {schema: {}},
              ciipApplicationWizardByFormId: {
                formPosition: 3
              },
              name: 'Foo'
            }
          },
          products: {
            edges: []
          }
        }}
        onComplete={jest.fn()}
      />
    );
    expect(wrapper.find('Alert')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render alert reminder to check the guidance if any product requires emission allocation', () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
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
              formJson: {schema: {}},
              ciipApplicationWizardByFormId: {
                formPosition: 3
              },
              name: 'Foo'
            }
          },
          products: {
            edges: []
          }
        }}
        onComplete={jest.fn()}
      />
    );
    expect(wrapper.find('Alert')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an alert reminder to report any missing linked products', () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
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
              formJson: {schema: {}},
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
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Alert').at(2).text()).toContain(
      'requires reporting of: bar'
    );
  });
});
