import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {ciipApplicationQueryResponse} from 'ciipApplicationQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from 'layouts/default-layout';
import ApplicationWizard from 'containers/Applications/ApplicationWizard';
import {USER} from 'data/group-constants';
import {NextRouter} from 'next/router';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: ciipApplicationQueryResponse['query'];
  router: NextRouter;
}
class CiipApplication extends Component<Props> {
  static query = graphql`
    query ciipApplicationQuery(
      $formResultId: ID!
      $applicationId: ID!
      $version: String!
    ) {
      query {
        application(id: $applicationId) {
          id
          latestDraftRevision {
            versionNumber
            legalDisclaimerAccepted
          }
        }
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
    const {query, router} = this.props;
    const {session} = query || {};
    const {application} = query || {};

    if (
      application &&
      application.latestDraftRevision?.legalDisclaimerAccepted === false
    ) {
      router.push({
        pathname: '/reporter/ciip-application-legal-disclaimer',
        query: {
          applicationId: application.id,
          version: application.latestDraftRevision.versionNumber
        }
      });
    }

    return (
      <DefaultLayout session={session} allowedGroups={ALLOWED_GROUPS}>
        <ApplicationWizard query={query} />
      </DefaultLayout>
    );
  }
}

export default CiipApplication;
