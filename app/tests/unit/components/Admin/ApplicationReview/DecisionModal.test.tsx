import React from 'react';
import {shallow} from 'enzyme';
import {DecisionModal} from 'components/Admin/ApplicationReview/DecisionModal';

const getTestElement = ({
  show = true,
  currentStatus = 'SUBMITTED',
  onDecision = () => {},
  onHide = () => {}
}) => {
  return (
    <DecisionModal
      show={show}
      currentStatus={currentStatus}
      onDecision={onDecision}
      onHide={onHide}
    />
  );
};

describe('Application decision modal', () => {
  it('presents options to make a decision or request changes if a decision has not been made', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('ModalHeader')
        .text()
        .includes('Make a Decision or Request Changes')
    ).toBeTrue();
  });
  it('presents the option to revert the application decision if a decision has been made', () => {
    const wrapper = shallow(getTestElement({currentStatus: 'REJECTED'}));
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find('ModalHeader').text().includes('Revert Decision')
    ).toBeTrue();
  });
  it('shows a special note about limitations on reverting the decision when the current status is REQUESTED_CHANGES', () => {
    const wrapper = shallow(
      getTestElement({currentStatus: 'REQUESTED_CHANGES'})
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a Bootstrap modal', () => {
    const wrapper = shallow(getTestElement({}));
    expect(wrapper.find('Modal').exists()).toBeTrue();
  });
  it('passes the `show` prop to the Bootstrap modal', () => {
    const shown = shallow(getTestElement({show: true}));
    expect(shown.find('Modal').prop('show')).toBeTrue();
    const hidden = shallow(getTestElement({show: false}));
    expect(hidden.find('Modal').prop('show')).toBeFalse();
  });
  it('closing the Bootstrap modal fires the `onHide` prop', () => {
    const spy = jest.fn();
    const wrapper = shallow(getTestElement({onHide: spy}));
    const modalOnHide: () => void = wrapper.find('Modal').prop('onHide');
    expect(spy).not.toHaveBeenCalled();
    modalOnHide();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('clicking the "Approve" button fires the `onDecision` prop with the corresponding decision', () => {
    const decision = 'APPROVED';
    const spy = jest.fn();
    const wrapper = shallow(
      getTestElement({currentStatus: 'SUBMITTED', onDecision: spy})
    );
    expect(spy).not.toHaveBeenCalled();

    const approveButton = wrapper
      .find('Button')
      .findWhere((btn) => btn.prop('value') === decision);

    expect(approveButton.exists()).toBeTrue();
    approveButton.simulate('click', {target: {value: decision}});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(decision);
  });
  it('clicking the "Reject" button fires the `onDecision` prop with the corresponding decision', () => {
    const decision = 'REJECTED';
    const spy = jest.fn();
    const wrapper = shallow(
      getTestElement({currentStatus: 'SUBMITTED', onDecision: spy})
    );
    expect(spy).not.toHaveBeenCalled();

    const rejectButton = wrapper
      .find('Button')
      .findWhere((btn) => btn.prop('value') === decision);

    expect(rejectButton.exists()).toBeTrue();
    rejectButton.simulate('click', {target: {value: decision}});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(decision);
  });
  it('clicking the "Request Changes" button fires the `onDecision` prop with the corresponding decision', () => {
    const decision = 'REQUESTED_CHANGES';
    const spy = jest.fn();
    const wrapper = shallow(
      getTestElement({currentStatus: 'SUBMITTED', onDecision: spy})
    );
    expect(spy).not.toHaveBeenCalled();

    const requestChangesButton = wrapper
      .find('Button')
      .findWhere((btn) => btn.prop('value') === decision);

    expect(requestChangesButton.exists()).toBeTrue();
    requestChangesButton.simulate('click', {target: {value: decision}});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(decision);
  });
  it('clicking the "Revert Decision" button fires the `onDecision` prop with the corresponding decision', () => {
    const decision = 'SUBMITTED';
    const spy = jest.fn();
    const wrapper = shallow(
      getTestElement({currentStatus: 'APPROVED', onDecision: spy})
    );
    expect(spy).not.toHaveBeenCalled();

    const revertDecisionButton = wrapper
      .find('Button')
      .findWhere((btn) => btn.prop('value') === decision);

    expect(revertDecisionButton.exists()).toBeTrue();
    revertDecisionButton.simulate('click', {target: {value: decision}});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(decision);
  });
});
