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
          rowId
          latestDraftRevision {
            versionNumber
            legalDisclaimerAccepted
          }
          facilityByFacilityId {
            bcghgid
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
        <div className="application-ids">
          Application ID: {application.rowId}
          <br />
          {application.latestDraftRevision.versionNumber > 1 && (
            <>
              Version Number: {application.latestDraftRevision.versionNumber}
              <br />
            </>
          )}
          BC GHG ID: {application.facilityByFacilityId.bcghgid}
        </div>
        <ApplicationWizard query={query} loading={this.props.loading} />
        <style jsx global>{`
          .application-ids {
            margin-top: -50px;
            min-height: 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          @media screen and (min-width: 992px) {
            .application-ids {
              margin-top: -60px;
              min-height: 60px;
            }
          }
        `}</style>
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
