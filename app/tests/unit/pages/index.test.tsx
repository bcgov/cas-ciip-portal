import React from 'react';
import {shallow} from 'enzyme';
import Index from 'pages';

describe('landing', () => {
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <Index
        query={{
          openedReportingYear: {
            swrsDeadline: '2019-06-01 11:59:59.999-07',
            applicationOpenTime: '2019-04-01 14:49:54.191757-07',
            applicationCloseTime: '2019-12-30 14:49:54.191757-07'
          },
          nextReportingYear: {
            swrsDeadline: '2019-06-01 11:59:59.999-07',
            applicationOpenTime: '2019-04-01 14:49:54.191757-07',
            applicationCloseTime: '2019-12-30 14:49:54.191757-07'
          },
          session: null
        }}
        router={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
