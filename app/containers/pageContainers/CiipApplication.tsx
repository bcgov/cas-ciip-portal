import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {CiipApplicationQueryResponse} from '__generated__/CiipApplicationQuery.graphql';
import DefaultLayout from '../../layouts/default-layout';
import ApplicationWizard from '../Applications/ApplicationWizard';

interface Props {
  query: CiipApplicationQueryResponse['query'];
}
class CiipApplication extends Component<Props> {
  static query = graphql`
    query CiipApplicationQuery($formResultId: ID!, $applicationId: ID!) {
      query {
        session {
          ...Header_session
        }
        ...ApplicationWizard_query
          @arguments(formResultId: $formResultId, applicationId: $applicationId)
      }
    }
  `;

  static getInitialProps = () => ({
    variables: {
      formResultId: '',
      applicationId: ''
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
