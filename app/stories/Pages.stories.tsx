import React from 'react';
import {QueryRenderer} from 'react-relay';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
import {withA11y} from '@storybook/addon-a11y';

// Commented out imports are pages to be tested in a subsequent PR
import Admin from 'pages/admin';
// Import ApplicationReview from 'pages/analyst/application-review';
// import Applications from 'pages/analyst/applications';
import CiipApplicationSWRSImport from 'pages/reporter/ciip-application-swrs-import';
// Import CiipApplication from 'pages/reporter/ciip-application';
// import CompleteSubmit from 'pages/reporter/complete-submit';
// import Index from 'pages/index';
// import LoginRedirect from 'pages/login-redirect';
// import OrganisationRequests from 'pages/analyst/organisation-requests';
// import ProductsBenchmarks from 'pages/admin/products-benchmarks';
import Registration from 'pages/registration';
import UserDashboard from 'pages/reporter/user-dashboard';
import UserList from 'pages/admin/user-list';
// Import UserOrganisationFacilities from 'pages/user-organisation-facilities';
import UserProfile from 'pages/user-profile';
// Import ViewApplication from 'pages/reporter/view-application';
import {getAllGroups} from '../lib/user-groups';
import {Router} from './mockNextRouter';

const render = (Component) => {
  const {query} = Component;
  const environment = createMockEnvironment();
  const variables = {...Router.router.query};
  environment.mock.queueOperationResolver((operation) => {
    const payload = MockPayloadGenerator.generate(operation, {
      // https://relay.dev/docs/en/testing-relay-components#relay_test_operation
      // Define a mock resolver for userGroups to pass an array of all group names
      String() {
        return getAllGroups();
      }
    });
    return payload;
  });
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({props, error}) => {
        if (error) {
          console.error(error);
          return 'Error';
        }

        return <Component {...props} router={{query: ''}} />;
      }}
    />
  );
};

export default {
  title: 'Pages',
  decorators: [withA11y]
};

export const admin = () => render(Admin);
export const ciip_application_swrs_import = () =>
  render(CiipApplicationSWRSImport);
export const registration = () => render(Registration);
export const user_dashboard = () => render(UserDashboard);
export const user_list = () => render(UserList);
export const user_profile = () => render(UserProfile);
