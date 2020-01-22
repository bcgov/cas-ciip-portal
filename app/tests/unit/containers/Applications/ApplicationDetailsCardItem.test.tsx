import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationDetailsCardItemComponent} from 'containers/Applications/ApplicationDetailsCardItem';

describe('ApplicationDetailsCardItemComponent', () => {
  it('should render the individual summary confirmation card component', () => {
    const formResult = {
      ' $refType': 'ApplicationDetailsCardItem_formResult',
      formResult: {},
      formJsonByFormId: {
        name: 'Fuel Usage',
        formJson: {schema: {title: 'Fuel UsageCollapse'}, uiSchema: {}},
        slug: 'fuel'
      },
      formResultStatuses: {
        edges: [
          {
            node: {
              ' $fragmentRefs': {
                ' $refType': 'ApplicationDetailsCardItem_formResult',
                ApplicationReviewContainer_formResultStatus: true
              }
            }
          }
        ]
      }
    };
    const query = {
      ' $fragmentRefs': {
        ' $refType': 'ProductionFields_query',
        ProductionFields_query: true
      }
    };
    const previousFormResult = {};
    const formTitle = 'facility';
    const formSubtitle = 'facility';
    const r = shallow(
      <ApplicationDetailsCardItemComponent
        query={query}
        formResult={formResult}
        previousFormResult={previousFormResult}
        review={false}
        formTitle={formTitle}
        formSubtitle={formSubtitle}
        showDiff={false}
        diffToResults={[]}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('CardHeader').text()).toContain('Fuel Usage');
  });
  it('should add the diffArray and diffPathArray to formContext with proper values', () => {
    const formResult = {
      ' $fragmentRefs': {
        ' $refType': 'ApplicationDetailsCardItem_formResult',
        ApplicationDetailsCardItem_formResult: true
      },
      formResult: {fuelType: 'Diesel'},
      formJsonByFormId: {
        name: 'Fuel Usage',
        formJson: {schema: {title: 'Fuel UsageCollapse'}, uiSchema: {}},
        slug: 'fuel'
      },
      formResultStatuses: {
        edges: [
          {
            node: {
              ' $fragmentRefs': {
                ' $refType': 'ApplicationDetailsCardItem_formResult',
                ApplicationReviewContainer_formResultStatus: true
              }
            }
          }
        ]
      }
    };
    const query = {
      ' $fragmentRefs': {
        ' $refType': 'ProductionFields_query',
        ProductionFields_query: true
      }
    };
    const previousFormResults = [
      {
        node: {
          formResult: {fuelType: 'Propane'},
          formJsonByFormId: {
            name: 'Fuel Usage',
            formJson: {schema: {title: 'Fuel UsageCollapse'}, uiSchema: {}},
            slug: 'fuel'
          }
        }
      }
    ];
    const formTitle = 'facility';
    const formSubtitle = 'facility';
    const r = shallow(
      <ApplicationDetailsCardItemComponent
        review
        showDiff
        query={query}
        formResult={formResult}
        previousFormResults={previousFormResults}
        formTitle={formTitle}
        formSubtitle={formSubtitle}
        diffToResults={[
          {
            node: {
              formResult: {fuelType: 'after'},
              formJsonByFormId: {slug: 'fuel'}
            }
          }
        ]}
        diffFromResults={[
          {
            node: {
              formResult: {fuelType: 'before'},
              formJsonByFormId: {slug: 'fuel'}
            }
          }
        ]}
      />
    );
    expect(r.find('Form').props().formContext.diffPathArray[0]).toBe(
      'fuelType'
    );
    expect(r.find('Form').props().formContext.diffArray[0]).toBe('before');
  });
});
