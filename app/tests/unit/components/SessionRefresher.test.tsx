import SessionRefresher, {THROTTLED_TIME} from 'components/SessionRefresher';
import {mount} from 'enzyme';
import React from 'react';

const existingFetch = global.fetch;

beforeEach(() => {
  const fetchMock = jest.fn();
  global.fetch = fetchMock;
  jest.useFakeTimers();
});

afterEach(() => {
  global.fetch = existingFetch;
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe('The Session Refresher', () => {
  it('Throttles calls to fetch on user events', async () => {
    const map = {};
    window.addEventListener = jest.fn((event, callback) => {
      map[event] = callback;
    });

    mount(<SessionRefresher refreshUrl="/session-idle-remaining-time" />);

    expect(global.fetch.mock.calls.length).toBe(0);

    // Trigger keydown event
    map.keydown({key: 'Enter'});
    jest.advanceTimersByTime(THROTTLED_TIME * 0.5);
    map.keydown({key: 'Enter'});
    jest.advanceTimersByTime(THROTTLED_TIME);

    expect(global.fetch.mock.calls.length).toBe(1);
  });
});
