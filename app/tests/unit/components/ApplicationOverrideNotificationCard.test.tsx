import React from 'react';
import {shallow} from 'enzyme';
import ApplicationOverrideNotification from 'components/Application/ApplicationOverrideNotificationCard';

describe('OverrideNotificationCard', () => {
  it('Should render null if overrideJustification prop is null', async () => {
    const r = shallow(
      <ApplicationOverrideNotification overrideJustification={null} />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Card').exists()).toBe(false);
  });

  it('Should render the notification card & justification text if the overrideJustification prop is not null', async () => {
    const r = shallow(
      <ApplicationOverrideNotification overrideJustification="bad stuff happened" />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Card').exists()).toBe(true);
    expect(r.find('CardBody').at(1).text()).toBe('bad stuff happened');
  });
});
