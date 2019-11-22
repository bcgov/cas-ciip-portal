import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {createMockEnvironment} from 'relay-test-utils';
import {ApplicationWizardConfirmationTestQuery} from 'ApplicationWizardConfirmationTestQuery.graphql';
import {create} from 'react-test-renderer';
import ApplicationWizardConfirmation from '../../../containers/Applications/ApplicationWizardConfirmation';

describe('ApplicationWizardConfirmationComponent', () => {
  const environment = createMockEnvironment();
  const TestRenderer = () => (
    <QueryRenderer<ApplicationWizardConfirmationTestQuery>
      environment={environment}
      query={graphql`
        query ApplicationWizardConfirmationTestQuery($applicationId: ID!) {
          query {
            ...ApplicationWizardConfirmation_query
              @arguments(applicationId: $applicationId)
          }
        }
      `}
      variables={{applicationId: '2'}}
      render={({error, props}) => {
        if (props) {
          return <ApplicationWizardConfirmation query={props.query} />;
        }

        if (error) {
          return error.message;
        }

        return 'Loading...';
      }}
    />
  );

  it('should match the snapshot with the ApplicationWizardConfirmation component', async () => {
    const renderer = create(<TestRenderer />);
    expect(renderer).toMatchSnapshot();
  });
});
