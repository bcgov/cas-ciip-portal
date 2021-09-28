import React from 'react';
import LogoutWarningModal from 'components/LogoutWarningModal';
import {shallow} from 'enzyme';

describe('The Logout Warning Modal', () => {
  it('Should match the snapshot', () => {
    const componentUnderTest = shallow(
      <LogoutWarningModal
        inactivityDelaySeconds={1234}
        onExtendSession={() => {}}
        expiresOn={12345}
      />
    );
    expect(componentUnderTest).toMatchSnapshot();
  });

  it('should call the extendSession function', () => {
    const spy = jest.fn();
    const componentUnderTest = shallow(
      <LogoutWarningModal
        inactivityDelaySeconds={1234}
        onExtendSession={spy}
        expiresOn={12345}
      />
    );
    componentUnderTest.find('Remain active').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
