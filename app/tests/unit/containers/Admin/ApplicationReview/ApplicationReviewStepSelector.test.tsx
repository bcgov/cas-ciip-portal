import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationReviewStepSelector} from 'containers/Admin/ApplicationReview/ApplicationReviewStepSelector';
import {ApplicationReviewStepSelector_applicationReviewSteps} from '__generated__/ApplicationReviewStepSelector_applicationReviewSteps.graphql';
import {CiipApplicationRevisionStatus} from 'applicationReviewQuery.graphql';

const getApplicationReviewSteps = (allStepsCompleted, completedSteps) => {
  return {
    ' $refType': 'ApplicationReviewStepSelector_applicationReviewSteps',
    edges: [
      {
        node: {
          id: 'abc',
          isComplete: allStepsCompleted || completedSteps.includes(1),
          reviewStepId: 1,
          reviewStepByReviewStepId: {
            stepName: 'administrative'
          }
        }
      },
      {
        node: {
          id: 'def',
          isComplete: allStepsCompleted || completedSteps.includes(2),
          reviewStepId: 2,
          reviewStepByReviewStepId: {
            stepName: 'technical'
          }
        }
      },
      {
        node: {
          id: 'ghi',
          isComplete: allStepsCompleted || completedSteps.includes(3),
          reviewStepId: 3,
          reviewStepByReviewStepId: {
            stepName: 'another'
          }
        }
      }
    ],
    ' $fragmentRefs': {
      ApplicationReviewStepSelector_applicationReviewSteps: true
    }
  };
};

const getTestElement = ({
  status = 'SUBMITTED',
  selectedStep = null,
  onSelectStep = () => {},
  onDecisionOrChangeRequestAction = () => {},
  newerDraftExists = false,
  changeDecision = undefined,
  allStepsCompleted = false,
  completedSteps = []
}) => {
  const data = getApplicationReviewSteps(allStepsCompleted, completedSteps);
  return (
    <ApplicationReviewStepSelector
      applicationReviewSteps={
        data as ApplicationReviewStepSelector_applicationReviewSteps
      }
      decisionOrChangeRequestStatus={status as CiipApplicationRevisionStatus}
      selectedStep={selectedStep}
      onSelectStep={onSelectStep}
      onDecisionOrChangeRequestAction={onDecisionOrChangeRequestAction}
      newerDraftExists={newerDraftExists}
      changeDecision={changeDecision}
    />
  );
};

describe('ApplicationReviewStepSelector', () => {
  it('has no selected steps when `selectedStep` is null', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper).toMatchSnapshot();
    wrapper.find('ListGroupItem').every((item) => {
      return expect(item.prop('active')).toBeFalse();
    });
  });
  it('shows the selected selected step when `selectedStep` is specified', () => {
    const wrapper = shallow(getTestElement({selectedStep: 'def'}));
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('ListGroupItem')
        .filterWhere((item) => item.prop('active') === true)
    ).toHaveLength(1);
  });
  it('shows the application decision if a decision has been made)', () => {
    const approved = shallow(getTestElement({status: 'APPROVED'}));
    const rejected = shallow(getTestElement({status: 'REJECTED'}));
    const changesRequested = shallow(
      getTestElement({status: 'REQUESTED_CHANGES'})
    );
    expect(approved).toMatchSnapshot();
    expect(
      approved.find('#open-decision-dialog').text().includes('approved')
    ).toBeTrue();
    expect(rejected).toMatchSnapshot();
    expect(
      rejected.find('#open-decision-dialog').text().includes('rejected')
    ).toBeTrue();
    expect(changesRequested).toMatchSnapshot();
    expect(
      changesRequested
        .find('#open-decision-dialog')
        .text()
        .includes('Changes have been requested')
    ).toBeTrue();
  });
  it('shows which review steps are completed', () => {
    const wrapper = shallow(getTestElement({completedSteps: [2, 3]}));
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('ListGroupItem.review-step-option')
        .at(1)
        .text()
        .includes('completed')
    ).toBeTrue();
    expect(
      wrapper
        .find('ListGroupItem.review-step-option')
        .at(2)
        .text()
        .includes('completed')
    ).toBeTrue();
    const notCompleted = wrapper
      .find('ListGroupItem.review-step-option')
      .filterWhere((item) => !item.text().includes('completed'));
    notCompleted.forEach((item) =>
      expect(item.text().includes('Administrative')).toBeTrue()
    );
  });
  it('"make a decision or request changes" button is disabled until all review steps are complete', () => {
    const spyForIncomplete = jest.fn();
    const someStepsIncomplete = shallow(
      getTestElement({
        status: 'SUBMITTED',
        completedSteps: [1],
        onDecisionOrChangeRequestAction: spyForIncomplete
      })
    );
    expect(someStepsIncomplete).toMatchSnapshot();
    expect(
      someStepsIncomplete
        .find('ListGroupItem#open-decision-dialog')
        .prop('disabled')
    ).toBeTrue();
    expect(
      someStepsIncomplete
        .find('ListGroupItem#open-decision-dialog')
        .prop('aria-disabled')
    ).toBeTrue();
    // Ensure click handler is inactive when disabled:
    someStepsIncomplete
      .find('ListGroupItem#open-decision-dialog')
      .simulate('click');
    expect(spyForIncomplete).not.toHaveBeenCalled();
    someStepsIncomplete
      .find('ListGroupItem#open-decision-dialog')
      .simulate('keydown', {key: 'Enter'});
    expect(spyForIncomplete).not.toHaveBeenCalled();

    const spyForAllStepsCompleted = jest.fn();
    const allStepsCompleted = shallow(
      getTestElement({
        status: 'SUBMITTED',
        allStepsCompleted: true,
        onDecisionOrChangeRequestAction: spyForAllStepsCompleted
      })
    );
    expect(allStepsCompleted).toMatchSnapshot();
    expect(
      allStepsCompleted
        .find('ListGroupItem#open-decision-dialog')
        .prop('disabled')
    ).toBeFalse();
    expect(
      allStepsCompleted
        .find('ListGroupItem#open-decision-dialog')
        .prop('aria-disabled')
    ).toBeFalse();
    // Ensure click handler fires when not disabled:
    allStepsCompleted
      .find('ListGroupItem#open-decision-dialog')
      .simulate('click');
    expect(spyForAllStepsCompleted).toHaveBeenCalledTimes(1);
    allStepsCompleted
      .find('ListGroupItem#open-decision-dialog')
      .simulate('keydown', {key: 'Enter'});
    expect(spyForAllStepsCompleted).toHaveBeenCalledTimes(2);
  });
  it('"make a decision or request changes" button is disabled once a decision has been made', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      getTestElement({status: 'REJECTED', onDecisionOrChangeRequestAction: spy})
    );
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('ListGroupItem#open-decision-dialog');
    expect(button.prop('disabled')).toBeTrue();
    expect(button.prop('aria-disabled')).toBeTrue();
    button.simulate('click');
    expect(spy).not.toHaveBeenCalled();
    wrapper
      .find('ListGroupItem#open-decision-dialog')
      .simulate('keydown', {key: 'Enter'});
    expect(spy).not.toHaveBeenCalled();
  });
  it('"make a decision or request changes" button is disabled if a newer draft exists', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      getTestElement({
        status: 'SUBMITTED',
        onDecisionOrChangeRequestAction: spy,
        newerDraftExists: true
      })
    );
    const button = wrapper.find('ListGroupItem#open-decision-dialog');
    expect(button.prop('disabled')).toBeTrue();
    expect(button.prop('aria-disabled')).toBeTrue();
    button.simulate('click');
    expect(spy).not.toHaveBeenCalled();
    wrapper
      .find('ListGroupItem#open-decision-dialog')
      .simulate('keydown', {key: 'Enter'});
    expect(spy).not.toHaveBeenCalled();
  });
  it('shows optional "Change decision" button', () => {
    const spy = jest.fn();
    const notEnabled = shallow(getTestElement({status: 'REJECTED'}));
    const enabled = shallow(
      getTestElement({status: 'REJECTED', changeDecision: spy})
    );
    // Ensure button to change decision not rendered or active unless enabled:
    expect(
      notEnabled
        .find('Button')
        .findWhere((el) => el.text().includes('Change decision'))
        .exists()
    ).toBeFalse();
    const button = enabled.find('Button');
    expect(button.text().includes('Change decision')).toBeTrue();
    expect(enabled).toMatchSnapshot();
    button.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('"Change decision" button is inactive if a newer draft exists', () => {
    const spyForEnabled = jest.fn();
    const spyForDisabled = jest.fn();
    const enabled = shallow(
      getTestElement({
        status: 'REQUESTED_CHANGES',
        newerDraftExists: false,
        changeDecision: spyForEnabled
      })
    );
    const disabled = shallow(
      getTestElement({
        status: 'REQUESTED_CHANGES',
        newerDraftExists: true,
        changeDecision: spyForDisabled
      })
    );
    expect(
      enabled.find('#change-decision Button').prop('disabled')
    ).toBeFalse();
    enabled.find('#change-decision Button').simulate('click');
    expect(spyForEnabled).toHaveBeenCalledTimes(1);
    expect(
      disabled.find('#change-decision Button').prop('disabled')
    ).toBeTrue();
    expect(spyForDisabled).not.toHaveBeenCalled();
  });
});
