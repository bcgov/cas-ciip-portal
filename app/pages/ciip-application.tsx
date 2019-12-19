import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {ciipApplicationQueryResponse} from 'ciipApplicationQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from '../layouts/default-layout';
import ApplicationWizard from '../containers/Applications/ApplicationWizard';

interface Props extends CiipPageComponentProps {
  query: ciipApplicationQueryResponse['query'];
}
class CiipApplication extends Component<Props> {
  static query = graphql`
    query ciipApplicationQuery(
      $formResultId: ID!
      $applicationId: ID!
      $revisionId: ID!
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
            revisionId: $revisionId
            version: $version
          )
      }
    }
  `;

  static getInitialProps = () => ({
    variables: {
      formResultId: '',
      applicationId: '',
      revisionId: '',
      version: ''
    }
  });

  render() {
    const {query} = this.props;
    const {session} = query || {};
    return (
      <DefaultLayout session={session}>
        <ApplicationWizard query={query} />
      </DefaultLayout>
    );
  }
}

export default CiipApplication;
