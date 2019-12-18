import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationDetailsCardItemComponent} from '../../../../containers/Applications/ApplicationDetailsCardItem';

describe('ApplicationDetailsCardItemComponent', () => {
  it('should render the individual summary confirmation card component', () => {
    const formResult = {
      applicationReview: {
        id: 'abc',
        ' $fragmentRefs': {
          ' $refType': 'ApplicationReviewContainer_applicationReview',
          ApplicationReviewContainer_applicationReview: true
        }
      },
      formResult: {},
      formJsonByFormId: {
        name: 'Fuel Usage',
        formJson: {schema: {title: 'Fuel UsageCollapse'}},
        slug: 'fuel'
      }
    };
    const query = {
      ' $fragmentRefs': {
        ' $refType': 'ProductionFields_query',
        ApplicationReviewContainer_applicationReview: true
      }
    };
    const formTitle = 'facility';
    const formSubtitle = 'facility';
    const r = shallow(
      <ApplicationDetailsCardItemComponent
        query={query}
        formResult={formResult}
        formTitle={formTitle}
        formSubtitle={formSubtitle}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('CardHeader').text()).toContain('Fuel Usage');
  });
});
