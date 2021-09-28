import React from 'react';
import LogoutWarningModal from 'components/LogoutWarningModal';
import {mount, shallow} from 'enzyme';

afterEach(() => {
  jest.useRealTimers();
});

describe('The Logout Warning Modal', () => {
  it('Should match the snapshot', () => {
    jest.useFakeTimers();
    const dateMock = jest.spyOn(Date, 'now').mockImplementation(() => 1000); // One second after January 1st, 1970

    const componentUnderTest = shallow(
      <LogoutWarningModal
        inactivityDelaySeconds={120}
        onExtendSession={() => {}}
        expiresOn={12000}
      />
    );
    expect(componentUnderTest).toMatchSnapshot();

    dateMock.mockRestore();
  });

  it('should call the extendSession function', () => {
    const expireSpy = jest.fn();
    const componentUnderTest = shallow(
      <LogoutWarningModal
        inactivityDelaySeconds={1234}
        onExtendSession={expireSpy}
        expiresOn={12345}
      />
    );
    componentUnderTest.find('Button').simulate('click');
    expect(expireSpy).toHaveBeenCalled();
  });

  it('should countdown seconds', () => {
    jest.useFakeTimers();
    let dateMock = jest.spyOn(Date, 'now').mockImplementation(() => 1000); // 1 second after Jan. 1st, 1970

    const componentUnderTest = mount(
      <LogoutWarningModal
        inactivityDelaySeconds={120}
        onExtendSession={() => {}}
        expiresOn={17000} // 17 seconds after Jan. 1st, 1970
      />
    );

    expect(componentUnderTest).toMatchSnapshot();
    expect(
      componentUnderTest
        .text()
        .trim()
        .includes('You will be logged out in 16 seconds')
    ).toBeTrue();

    dateMock.mockRestore();
    dateMock = jest.spyOn(Date, 'now').mockImplementation(() => 5000); // 5 second after Jan. 1st, 1970
    jest.runOnlyPendingTimers();

    // When the timer expires the component re-syncs from the system time
    expect(
      componentUnderTest
        .text()
        .trim()
        .includes('You will be logged out in 12 seconds')
    ).toBeTrue();

    dateMock.mockRestore();
  });
});
