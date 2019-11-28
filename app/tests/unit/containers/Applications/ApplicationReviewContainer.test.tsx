import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationReview} from 'containers/Applications/ApplicationReviewContainer';

describe('ApplicationReviewContainer', () => {
  it('should match the snapshot with the ApplicationReviewContainer component', async () => {
    const renderer = shallow(
      <ApplicationReview
        relay={null}
        formName="Administration"
        applicationReview={{
          ' $refType': 'ApplicationReviewContainer_applicationReview',
          ' $fragmentRefs': {
            ApplicationReviewContainer_applicationReview: true
          },
          formResultId: 1,
          reviewStatus: 'APPROVED'
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
});
