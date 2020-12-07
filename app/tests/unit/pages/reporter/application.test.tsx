import React from 'react';
import {shallow} from 'enzyme';
import Application from 'pages/reporter/application';
import {applicationQueryResponse} from 'applicationQuery.graphql';

const query: applicationQueryResponse['query'] = {
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  ' $fragmentRefs': {
    ApplicationWizard_query: true
  },
  application: {
    id: '1',
    latestDraftRevision: {
      versionNumber: 1,
      legalDisclaimerAccepted: true
    }
  }
};

describe('The /reporter/application page', () => {
  // It matches the last accepted Snapshot
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Application query={query} router={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes a query to the ApplicationWizard component', () => {
    const wrapper = shallow(<Application query={query} router={null} />);
    expect(
      wrapper.find('Relay(ApplicationWizardComponent)').prop('query')
    ).toBe(query);
  });
});
