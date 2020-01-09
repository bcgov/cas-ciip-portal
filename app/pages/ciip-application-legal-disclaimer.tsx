import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Button, Card, Alert} from 'react-bootstrap';
import {ciipApplicationLegalDisclaimerQueryResponse} from 'ciipApplicationLegalDisclaimerQuery.graphql';
import {CiipPageComponentProps} from 'next-env';
import Link from 'next/link';
import DefaultLayout from '../layouts/default-layout';
import LegalDisclaimerChecklist from '../components/LegalDisclaimerChecklist';

interface Props extends CiipPageComponentProps {
  query: ciipApplicationLegalDisclaimerQueryResponse['query'];
}
class ciipApplicationLegalDisclaimer extends Component<Props> {
  static query = graphql`
    query ciipApplicationLegalDisclaimerQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  state = {
    allChecked: false
  };

  render() {
    const {allChecked} = this.state;
    const {query, router} = this.props;
    const {session} = query || {};
    const {query: queryparams} = router;

    const {applicationId, version, hasSwrsReport} = queryparams;
    const hasImported = hasSwrsReport === 'true';

    let ImportMessage = null;

    if (hasImported) {
      ImportMessage = (
        <Alert variant="danger">
          We found an emissions report for this facility, and imported the
          relevant information:
          <br />
          The administrative, fuel and emission forms will be prepopulated to
          match the data entered in your emission report. Please review it and
          complete the forms with the additional information required for your
          CIIP application.
        </Alert>
      );
    }

    return (
      <DefaultLayout session={session}>
        <Card className="mb-2">
          <Card.Body>
            <Card.Title className="blue">Legal Disclaimer</Card.Title>
            <Card.Text style={{padding: '10px 0 10px 0'}}>
              Note: The application must be submitted by the operator of the
              reporting operation or, if there is more than one operator, the
              designated operator. By submitting the application the applicant
              agrees that the information contained on this application, or
              information contained in emission reports under the Greenhouse Gas
              Industrial Reporting and Control Act, may be shared with other
              British Columbia government agencies for the purpose of
              administering the CleanBC Program for Industry.
            </Card.Text>
          </Card.Body>
        </Card>

        {ImportMessage}

        <LegalDisclaimerChecklist
          onChange={allChecked => this.setState({allChecked})}
        />
        <Link
          href={{
            pathname: '/ciip-application',
            query: {
              applicationId,
              version
            }
          }}
        >
          <Button variant="primary" disabled={!allChecked}>
            Continue
          </Button>
        </Link>
      </DefaultLayout>
    );
  }
}

export default ciipApplicationLegalDisclaimer;
