import React from 'react';
import {shallow} from 'enzyme';
import {KeyDatesComponent} from 'containers/KeyDates';

describe('The KeyDates component', () => {
  it('should render the key dates of the current reporting year', () => {
    const component = shallow(
      <KeyDatesComponent
        query={{
          ' $refType': 'KeyDates_query',
          openedReportingYear: {
            applicationCloseTime: '2020-01-03T23:59:59-07:00',
            applicationOpenTime: '2020-01-02T23:59:59-07:00',
            swrsDeadline: '2020-01-01T23:59:59-07:00'
          },
          nextReportingYear: null
        }}
      />
    );

    const rows = component.find('tbody > tr');
    expect(rows.at(0).find('td').first().text()).toEqual('Jan 1, 2020');
    expect(rows.at(1).find('td').first().text()).toEqual('Jan 2, 2020');
    expect(rows.at(2).find('td').first().text()).toEqual('Jan 3, 2020');

    expect(component).toMatchSnapshot();
  });

  it('should render the key dates of the next reporting year when the reporting year is closed', () => {
    const component = shallow(
      <KeyDatesComponent
        query={{
          ' $refType': 'KeyDates_query',
          openedReportingYear: null,
          nextReportingYear: {
            applicationCloseTime: '2020-01-03T23:59:59-07:00',
            applicationOpenTime: '2020-01-02T23:59:59-07:00',
            swrsDeadline: '2020-01-01T23:59:59-07:00'
          }
        }}
      />
    );

    const rows = component.find('tbody > tr');
    expect(rows.at(0).find('td').first().text()).toEqual('Jan 1, 2020');
    expect(rows.at(1).find('td').first().text()).toEqual('Jan 2, 2020');
    expect(rows.at(2).find('td').first().text()).toEqual('Jan 3, 2020');

    expect(component).toMatchSnapshot();
  });

  it('should not render anything if the reporting year is closed and there is no next reporting year', () => {
    const component = shallow(
      <KeyDatesComponent
        query={{
          ' $refType': 'KeyDates_query',
          openedReportingYear: null,
          nextReportingYear: null
        }}
      />
    );
    expect(component).toEqual({});
  });
});
