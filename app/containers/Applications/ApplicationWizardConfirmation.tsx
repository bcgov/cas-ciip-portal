import React, {useRef, useState, SyntheticEvent} from 'react';
import {Button, Row, Col, Card, Form} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import SubmitApplication from 'components/SubmitApplication';
import {ApplicationWizardConfirmation_query} from 'ApplicationWizardConfirmation_query.graphql';
import {ApplicationWizardConfirmation_application} from 'ApplicationWizardConfirmation_application.graphql';
import createCertificationUrlMutation from 'mutations/form/createCertificationUrl';
import updateCertificationUrlMutation from 'mutations/form/updateCertificationUrlMutation';
import ApplicationDetailsContainer from './ApplicationDetailsContainer';
/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationWizardConfirmation_query;
  application: ApplicationWizardConfirmation_application;
  relay: RelayProp;
}

interface Target extends EventTarget {
  email: {
    value: string;
  };
}

export const ApplicationWizardConfirmationComponent: React.FunctionComponent<Props> = props => {
  const [copySuccess, setCopySuccess] = useState('');
  const [url, setUrl] = useState();
  const copyArea = useRef(url);
  const revision = props.application.latestDraftRevision;

  const copyToClipboard = () => {
    const el = copyArea;
    el.current.select();
    // TODO(Dylan): execCommand copy is deprecated. Look into a replacement
    const success = document.execCommand('copy');
    if (success) return setCopySuccess('Copied!');
    throw new Error('document.execCommand(`copy`) failed');
  };

  const handleClickGenerateCertificationUrl = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.persist();
    const email = (e.target as Target).email.value;
    const {environment} = props.relay;
    const variables = {
      input: {
        certificationUrl: {
          /**  The rowId in ggircs_portal.certification_url is the primary key (thus required in the relay variables)
               but the actual rowId is generated on the postgres level with a trigger, so a placeholder rowId is set here */
          rowId: 'placeholder',
          applicationId: props.application.rowId,
          versionNumber: revision.versionNumber
        }
      }
    };
    const response = await createCertificationUrlMutation(
      environment,
      variables
    );

    console.log(response);
    try {
      setUrl(
        `${
          window.location.host
        }/certifier/certification-redirect?rowId=${encodeURIComponent(
          response.createCertificationUrl.certificationUrl.rowId
        )}&id=${encodeURIComponent(props.application.id)}`
      );
      const updateVariables = {
        input: {
          id: response.createCertificationUrl.certificationUrl.id,
          certificationUrlPatch: {
            certifierUrl: `${
              window.location.host
            }/certifier/certification-redirect?rowId=${encodeURIComponent(
              response.createCertificationUrl.certificationUrl.rowId
            )}&id=${encodeURIComponent(props.application.id)}`,
            certificationRequestSentTo: email
          }
        }
      };
      const updateResponse = await updateCertificationUrlMutation(
        environment,
        updateVariables
      );
      console.log(updateResponse);
    } catch (error) {
      throw new Error(error);
    }
  };

  const generateCertification = (
    <>
      <br />
      <Form onSubmit={handleClickGenerateCertificationUrl}>
        <Form.Row>
          <Col md={6}>
            <Form.Group controlId="certifierEmail">
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                Send URL to certifier
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit">
              Send to Certifier
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  );

  let certificationMessage;

  const copyUrl = (
    <Row>
      <Col md={6}>
        <input
          ref={copyArea}
          readOnly
          value={url || revision?.certificationUrl?.certifierUrl}
          style={{width: '100%'}}
        />
      </Col>
      <Col md={2}>
        <Button onClick={copyToClipboard}>Copy Link</Button>
        <span style={{color: 'green'}}>{copySuccess}</span>
      </Col>
    </Row>
  );

  if (!revision.certificationUrl) {
    certificationMessage = (
      <>
        <h5>
          Thank you for reviewing the application information. You may now send
          a generated Certification url to be signed prior to submission.
        </h5>
        {url ? copyUrl : generateCertification}
      </>
    );
  } else if (
    !revision.certificationUrl.certificationSignature &&
    revision.certificationUrl.hashMatches
  ) {
    certificationMessage = (
      <>
        <h5>
          Your application has been sent to a certifier. Submission will be
          possible once they have verified the data in the application.
        </h5>
        {copyUrl}
      </>
    );
  } else {
    certificationMessage = (
      <>
        <Card className="text-center">
          <Card.Header>Error</Card.Header>
          <Card.Body>
            <Card.Title>The data has changed</Card.Title>
            <Card.Text>
              The application data has been changed since the certifier added
              their signature.
            </Card.Text>
            <Card.Text>
              Please generate and send a new certification URL.
            </Card.Text>
          </Card.Body>
          <Card.Footer />
        </Card>
        {generateCertification}
      </>
    );
  }

  return (
    <>
      <h1>Summary of your application:</h1>
      <h5>
        Please review the information you have provided before continuing.
      </h5>
      <br />

      <ApplicationDetailsContainer
        query={props.query}
        application={props.application}
        review={false}
      />
      <br />
      {revision.certificationSignatureIsValid ? (
        <>
          <h5>
            Thank you for reviewing the application information. The Certifier
            has signed off on this application. You may now submit the
            application.
          </h5>
          <br />
          <SubmitApplication application={props.application} />
        </>
      ) : (
        <>{certificationMessage}</>
      )}
    </>
  );
};

export default createFragmentContainer(ApplicationWizardConfirmationComponent, {
  application: graphql`
    fragment ApplicationWizardConfirmation_application on Application
      @argumentDefinitions(version: {type: "String!"}) {
      id
      rowId
      ...SubmitApplication_application
      ...ApplicationDetailsContainer_application @arguments(version: $version)
      latestDraftRevision {
        versionNumber
        certificationSignatureIsValid
        certificationUrl {
          id
          certificationSignature
          hashMatches
          certifierUrl
        }
      }
    }
  `,
  query: graphql`
    fragment ApplicationWizardConfirmation_query on Query {
      ...ApplicationDetailsContainer_query
        @arguments(
          applicationId: $applicationId
          oldVersion: $version
          newVersion: $version
        )
    }
  `
});
