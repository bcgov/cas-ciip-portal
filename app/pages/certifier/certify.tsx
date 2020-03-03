import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Card} from 'react-bootstrap';
import {certifyQueryResponse} from 'certifyQuery.graphql';
import ApplicationDetailsContainer from 'containers/Applications/ApplicationDetailsContainer';
import CertificationSignature from 'containers/Forms/CertificationSignature';
import DefaultLayout from 'layouts/default-layout';
import LegalDisclaimerChecklist from 'components/LegalDisclaimerChecklist';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

interface Props {
  query: certifyQueryResponse['query'];
  router: any;
}

class Certify extends Component<Props> {
  static query = graphql`
    query certifyQuery($applicationId: ID!, $version: String!) {
      query {
        session {
          ciipUserBySub {
            id
            firstName
            lastName
          }
          ...defaultLayout_session
        }
        ...ApplicationDetailsContainer_query
          @arguments(
            applicationId: $applicationId
            oldVersion: $version
            newVersion: $version
          )
        application(id: $applicationId) {
          latestDraftRevision {
            certificationUrl {
              certificationSignature
              hashMatches
            }
          }
          ...CertificationSignature_application
          ...ApplicationDetailsContainer_application
            @arguments(version: $version)
        }
      }
    }
  `;

  state = {
    allChecked: false
  };

  render() {
    const {allChecked} = this.state;
    const {query} = this.props;
    const {
      hashMatches
    } = this.props.query.application.latestDraftRevision.certificationUrl;

    let LegalDisclaimer = null;
    let Signature = null;

    if (
      !query.application.latestDraftRevision?.certificationUrl
        ?.certificationSignature
    ) {
      const {firstName, lastName} = query.session.ciipUserBySub;
      const fullName = `${firstName} ${lastName}`;

      LegalDisclaimer = (
        <>
          <Card style={{margin: '1rem 0'}}>
            <Card.Body>
              <Card.Title className="blue">Legal Disclaimer</Card.Title>
              <Card.Text style={{padding: '10px 0 10px 0'}}>
                I{' '}
                <span style={{fontStyle: 'italic', fontWeight: 'bold'}}>
                  {fullName}
                </span>{' '}
                ,having the authority to bind the company applying, hereby
                certify that I have reviewed the information being submitted,
                that I have exercised due diligence to ensure that the
                information is true and complete, and that, to the best of my
                knowledge, the products and quantities submitted herein are
                accurate and based on reasonable estimates using available data;
                and agree to repayment of incentive amounts erroneously paid or
                which are, upon audit or reconsideration by the Climate Action
                Secretariat, determined to either be inconsistent with the
                CleanBC Industrial Incentive Programs’ rules or not supported by
                evidence related to fuel usage and tax paid; and understand that
                any repayment amount may be deducted from a following year’s
                incentive payment.
              </Card.Text>
            </Card.Body>
          </Card>
          <LegalDisclaimerChecklist
            onChange={allChecked => this.setState({allChecked})}
          />
        </>
      );

      if (allChecked) {
        Signature = <CertificationSignature application={query.application} />;
      }
    }

    return (
      <>
        <DefaultLayout
          title="Submission Certification"
          session={query.session}
          allowedGroups={ALLOWED_GROUPS}
        >
          {hashMatches ? (
            <>
              <ApplicationDetailsContainer
                query={query}
                application={query.application}
                review={false}
              />
              {LegalDisclaimer}
              {Signature}
            </>
          ) : (
            <Card className="text-center">
              <Card.Header>Error</Card.Header>
              <Card.Body>
                <Card.Title>The data has changed</Card.Title>
                <Card.Text>
                  The application data associated with this certification URL
                  has been modified after the URL was generated.
                </Card.Text>
                <Card.Text>
                  A notification has been automatically sent to the reporter
                  requesting the submission of a new URL with the updated
                  application data.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                No action is required on your part
              </Card.Footer>
            </Card>
          )}
        </DefaultLayout>
        <style jsx global>
          {`
            .signatureCanvas {
              border: 1px solid #bbb;
              padding: 30px;
              width: 80%;
              background: #eee;
              border-radius: 6px;
              margin-bottom: 60px;
            }
          `}
        </style>
      </>
    );
  }
}

export default Certify;
