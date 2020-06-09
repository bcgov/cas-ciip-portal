import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Card, Alert} from 'react-bootstrap';
import {newApplicationDisclaimerQueryResponse} from 'newApplicationDisclaimerQuery.graphql';
import ApplicationConsent from 'containers/Applications/ApplicationConsent';
import {CiipPageComponentProps} from 'next-env';
import {NextRouter} from 'next/router';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: newApplicationDisclaimerQueryResponse['query'];
  router: NextRouter;
}
class NewApplicationDisclaimer extends Component<Props> {
  static query = graphql`
    query newApplicationDisclaimerQuery($applicationId: ID!) {
      query {
        session {
          ...defaultLayout_session
        }
        application(id: $applicationId) {
          ...ApplicationConsent_application
        }
      }
    }
  `;

  render() {
    const {query, router} = this.props;
    const {session, application} = query || {};
    const {query: queryparams} = router;

    const {hasSwrsReport} = queryparams;
    const hasImportedReport = hasSwrsReport === 'true';

    let ImportMessage = null;

    if (hasImportedReport) {
      ImportMessage = (
        <Alert variant="info">
          We found an emissions report for this facility, and imported the
          relevant information:
          <br />
          The administrative, fuel, and emission forms will be prepopulated to
          match the data entered in your emission report. Please review it and
          complete the forms with the additional information required for your
          CIIP application.
        </Alert>
      );
    }

    return (
      <DefaultLayout
        session={session}
        allowedGroups={ALLOWED_GROUPS}
        title="Legal Disclaimer"
      >
        <Card className="mb-2">
          <Card.Header>
            Please review and confirm the information below
          </Card.Header>
          <Card.Body>
            <Card.Text style={{padding: '10px 0 10px 0'}}>
              Please note that, once submitted, the Certifying Official and
              Operator certify that the Certifying Official has reviewed the
              information being submitted, and has exercised due diligence to
              ensure that the information is true and complete, and that, to the
              best of the Certifying Official&apos;s knowledge, the information
              submitted herein is accurate and based on reasonable estimates
              using available data.
            </Card.Text>
            <Card.Text style={{padding: '10px 0 10px 0'}}>
              The Operator agrees to repay any incentive amounts erroneously
              paid or which are, upon audit or review by the Province of British
              Columbia, are determined by the Province to be either inconsistent
              with{' '}
              <Card.Link href="https://www2.gov.bc.ca/gov/content/environment/climate-change/industry/cleanbc-program-for-industry/cleanbc-industrial-incentive-program">
                CIIP Rules
              </Card.Link>{' '}
              or not supported by evidence related to fuel usage and tax paid,
              and acknowledges that any repayment amount may be deducted from a
              following year&apos;s incentive payment, or other payments due to
              the Operator from the Province.
            </Card.Text>

            {ImportMessage}
            <ApplicationConsent application={application} />
          </Card.Body>
        </Card>
      </DefaultLayout>
    );
  }
}

export default NewApplicationDisclaimer;
