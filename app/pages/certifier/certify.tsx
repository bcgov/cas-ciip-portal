import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import LegalDisclaimerText from 'components/LegalDisclaimerText';
import {certifyQueryResponse} from 'certifyQuery.graphql';
import ApplicationDetailsContainer from 'containers/Applications/ApplicationDetailsContainer';
import ApplicationRecertificationContainer from 'containers/Applications/ApplicationRecertificationContainer';
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
              ...ApplicationRecertificationContainer_certificationUrl
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
      LegalDisclaimer = (
        <>
          <Card style={{margin: '1rem 0'}}>
            <Card.Body>
              <Card.Title className="blue">Legal Disclaimer</Card.Title>
              <Card.Text style={{padding: '10px 0 10px 0'}}>
                Please review the information below before approving an
                application.{' '}
                <a href="/resources/disclaimer" target="_blank">
                  (<FontAwesomeIcon icon={faExternalLinkAlt} />
                  expand)
                </a>
              </Card.Text>
              <Card>
                <div tabIndex={0} id="disclaimer-text" className="show-scrollbar">
                <Card.Body>
                  <LegalDisclaimerText />
                </Card.Body>
                </div>
              </Card>
            </Card.Body>
          </Card>
          <LegalDisclaimerChecklist
            onChange={(allChecked) => this.setState({allChecked})}
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
                liveValidate={false}
              />
              {LegalDisclaimer}
              {Signature}
            </>
          ) : (
            <ApplicationRecertificationContainer
              certificationUrl={
                query.application.latestDraftRevision.certificationUrl
              }
            />
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
            #disclaimer-text {
              max-height: 19.2em;
              background: #eee;
              overflow-y: scroll;
            }
            .show-scrollbar::-webkit-scrollbar {
              -webkit-appearance: none;
              width: 8px;
            }
            .show-scrollbar::-webkit-scrollbar-thumb {
              border-radius: 4px;
              background-color: rgba(0, 0, 0, 0.5);
              box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
            }
          `}
        </style>
      </>
    );
  }
}

export default Certify;
