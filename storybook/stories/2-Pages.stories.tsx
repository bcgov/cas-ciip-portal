import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {storiesOf} from '@storybook/react';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';

// import './mockNextRouter';
import Router from 'next/router';
Router.router = {
  push: async () => {},
  prefetch: async () => {},
};

const Page = (Component) => {
  const query = Component.query;
  const environment = createMockEnvironment();
  environment.mock.queueOperationResolver(operation => {
    const payload = MockPayloadGenerator.generate(operation);
    console.log('mock', operation, payload);
    return payload;
  });
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      render={({props, error}) => {
        if (error) {
          console.error(error);
          return 'Error';
        }
        console.log(Component.name, 'props', props);
        return <Component {...props} router={{query:''}} />;
      }}
    />
  )
}

import Admin from 'pages/admin';
import ApplicationReview from 'pages/application-review';
import Applications from 'pages/applications';
import CiipApplicationSWRSImport from 'pages/ciip-application-swrs-import';
import CiipApplication from 'pages/ciip-application';
import CompleteSubmit from 'pages/complete-submit';
import Index from 'pages/index';
import LoginRedirect from 'pages/login-redirect';
import OrganisationRequests from 'pages/organisation-requests';
import ProductsBenchmarks from 'pages/products-benchmarks';
import Registration from 'pages/registration';
import UserDashBoard from 'pages/user-dashboard';
import UserList from 'pages/user-list';
import UserOrganisationFacilities from 'pages/user-organisation-facilities';
import UserProfile from 'pages/user-profile';
import ViewApplication from 'pages/view-application';

[
  Admin,
  // ApplicationReview,
  // Applications,
  CiipApplicationSWRSImport,
  // CiipApplication,
  // Index,
  // LoginRedirect,
  // OrganisationRequests,
  // ProductsBenchmarks,
  Registration,
  UserDashBoard,
  UserList,
  // UserOrganisationFacilities,
  UserProfile,
  // ViewApplication,
].forEach(p => {
  storiesOf('Pages', module).add(
    p.name,
    () => Page(p)
  )
});
