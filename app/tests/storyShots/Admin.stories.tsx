import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {storiesOf} from '@storybook/react';
import {createMockEnvironment} from 'relay-test-utils';
import Admin from 'pages/admin';

const environment = createMockEnvironment();

const query = graphql`
  query AdminTestQuery {
    query {
      session {
        ...defaultLayout_session
      }
    }
  }
`;

const router = {
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn()
};

const renderStory = (query, environment, variables = {}) => (
  <QueryRenderer
    environment={environment}
    query={query}
    variables={variables}
    render={({props, error}) => {
      if (error) {
        console.error(error);
        return null;
      }

      return (
        // @ts-ignore
        <Admin
          {...props}
          router={router}
          query={{
            session: {
              ciipUserBySub: {
                id: '42'
              }
            }
          }}
        />
      );
    }}
  />
);

storiesOf('containers/pageContainers/Admin', module).add(
  'Render Admin page',
  () => {
    return renderStory(query, environment);
  }
);
