import React, {useRef, useState, SyntheticEvent} from 'react';
import {Button, Row, Col, Card, Form} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import SubmitApplication from 'components/SubmitApplication';
import {ApplicationWizardConfirmation_query} from 'ApplicationWizardConfirmation_query.graphql';
import {ApplicationWizardConfirmation_application} from 'ApplicationWizardConfirmation_application.graphql';
import createCertificationUrlMutation from 'mutations/form/createCertificationUrl';
import updateCertificationUrlMutation from 'mutations/form/updateCertificationUrlMutation';
import ApplicationDetailsContainer from './ApplicationDetailsContainer';
import ApplicationOverrideJustification from 'components/Application/ApplicationOverrideJustification';
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
  sendEmailChecked: {
    checked: boolean;
  };
}

function debounce(fn, wait, immediate?) {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = null;
      if (!immediate) fn.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (immediate && !timeout) fn.apply(this, args);
  };
}

export const ApplicationWizardConfirmationComponent: React.FunctionComponent<Props> = (
  props
) => {
  const [
    enableSubmitForCertification,
    setEnableSubmitForCertification
  ] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [url, setUrl] = useState<string>();
  const [isChecked, toggleChecked] = useState(true);
  // State of hasErrors is set to null until the child component ApplicationDetailsContainer returns a valid true/false decision
  const [hasErrors, setHasErrors] = useState(false);
  const copyArea = useRef(null);
  const revision = props.application.latestDraftRevision;
  const [overrideActive, setOverrideActive] = useState(
    revision.overrideJustification !== null
  );
  const [applicationDetailsRendered, setApplicationDetailsRendered] = useState(
    false
  );

  const checkEnableSubmitForCertification = (e) => {
    const isEmail = Boolean(e.target.value.match(/.+@.+\..+/i));

    if (isEmail) {
      debounce(() => setEnableSubmitForCertification(true), 200)();
    } else {
      debounce(() => setEnableSubmitForCertification(false), 200)();
    }
  };

  const copyToClipboard = () => {
    copyArea.current.select();
    // TODO(Dylan): execCommand copy is deprecated. Look into a replacement
    const success = document.execCommand('copy');
    if (success) return setCopySuccess('Copied!');
    throw new Error('document.execCommand(`copy`) failed');
  };

  const handleClickGenerateCertificationUrl = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.persist();
    const email = (e.target as Target).email.value;
    const sendEmail = (e.target as Target).sendEmailChecked.checked;
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
      const certifierUrl = `${window.location.protocol}//${
        window.location.host
      }/certifier/certification-redirect?rowId=${encodeURIComponent(
        response.createCertificationUrl.certificationUrl.rowId
      )}&id=${encodeURIComponent(props.application.id)}`;
      setUrl(certifierUrl);
      const updateVariables = {
        input: {
          id: response.createCertificationUrl.certificationUrl.id,
          certificationUrlPatch: {
            certifierUrl,
            certifierEmail: email,
            sendCertificationRequest: sendEmail
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
      <Card>
        <Card.Header>Application Certification</Card.Header>
        <Card.Body>
          <Card.Text>
            Thank you for reviewing your application to the CleanBC Industrial
            Incentive Program.
          </Card.Text>
          <Card.Text>
            Your application is almost complete.
            <ul>
              <li>
                Please send the secure URL below to a Certifying Official in
                your organisation to approve the application. You will be
                notified via email when this step is complete.
              </li>
              <li>
                Once you have received notification that the application has
                been certified, you will need to return here to submit the
                application.
              </li>
              <li>
                Once submitted, you will be notified via email when your
                application has been approved or if any further information is
                required to process your application.
              </li>
            </ul>
          </Card.Text>
          <Card.Text>
            Once you have reviewed the application and ensured all the data is
            correct, the application has to be certified.
          </Card.Text>
          <Form onSubmit={handleClickGenerateCertificationUrl}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="certifierEmail">
                <Form.Label>Certifier Email Address:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  onKeyDown={checkEnableSubmitForCertification}
                  onChange={checkEnableSubmitForCertification}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label style={{display: 'inline-flex'}}>
                <Form.Check
                  checked={isChecked}
                  className="text-muted"
                  name="sendEmailChecked"
                  type="checkbox"
                  onChange={() => toggleChecked(!isChecked)}
                />
                Notify certifier via email that this application is ready for
                certification
              </Form.Label>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!enableSubmitForCertification}
            >
              Submit for Certification
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );

  let certificationMessage: JSX.Element;

  const copyUrl = (
    <Row>
      <Col md={6}>
        <input
          ref={copyArea}
          readOnly
          value={revision?.certificationUrl?.certifierUrl ?? url}
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
    certificationMessage = url ? (
      <Card className="text-center">
        <Card.Header>Ready for Certification</Card.Header>
        <Card.Body>
          {isChecked ? (
            <Card.Text>
              <p>
                Your request for certification has now been sent to your
                certifier via email.
              </p>
              <p>
                You may copy the direct link to the certification page below.
              </p>
            </Card.Text>
          ) : (
            <Card.Text>
              <p>
                Your application is ready to be reviewed by a certifier. You
                opted not to notify them by email, but your request will still
                be visible via their dashboard.
              </p>
              <p>
                You may copy the direct link to the certification page below.
              </p>
            </Card.Text>
          )}
        </Card.Body>
        <Card.Footer>
          <span style={{color: 'green'}}>{copySuccess}</span> {copyUrl}
        </Card.Footer>
      </Card>
    ) : (
      generateCertification
    );
  } else if (
    !revision.certificationUrl.certificationSignature &&
    revision.certificationUrl.hashMatches
  ) {
    certificationMessage = (
      <Card className="text-center">
        <Card.Header>Pending Certification</Card.Header>
        <Card.Body>
          <p>
            Your application is pending verification by the certifying official
            you indicated. You will be notified when they have certified the
            application, at which time it can be submitted.
          </p>
          <p>You may copy the direct link to the certification page below.</p>
        </Card.Body>
        <Card.Footer>
          <span style={{color: 'green'}}>{copySuccess}</span> {copyUrl}
        </Card.Footer>
      </Card>
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
        {url ? (
          <>
            <span style={{color: 'green'}}>URL sent!</span>
            {copyUrl}
          </>
        ) : (
          generateCertification
        )}
      </>
    );
  }

  return (
    <>
      <h1>Summary of your application:</h1>
      <p style={{fontSize: '1.25rem', fontWeight: 500}}>
        Please review the information you have provided before continuing.
      </p>
      <br />
      <ApplicationOverrideJustification
        overrideActive={overrideActive}
        setOverrideActive={setOverrideActive}
        applicationOverrideJustification={
          props.application.latestDraftRevision.overrideJustification
        }
        revisionId={props.application.latestDraftRevision.id}
        hasErrors={hasErrors}
        applicationDetailsRendered={applicationDetailsRendered}
      />
      <ApplicationDetailsContainer
        liveValidate
        query={props.query}
        application={props.application}
        review={false}
        setHasErrors={setHasErrors}
        setApplicationDetailsRendered={setApplicationDetailsRendered}
      />
      <br />
      {hasErrors && !overrideActive ? (
        <div className="errors">
          Your Application contains errors that must be fixed before submission.
        </div>
      ) : revision.certificationSignatureIsValid ? (
        <>
          <Card>
            <Card.Header>
              <h5>Before you submit</h5>
            </Card.Header>
            <Card.Body>
              By submitting the application the applicant agrees that the
              information contained on this application, or information
              contained in emission reports under the Greenhouse Gas Industrial
              Reporting and Control Act, may be disclosed to British Columbia
              government employees, contractors and agencies for the purpose of
              administering the CleanBC Program for Industry or the Greenhouse
              Gas Industrial Reporting and Control Act.
            </Card.Body>
          </Card>
          <br />
          <SubmitApplication application={props.application} />
        </>
      ) : (
        certificationMessage
      )}
      <style jsx>
        {`
          .errors {
            margin-left: 20px;
            padding: 20px;
            background: #ce5c5c;
            color: white;
            font-size: 20px;
          }
        `}
      </style>
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
        id
        versionNumber
        certificationSignatureIsValid
        overrideJustification
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
