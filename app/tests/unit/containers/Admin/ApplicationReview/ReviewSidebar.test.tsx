import React from 'react';
import {shallow} from 'enzyme';
import {ReviewSidebar} from 'containers/Admin/ApplicationReview/ReviewSidebar';
import {ReviewSidebar_applicationReviewStep} from '__generated__/ReviewSidebar_applicationReviewStep.graphql';

const applicationReviewStep = () => {
  return {
    ' $refType': 'ReviewSidebar_applicationReviewStep',
    id: 'abc',
    isComplete: false,
    reviewStepByReviewStepId: {
      stepName: 'Technical'
    },
    generalComments: {
      edges: []
    },
    internalComments: {
      edges: []
    }
  };
};
const generalComments = () => {
  return {
    edges: [
      {
        node: {
          id: 'wxy',
          description: 'This is an unresolved general comment.',
          createdAt: '2021-04-08T03:01:35.585Z',
          resolved: false,
          ciipUserByCreatedBy: {
            firstName: 'Old',
            lastName: 'MacDonald'
          }
        }
      },
      {
        node: {
          id: 'vwx',
          description: 'This is a resolved general comment.',
          createdAt: '2021-04-08T03:01:35.585Z',
          resolved: true,
          ciipUserByCreatedBy: {
            firstName: 'Old',
            lastName: 'MacDonald'
          }
        }
      }
    ]
  };
};
const internalComments = () => {
  return {
    edges: [
      {
        node: {
          id: 'xyz',
          description: 'This is an unresolved internal comment.',
          createdAt: '2021-04-08T03:01:35.585Z',
          resolved: false,
          ciipUserByCreatedBy: {
            firstName: 'Old',
            lastName: 'MacDonald'
          }
        }
      },
      {
        node: {
          id: 'cde',
          description: 'This is a resolved internal comment.',
          createdAt: '2021-04-08T03:01:35.585Z',
          resolved: true,
          ciipUserByCreatedBy: {
            firstName: 'Old',
            lastName: 'MacDonald'
          }
        }
      }
    ]
  };
};

const applicationReviewStepWithComments = () => {
  return {
    ...applicationReviewStep(),
    internalComments: internalComments(),
    generalComments: generalComments()
  };
};

describe('ReviewSidebar', () => {
  it('should match the last accepted snapshot (with comments)', async () => {
    const relay = {environment: null};
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r).toMatchSnapshot();
  });
  it('should match the last accepted snapshot (no comments)', async () => {
    const relay = {environment: null};
    const data = applicationReviewStep();
    const r = shallow(
      <ReviewSidebar
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r).toMatchSnapshot();
  });
  it('should not initially show resolved comments', () => {
    const relay = {environment: null};
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(
      r.find('ReviewComment').everyWhere((n) => n.prop('isResolved') === false)
    ).toBeTrue();
  });
  it('toggling "Show/Hide resolved comments" should show/hide resolved comments', async () => {
    const relay = {environment: null};
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    // Show resolved comments:
    r.find('Button')
      .filterWhere((n) => n.text() === 'Show resolved comments')
      .simulate('click');
    expect(
      r
        .find('ReviewComment')
        .someWhere(
          (n) =>
            n.prop('description') === 'This is a resolved internal comment.'
        )
    ).toBeTrue();
    expect(
      r
        .find('ReviewComment')
        .someWhere(
          (n) => n.prop('description') === 'This is a resolved general comment.'
        )
    ).toBeTrue();
    // Hide resolved comments:
    r.find('Button')
      .filterWhere((n) => n.text() === 'Hide resolved comments')
      .simulate('click');
    expect(
      r
        .find('ReviewComment')
        .someWhere(
          (n) =>
            n.prop('description') === 'This is a resolved internal comment.'
        )
    ).toBeFalse();
    expect(
      r
        .find('ReviewComment')
        .someWhere(
          (n) => n.prop('description') === 'This is a resolved general comment.'
        )
    ).toBeFalse();
  });
  it('clicking the "x" button calls the onClose handler', () => {
    const onClose = jest.fn();
    const relay = {environment: null};
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={onClose}
        relay={relay as any}
      />
    );
    r.find('button#close').simulate('click');
    expect(onClose).toBeCalled();
  });
  it('marking the review step completed disables the ability to resolve/delete comments', () => {
    const spy = jest.spyOn(
      require('mutations/application_review_step/updateApplicationReviewStepMutation'),
      'default'
    );
    const relay = {environment: null};
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r.find('ReviewComment').first().prop('viewOnly')).toBeFalse();

    r.find('Button#markCompleted').simulate('click');
    expect(spy).toBeCalledWith(null, {
      input: {
        id: 'abc',
        applicationReviewStepPatch: {
          isComplete: true
        }
      }
    });
    expect(
      r.find('Button').filterWhere((n) => n.text() === 'Mark incomplete')
    ).toBeTruthy();
  });
  it('marking the review step incomplete enables the ability to resolve/delete comments', () => {
    const spy = jest.spyOn(
      require('mutations/application_review_step/updateApplicationReviewStepMutation'),
      'default'
    );
    const relay = {environment: null};
    const data = {
      ...applicationReviewStepWithComments(),
      isComplete: true
    };
    const r = shallow(
      <ReviewSidebar
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r.find('ReviewComment').first().prop('viewOnly')).toBeTrue();

    r.find('.mark-incomplete Button').simulate('click');
    expect(spy).toBeCalledWith(null, {
      input: {
        id: 'abc',
        applicationReviewStepPatch: {
          isComplete: false
        }
      }
    });
    expect(
      r
        .find('Button')
        .filterWhere((n) => n.text() === 'Mark this review step complete')
    ).toBeTruthy();
  });
});
