import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {ciipApplicationQueryResponse} from 'ciipApplicationQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from 'layouts/default-layout';
import ApplicationWizard from 'containers/Applications/ApplicationWizard';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: ciipApplicationQueryResponse['query'];
}
class CiipApplication extends Component<Props> {
  static query = graphql`
    query ciipApplicationQuery(
      $formResultId: ID!
      $applicationId: ID!
      $version: String!
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...ApplicationWizard_query
          @arguments(
            formResultId: $formResultId
            applicationId: $applicationId
            version: $version
          )
      }
    }
  `;

  static getInitialProps = () => ({
    variables: {
      formResultId: '',
      applicationId: '',
      version: ''
    }
  });

  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout session={session} allowedGroups={ALLOWED_GROUPS}>
        <ApplicationWizard query={query} />
      </DefaultLayout>
    );
  }
}

export default CiipApplication;
