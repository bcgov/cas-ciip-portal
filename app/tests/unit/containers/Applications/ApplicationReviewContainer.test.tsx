import React from 'react';
import {shallow, HTMLAttributes} from 'enzyme';
import {ApplicationReview} from 'containers/Applications/ApplicationReviewContainer';

interface ReviewModalProps extends HTMLAttributes {
  show: boolean;
}

describe('ApplicationReview', () => {
  it('should match the snapshot with the ApplicationReview component', async () => {
    const renderer = shallow(
      <ApplicationReview
        relay={null}
        formName="Admin"
        formResultId="1"
        formResultStatus={{
          ' $refType': 'ApplicationReviewContainer_formResultStatus',
          id: 'abc',
          applicationId: 1,
          formId: 1,
          formResultStatus: 'IN_REVIEW',
          versionNumber: 1,
          formResultByApplicationIdAndVersionNumberAndFormId: {
            applicationByApplicationId: {
              id: 'application'
            }
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it('should should display the correct status in the status button', async () => {
    const renderer = shallow(
      <ApplicationReview
        relay={null}
        formName="Admin"
        formResultId="1"
        formResultStatus={{
          ' $refType': 'ApplicationReviewContainer_formResultStatus',
          id: 'abc',
          applicationId: 1,
          formId: 1,
          formResultStatus: 'IN_REVIEW',
          versionNumber: 1,
          formResultByApplicationIdAndVersionNumberAndFormId: {
            applicationByApplicationId: {
              id: 'application'
            }
          }
        }}
      />
    );
    expect(
      renderer
        .find('Button')
        .at(0)
        .text()
    ).toBe('IN REVIEW');
  });
  it('should should show the modal when the status button is clicked', async () => {
    const renderer = shallow(
      <ApplicationReview
        relay={null}
        formName="Admin"
        formResultId="1"
        formResultStatus={{
          ' $refType': 'ApplicationReviewContainer_formResultStatus',
          id: 'abc',
          applicationId: 1,
          formId: 1,
          formResultStatus: 'IN_REVIEW',
          versionNumber: 1,
          formResultByApplicationIdAndVersionNumberAndFormId: {
            applicationByApplicationId: {
              id: 'application'
            }
          }
        }}
      />
    );
    renderer
      .find('Button')
      .at(0)
      .simulate('click');
    const modalProps = renderer
      .find('.review-modal')
      .props() as ReviewModalProps;
    expect(modalProps.show).toBe(true);
  });
});
