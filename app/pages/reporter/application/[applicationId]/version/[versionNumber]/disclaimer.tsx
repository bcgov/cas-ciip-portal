import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Card, Alert} from 'react-bootstrap';
import {disclaimerNewApplicationQueryResponse} from 'disclaimerNewApplicationQuery.graphql';
import ApplicationConsent from 'containers/Applications/ApplicationConsent';
import {CiipPageComponentProps} from 'next-env';
import {NextRouter} from 'next/router';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';
import {
  getApplicationDisclaimerPageRoute,
  getApplicationPageRoute
} from 'routes';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: disclaimerNewApplicationQueryResponse['query'];
  router: NextRouter;
}
class NewApplicationDisclaimer extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query disclaimerNewApplicationQuery(
      $applicationId: ID!
      $versionNumber: String!
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        application(id: $applicationId) {
          id
          applicationRevisionByStringVersionNumber(
            versionNumberInput: $versionNumber
          ) {
            versionNumber
            legalDisclaimerAccepted
            ...ApplicationConsent_applicationRevision
          }
          latestDraftRevision {
            versionNumber
          }
        }
      }
    }
  `;

  render() {
    const {query, router} = this.props;
    const {session, application} = query || {};
    const {hasSwrsReport} = router.query;

    if (!application) {
      router.push('/404');
      return null;
    }

    const {
      applicationRevisionByStringVersionNumber: applicationRevision,
      latestDraftRevision
    } = application;

    if (!applicationRevision || !latestDraftRevision) {
      router.push('/404');
      return null;
    }

    if (
      latestDraftRevision.versionNumber !== applicationRevision.versionNumber
    ) {
      router.replace(
        getApplicationDisclaimerPageRoute(
          application.id,
          latestDraftRevision.versionNumber,
          hasSwrsReport as string
        )
      );
    }

    if (applicationRevision.legalDisclaimerAccepted) {
      router.replace(getApplicationPageRoute(application.id));
    }

    const importMessage =
      hasSwrsReport === 'true' ? (
        <Alert variant="info">
          <p>
            We found an emissions report submitted under the{' '}
            <em>Greenhouse Gas Industrial Reporting and Control Act</em> for an
            operation that includes this facility.
          </p>
          <p>
            The Administrative Data, SWRS Onsite Emissions, and Fuels forms of
            this application will be prepopulated from the relevant sections of
            that emissions report. Please review it and complete the forms with
            the additional information required for your CIIP application.
          </p>
        </Alert>
      ) : null;

    return (
      <DefaultLayout session={session} title="Legal Disclaimer">
        <Card className="mb-2">
          <Card.Header>
            Please review and confirm the information below
          </Card.Header>
          <Card.Body>
            <Card.Text style={{padding: '10px 0 10px 0'}}>
              Please note that, prior to submission, you will be asked to
              confirm that you have exercised due diligence to ensure that the
              information is true and complete, and that, to the best of your
              knowledge, the information submitted herein is accurate and based
              on reasonable estimates using available data.
            </Card.Text>
            {importMessage}
            <ApplicationConsent applicationRevision={applicationRevision} />
          </Card.Body>
        </Card>
      </DefaultLayout>
    );
  }
}

export default NewApplicationDisclaimer;
