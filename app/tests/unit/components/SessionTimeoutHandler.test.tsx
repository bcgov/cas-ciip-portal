import SessionTimeoutHandler from 'components/SessionTimeoutHandler';
import {mount, shallow} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';

describe('The Session Timeout Handler', () => {
  it('Shows the modal if there is less time left in the session than the delay', async () => {
    jest.useFakeTimers();
    global.fetch = async () => {
      return {...({} as any), ok: true, json: async () => '15'};
    };
    const dateMock = jest.spyOn(Date, 'now').mockImplementation(() => 10000); // Ten second after January 1st, 1970

    const useEffectMock = jest
      .spyOn(React, 'useEffect')
      .mockImplementation(async (f) => f());

    const componentUnderTest = document.createElement('div');
    document.body.appendChild(componentUnderTest);
    await act(async () => {
      await ReactDOM.render(
        <div>
          <SessionTimeoutHandler
            pageComponent={{isAccessProtected: true} as any}
            modalDisplayDelayBeforeLogout={30}
          />
        </div>,
        componentUnderTest
      );
    });

    expect(document.body.textContent).toBe('abc');
  });

  it('Hides the modal if there is more time left in the session than the delay', () => {});

  it('Hides the modal if the component is not protected', () => {});

  it('Routes to login-redirect if the session is expired', () => {});

  it('Calls the /extend-session endpoint when the user clicks the extend button', () => {});
});
