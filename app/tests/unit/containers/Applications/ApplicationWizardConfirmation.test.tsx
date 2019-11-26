import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardConfirmationComponent} from 'containers/Applications/ApplicationWizardConfirmation';

describe('ApplicationWizardConfirmationComponent', () => {
  it('should match the snapshot with the ApplicationWizardConfirmation component', async () => {
    const renderer = shallow(
      <ApplicationWizardConfirmationComponent
        relay={null}
        query={{
          ' $refType': 'ApplicationWizardConfirmation_query',
          ' $fragmentRefs': {ApplicationDetailsContainer_query: true},
          application: {
            applicationStatus: {
              id: '42'
            }
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
});
