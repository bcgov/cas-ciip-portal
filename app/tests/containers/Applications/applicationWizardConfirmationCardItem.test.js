import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardConfirmationCardItemComponent} from '../../../containers/Applications/ApplicationWizardConfirmationCardItem';

describe('ApplicationWizardConfirmationComponentCardItem', () => {
  it('should render the individual summary confirmation card component', () => {
    const resultObject = {
      facility: {
        facility: [
          {
            name: 'Jimbo'
          }
        ]
      }
    };
    const formTitle = 'facility';
    const formSubtitle = 'facility';
    const r = shallow(
      <ApplicationWizardConfirmationCardItemComponent
        resultObject={resultObject}
        formTitle={formTitle}
        formSubtitle={formSubtitle}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('CardHeader').text()).toBe('facility -');
  });
});
