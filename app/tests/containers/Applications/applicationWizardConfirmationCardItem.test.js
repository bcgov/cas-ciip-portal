import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardConfirmationCardItemComponent} from '../../../containers/Applications/ApplicationWizardConfirmationCardItem';

describe('ApplicationWizardConfirmationComponentCardItem', () => {
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
      <ApplicationWizardConfirmationCardItemComponent
        formResult={formResult}
        formTitle={formTitle}
        formSubtitle={formSubtitle}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('CardHeader').text()).toContain('Fuel Usage');
  });
});
