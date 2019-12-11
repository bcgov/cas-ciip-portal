import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationDetailsCardItemComponent} from '../../../../containers/Applications/ApplicationDetailsCardItem';

describe('ApplicationDetailsCardItemComponent', () => {
  it('should render the individual summary confirmation card component', () => {
    const formResult = {
      formResult: {},
      formJsonByFormId: {
        name: 'Fuel Usage',
        formJson: {schema: {title: 'Fuel UsageCollapse'}}
      }
    };
    const formTitle = 'facility';
    const formSubtitle = 'facility';
    const r = shallow(
      <ApplicationDetailsCardItemComponent
        formResult={formResult}
        formTitle={formTitle}
        formSubtitle={formSubtitle}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('CardHeader').text()).toContain('Fuel Usage');
  });
});
