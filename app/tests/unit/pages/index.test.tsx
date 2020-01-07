import React from 'react';
import {shallow} from 'enzyme';
import Index from 'pages';

describe('landing', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <Index
        query={{
          openedReportingYear: {
            applicationOpenDate: '2019-04-01 14:49:54.191757-07',
            applicationEndDate: '2019-12-30 14:49:54.191757-07'
          },
          nextReportingYear: {
            applicationOpenDate: '2019-04-01 14:49:54.191757-07',
            applicationEndDate: '2019-12-30 14:49:54.191757-07'
          },
          session: null
        }}
        router={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
