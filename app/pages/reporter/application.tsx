import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {applicationQueryResponse} from 'applicationQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import DefaultLayout from 'layouts/default-layout';
import ApplicationWizard from 'containers/Applications/ApplicationWizard';
import {USER} from 'data/group-constants';
import {NextRouter} from 'next/router';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: applicationQueryResponse['query'];
  router: NextRouter;
}
class Application extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query applicationQuery(
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

    // Route to 404 page if no application is present
    if (!application) {
      router.push({pathname: '/404'});
      return null;
    }

    if (!application?.latestDraftRevision?.legalDisclaimerAccepted) {
      router.push({
        pathname: '/reporter/new-application-disclaimer',
        query: {
          applicationId: application.id,
          version: application.latestDraftRevision.versionNumber
        }
      });
    }

    return (
      <DefaultLayout session={session}>
        <ApplicationWizard query={query} />
        <style jsx global>{`
          @media print {
            .nav-guide-container {
              display: none !important;
            }
          }
        `}</style>
      </DefaultLayout>
    );
  }
}

export default Application;
